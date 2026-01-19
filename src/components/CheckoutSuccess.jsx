import React from "react";
import { Link } from "react-router-dom";
export default function CheckoutSuccess() {
return (

<div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-
center">

<h1 className="text-4xl font-bold text-green-600 mb-4">
Pembayaran Berhasil!
</h1>
<p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
Terima kasih! Pesanan Anda sedang diproses.
</p>
<Link
to="/"
className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
Kembali ke Beranda
</Link>
</div>
);
}