import fs from "fs";
import path from "path";
import { pipeline, RawImage } from "@xenova/transformers";

async function main() {
  // Use image-feature-extraction for CLIP on images
  const extractor: any = await pipeline("image-feature-extraction", "Xenova/clip-vit-base-patch16");

  // Load product metadata
  const productsPath = path.join(process.cwd(), "data/products.json");
  const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

  // Compute embeddings
  for (const product of products) {
    const imagePath = path.join(process.cwd(), "public", product.image);
    console.log(`🔄 Embedding: ${product.name}`);

    // Load the image as RawImage
    const rawImage = await RawImage.read(imagePath);

    // Extract embedding
    const output = await extractor(rawImage, {
      pooling: "mean",
      normalize: true,
    });

    product.embedding = Array.from(output.data);
  }

  // Save updated JSON
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
  console.log(" Embeddings saved to data/products.json");
}

main();
