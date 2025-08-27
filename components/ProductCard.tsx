interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    image: string;
    score: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="p-4 border rounded-2xl shadow-sm bg-white">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg" />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="text-sm text-gray-800 mt-1">Similarity: {(product.score * 100).toFixed(1)}%</p>
    </div>
  );
}
