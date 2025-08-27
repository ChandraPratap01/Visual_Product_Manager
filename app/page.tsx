"use client";

import { useState } from "react";
import UploadBox from "../components/UploadBox";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (imageBase64: string | null, imageUrl: string | null) => {
    setLoading(true);
    setResults([]);

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64, imageUrl }),
    });

    if (!res.ok) {
  
      setLoading(false);
      return;
    }

    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-300">
      <h1 className="text-3xl font-bold text-center mb-6">Visual Product Matcher</h1>
      <div className="max-w-lg mx-auto">
        <UploadBox onSearch={handleSearch} />
      </div>

      {loading && <p className="text-center mt-6">🔄 Searching...</p>}

      {!loading && results.length === 0 && (
        <p className="text-center mt-6 text-gray-600 font-medium">
          ❌ No product matches found
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
