
import { NextResponse } from "next/server";
import { pipeline, RawImage } from "@xenova/transformers";
import products from "../../../data/products.json";

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
    const { imageBase64, imageUrl } = await req.json();
    const extractor = await getExtractor();

    let rawImage: RawImage | null = null;

    if (imageBase64) {
      
      const buffer = Buffer.from(imageBase64, "base64");
      rawImage = await RawImage.read(buffer as any);
    } else if (imageUrl) {
      rawImage = await RawImage.read(imageUrl);
    } else {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const embedding = await extractor(rawImage, {
      pooling: "mean",
      normalize: true,
    });

    const results = products
      .map((p: any) => ({
        ...p,
        score: cosineSimilarity(embedding.data, p.embedding),
      }))
      .filter((p: any) => p.score >= 0.7)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 6);

    return NextResponse.json(results);
  } catch (err: unknown) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown server error" },
      { status: 500 }
    );
  }
}


export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

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
