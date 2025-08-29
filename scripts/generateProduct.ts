import fs from "fs";
import path from "path";

async function main() {
  const productsDir = path.join(process.cwd(), "public/products");
  const files = fs.readdirSync(productsDir);

  const products = files.map((file, index) => {
    const name = file.replace(/\.[^/.]+$/, ""); 
    return {
      id: index + 1,
      name: name.replace(/-/g, " "), 
      category: "General", 
      image: `/products/${file}`,
      embedding: [] 
    };
  });

  fs.writeFileSync("data/products.json", JSON.stringify(products, null, 2));
}

main();
