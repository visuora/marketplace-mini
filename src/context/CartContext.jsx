import React, { createContext, useContext, useEffect, useState } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("marketplace_cart");
    return saved ? JSON.parse(saved) : [];
  });
  // Simpan ke localStorage saat cart berubah
  useEffect(() => {
    localStorage.setItem("marketplace_cart", JSON.stringify(cart));
  }, [cart]);
  // Tambah ke keranjang
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  // Hapus dari keranjang
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  // Kosongkan keranjang
  const clearCart = () => {
    setCart([]);
  };
  // Hitung total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}0