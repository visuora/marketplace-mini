import { useEffect, useState } from "react";
export default function useFetchProducts() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
useEffect(() => {
let mounted = true;
setLoading(true);
fetch("https://fakestoreapi.com/products")
.then((r) => r.json())
.then((data) => {
if (mounted) {
setProducts(data);
}
})
.catch((e) => setError(e))
.finally(() => mounted && setLoading(false));
return () => {
mounted = false;
};
}, []);
return { products, loading, error };
}