# 🛍️ Visual Product Matcher

A Next.js 13 (App Router) project that allows users to **upload an image** or **paste an image URL** and find visually similar products from a dataset using **CLIP embeddings** powered by [@xenova/transformers](https://github.com/xenova/transformers.js).  


👉 **[View the live project here](https://visualproductmanager-production.up.railway.app/)**  


## 🚀 Features
- Upload an image or paste a product image URL
- Extracts embeddings using CLIP (`Xenova/clip-vit-base-patch16`)
- Finds and returns the most visually similar products
- Shows similarity scores (in 70%)
- Works fully client–server on **Vercel deployment**

---

## 📂 Project Structure
- `app/api/search/route.ts` → API endpoint for image processing + matching
- `data/products.json` → Products and their **precomputed embeddings**
- `components/UploadBox.tsx` → Handles file upload / URL input
- `components/ProductCard.tsx` → Displays matching product details
- `scripts/embed.ts` → Generates embeddings (only if new products are added)

---

## ⚡ Running Locally
```bash

npm install


npm run dev


---


The `products.json` file already contains **precomputed embeddings** for all products.  
You only need to run `npm run dev` if you **add new products**.  

```bash
# (Add Photos in public/products)
npm install --save-dev tsx
npx tsx script/generateProduct.ts
# (Only if dataset changes)
npx ts-node --compiler-options '{"module":"commonjs"}' scripts/embed.ts


```

