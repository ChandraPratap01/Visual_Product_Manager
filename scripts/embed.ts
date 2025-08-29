import fs from "fs";
import path from "path";
import { pipeline, RawImage } from "@xenova/transformers";

async function main() {
  
  const extractor: any = await pipeline("image-feature-extraction", "Xenova/clip-vit-base-patch16");

  
  const productsPath = path.join(process.cwd(), "data/products.json");
  const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));


  for (const product of products) {
    const imagePath = path.join(process.cwd(), "public", product.image);
   

   
    const rawImage = await RawImage.read(imagePath);

   
    const output = await extractor(rawImage, {
      pooling: "mean",
      normalize: true,
    });

    product.embedding = Array.from(output.data);
  }

  
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

}

main();
