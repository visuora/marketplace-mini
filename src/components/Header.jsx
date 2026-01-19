import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛒 MiniMarket
        </Link>
        <Link to="/cart" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Keranjang
        </Link>
      </div>
    </header>
  );
}