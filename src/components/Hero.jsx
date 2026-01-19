import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-16 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">Selamat Datang di MiniMarket</h1>
      <p className="text-lg mb-6">Belanja kebutuhanmu dengan cepat dan mudah</p>
      <Link to="/" className="bg-white text-blue-600 font-bold px-6 py-3 rounded-lg shadow hover:bg-gray-100">
        Belanja Sekarang
      </Link>
    </section>
  );
}