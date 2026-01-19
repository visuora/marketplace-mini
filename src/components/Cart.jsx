import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-3xl font-bold">Keranjang Kosong</h2>
        <p className="text-gray-500 mt-2">Yuk belanja dulu!</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Kembali Belanja
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Keranjang Belanja</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <img src={item.image} className="w-20 h-20 object-contain" />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Hapus
              </button>
            </div>
            <div className="font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between text-2xl font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="mt-6 block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700"
        >
          Lanjut ke Checkout
        </Link>
      </div>
    </div>
  );
}