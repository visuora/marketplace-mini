import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
export default function Checkout() {
const navigate = useNavigate();
const { cart, total, clearCart } = useCart();
const [form, setForm] = useState({
name: "",
email: "",
phone: "",
address: "",
shipping: "standard",
payment: "cod",
});
const [error, setError] = useState("");
// === HANDLE CHANGE ===
function handleChange(e) {
setForm({ ...form, [e.target.name]: e.target.value });
}
// === HANDLE SUBMIT COMPLETE (MENUJU INVOICE) ===
function handleSubmit(e) {
e.preventDefault();
if (!form.name || !form.email || !form.phone || !form.address) {
setError("⚠ Semua data wajib diisi");
return;
}
const shippingCost = form.shipping === "express" ? 5 : 0;
// === DATA LENGKAP UNTUK INVOICE PREMIUM ===
const orderData = {
invoiceNumber: "INV-" + Date.now(),
date: new Date().toLocaleString(),
customer: {
name: form.name,
email: form.email,
phone: form.phone,
address: form.address,
},
items: cart,
subtotal: total,
shipping: shippingCost,
total: total + shippingCost,
payment: form.payment,
shippingMethod: form.shipping,
};
// Simpan cadangan
localStorage.setItem("invoiceData", JSON.stringify(orderData));
// Hapus keranjang
clearCart();
// === ARAH LANGSUNG KE INVOICE ===
navigate(`/invoice/${orderData.invoiceNumber}`, {
state: { order: orderData },
});
}
return (
<div className="max-w-4xl mx-auto px-6 py-10">
<h1 className="text-3xl font-bold mb-6">Checkout</h1>
{error && <p className="text-red-500 mb-4">{error}</p>}
{/* FORM CHECKOUT */}
<form
onSubmit={handleSubmit}
className="grid grid-cols-1 md:grid-cols-2 gap-6"
>
{/* === DATA DIRI === */}
<div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
<h2 className="text-xl font-semibold mb-4">Data Pelanggan</h2>
<input
type="text"
name="name"
placeholder="Nama Lengkap"
className="input mb-3 w-full"
value={form.name}
onChange={handleChange}
/>
<input
type="email"
name="email"
placeholder="Email"
className="input mb-3 w-full"
value={form.email}
onChange={handleChange}
/>
<input
type="text"
name="phone"
placeholder="Nomor Telepon"
className="input mb-3 w-full"
value={form.phone}
onChange={handleChange}
/>
<textarea
name="address"
placeholder="Alamat Lengkap"
className="input mb-3 w-full"
rows="3"
value={form.address}
onChange={handleChange}
></textarea>
{/* SHIPPING */}
<label className="block font-medium mt-4">Metode Pengiriman</label>
<select
name="shipping"
className="input w-full"
value={form.shipping}
onChange={handleChange}
>
<option value="standard">Standard (Gratis)</option>
<option value="express">Express (+$5)</option>
</select>
{/* PAYMENT */}
<label className="block font-medium mt-4">Metode Pembayaran</label>
<select
name="payment"
className="input w-full"
value={form.payment}
onChange={handleChange}
>
<option value="cod">COD (Bayar di Tempat)</option>
<option value="bank">Transfer Bank</option>
<option value="ewallet">E-Wallet</option>

</select>
</div>
{/* === RINGKASAN PESANAN === */}
<div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
<h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>
<ul className="divide-y divide-gray-300 dark:divide-gray-700 mb-4">
{cart.map((item) => (
<li
key={item.id}
className="py-3 flex items-center justify-between"
>
<span>
{item.title} × {item.quantity}
</span>
<span>${(item.price * item.quantity).toFixed(2)}</span>
</li>
))}
</ul>
<div className="flex justify-between text-lg font-bold mt-4">
<span>Total:</span>
<span>${total.toFixed(2)}</span>
</div>
<button
type="submit"
className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3

rounded-lg font-semibold"

>
Bayar Sekarang
</button>
</div>
</form>
</div>
);
}