import React from "react";
import { useLocation, Link } from "react-router-dom";
export default function Invoice() {
const { state } = useLocation();
const order = state?.order;
if (!order) {
return (
<div className="max-w-xl mx-auto text-center py-20">
<h2 className="text-2xl font-bold text-red-500">
Invoice tidak ditemukan
</h2>
<Link
to="/"
className="mt-5 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
>
Kembali ke Home
</Link>
</div>
);
}
return (
<div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-
2xl p-8 my-10 border">
{/* HEADER */}
<div className="text-center border-b pb-6">
<h1 className="text-3xl font-bold text-gray-800 dark:text-white">
Invoice
</h1>
<p className="text-gray-500">Nomor: {order.invoiceNumber}</p>
<p className="text-gray-500">Tanggal: {order.date}</p>
</div>
{/* CUSTOMER INFO */}
<div className="mt-6">
<h2 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-300">
Informasi Pelanggan
</h2>
<div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border text-sm">
<p>Nama: {order.customer.name}</p>
<p>Email: {order.customer.email}</p>
<p>Alamat: {order.customer.address}</p>
</div>
</div>
{/* PRODUCT LIST */}
<div className="mt-6">
<h2 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-300">
Detail Pesanan
</h2>
{order.items.map((item) => (
<div
key={item.id}
className="flex justify-between items-center py-3 border-b"
>
<div>
<p className="font-medium">{item.title}</p>
<p className="text-xs text-gray-500">
Qty: {item.quantity ?? item.qty ?? 1}
</p>
</div>
<p className="font-semibold">
$
{(
(item.price ?? item.unitPrice ?? 0) *
(item.quantity ?? item.qty ?? 1)

).toFixed(2)}
</p>
</div>
))}
</div>
{/* TOTAL */}
<div className="mt-6 bg-blue-50 dark:bg-blue-900 p-5 rounded-xl border">
<div className="flex justify-between">
<span className="font-semibold">Subtotal</span>
<span>${order.subtotal.toFixed(2)}</span>
</div>
<div className="flex justify-between mt-2">
<span className="font-semibold">Ongkir</span>
<span>${order.shipping.toFixed(2)}</span>
</div>
<div className="flex justify-between mt-2 text-xl font-bold text-blue-600">
<span>Total Bayar</span>
<span>${order.total.toFixed(2)}</span>
</div>
</div>
{/* BUTTONS */}
<div className="mt-10 flex justify-between">
<Link
to="/"
className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl"
>
Kembali
</Link>
<button
onClick={() => window.print()}
className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl

shadow"
>
Cetak / Download PDF
</button>
</div>
</div>
);
}