import fs from "fs";
import path from "path";

async function main() {
  const productsDir = path.join(process.cwd(), "public/products");
  const files = fs.readdirSync(productsDir);

  const products = files.map((file, index) => {
    const name = file.replace(/\.[^/.]+$/, ""); // remove extension
    return {
      id: index + 1,
      name: name.replace(/-/g, " "), // turn "red-shoes" into "red shoes"
      category: "General", // you can refine later
      image: `/products/${file}`,
      embedding: [] // will be filled later
    };
  });

  fs.writeFileSync("data/products.json", JSON.stringify(products, null, 2));
  console.log(`✅ Generated ${products.length} products in data/products.json`);
}

main();
