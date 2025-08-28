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
  return NextResponse.json({ message: "API works!" });
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
