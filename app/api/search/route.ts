import { NextResponse } from "next/server";
process.env.TRANSFORMERS_BACKEND = "wasm";
import { pipeline, RawImage } from "@xenova/transformers";
import products from "../../../data/products.json";
import fs from "fs";
import path from "path";
import os from "os";

let extractor: any = null;

async function getExtractor() {
  if (!extractor) {
    extractor = await pipeline(
      "image-feature-extraction",
      "Xenova/clip-vit-base-patch16"
    );
  }
  return extractor;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const imageUrl = formData.get("imageUrl") as string | null;

    const extractor = await getExtractor();
    let rawImage: any;

    if (file) {
     
      const buffer = Buffer.from(await file.arrayBuffer());
      const tmpPath = path.join(os.tmpdir(), `upload-${Date.now()}.jpg`);
      fs.writeFileSync(tmpPath, buffer);

      try {
        rawImage = await RawImage.read(tmpPath);
      } finally {
        fs.unlinkSync(tmpPath);
      }
    } else if (imageUrl) {
      rawImage = await RawImage.read(imageUrl);
    } else {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const embedding = await extractor(rawImage, { pooling: "mean", normalize: true });

    const results = products
      .map((p: any) => ({ ...p, score: cosineSimilarity(embedding.data, p.embedding) }))
      .filter((p: any) => p.score >= 0.7)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 6);

    return NextResponse.json(results);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unknown server error" },
      { status: 500 }
    );
  }
}


function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}