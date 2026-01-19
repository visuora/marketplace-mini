const KEY = "marketplace_cart_v1";
export function loadCart() {
try {
const raw = localStorage.getItem(KEY);
return raw ? JSON.parse(raw) : [];
} catch (e) {
console.error("loadCart", e);
return [];
}
}
export function saveCart(cart) {
try {
localStorage.setItem(KEY, JSON.stringify(cart));
} catch (e) {
console.error("saveCart", e);
}
}