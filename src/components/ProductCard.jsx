import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 flex items-center justify-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <h3 className="font-semibold line-clamp-2">{product.title}</h3>
        <p className="text-blue-600 font-bold text-lg mt-2">
          ${product.price}
        </p>
      </Link>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
}