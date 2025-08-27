"use client";

import { useState } from "react";

interface UploadBoxProps {
  onSearch: (imageBase64: string | null, imageUrl: string | null) => void;
}

export default function UploadBox({ onSearch }: UploadBoxProps) {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState<string | null>(null);


  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1]; 
      setPreview(result); 
      onSearch(base64, null);
    };
    reader.readAsDataURL(file);
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setPreview(url.trim());
      onSearch(null, url.trim());
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-2xl bg-white shadow-md">
    
      <label className="cursor-pointer px-4 py-2 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition">
        Choose File
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden" 
        />
      </label>

      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Or paste image URL..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-lg transition"
        >
          Search
        </button>
      </form>

     
      {preview && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-48 h-48 object-cover rounded-lg border shadow"
          />
        </div>
      )}
    </div>
  );
}
