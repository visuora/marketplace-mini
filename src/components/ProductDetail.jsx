import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
export default function ProductDetail() {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const { addToCart } = useCart();
useEffect(() => {
setLoading(true);
fetch(`https://fakestoreapi.com/products/${id}`)
.then((res) => res.json())
.then((data) => setProduct(data))
.catch(console.error)
.finally(() => setLoading(false));
}, [id]);
// Loading skeleton premium
if (loading)
return (
<div className="max-w-5xl mx-auto p-6 animate-pulse">

<div className="bg-gray-300 dark:bg-gray-700 w-full h-80 rounded-xl mb-
6"></div>

<div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>

<div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
<div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
</div>
);
if (!product)
return <div className="text-center py-10">Produk tidak ditemukan</div>;
return (
<div className="max-w-5xl mx-auto p-6">
<div
className="
bg-white dark:bg-gray-900 dark:text-white
p-6 md:p-10 rounded-2xl shadow-lg
grid grid-cols-1 md:grid-cols-2 gap-10
"
>
{/* Gambar Produk */}
<div className="flex justify-center">
<img
src={product.image}
alt={product.title}
className="w-80 h-80 md:w-96 md:h-96 object-contain rounded-xl shadow"
/>
</div>
{/* Detail Produk */}
<div>
<h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
<p className="text-blue-600 dark:text-blue-400 text-3xl font-bold mt-4">
${product.price?.toFixed(2)}
</p>
<p className="mt-5 text-gray-700 dark:text-gray-300 leading-relaxed">
{product.description}
</p>
{/* Rating */}
<div className="mt-5 flex items-center gap-2">
<span className="text-yellow-500 text-xl">★</span>
<span className="font-semibold">{product.rating?.rate}</span>
<span className="text-gray-500 dark:text-gray-400 text-sm">

({product.rating?.count} ulasan)
</span>
</div>
{/* Tombol Action */}
<button
onClick={() => addToCart(product)}
className="
mt-8 w-full px-4 py-3 rounded-xl
bg-green-600 text-white font-semibold
hover:bg-green-700 active:scale-95 transition
shadow-md hover:shadow-xl
"
>
Tambah ke Keranjang
</button>
</div>
</div>
</div>
);
}