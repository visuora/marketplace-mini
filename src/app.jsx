import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// Import komponen
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import ProductSkeleton from "./components/ProductSkeleton";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Invoice from "./components/Invoice";
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch produk dari API
  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 my-10">
              {loading
                ? [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
                : products.map((p) => <ProductCard key={p.id} product={p} />)
              }
            </section>
          </>
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/invoice/:orderId" element={<Invoice />} />
        <Route path="/invoice" element={<Invoice />} />
      </Routes>
      
      <Footer />
    </div>
  );
}