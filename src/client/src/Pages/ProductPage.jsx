import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import ProductGrid from "../components/ProductGrid";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/products") // or add ?categoryId=1 if needed
      .then(res => res.json())
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">All Products</h2>
      {loading ? <Spinner animation="border" /> : <ProductGrid products={products} />}
    </Container>
  );
}
