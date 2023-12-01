import React, { useState } from "react";
import Product from "./components/Product/Product";
import Basket from "./components/Basket/Basket";
import ProductModal from "./components/ProductModal/ProductModal";

import productsData from "./mock/products.json";

import "./App.css";

function App() {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState({});

  const handleProductSelect = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductRemove = (product) => {
    setOrderedProducts((prevOrderedProducts) =>
      prevOrderedProducts.filter(
        (orderedProduct) => orderedProduct.id !== product.id
      )
    );
  };

  const addToCart = (product, quantity) => {
    const newProducts = Array(quantity).fill(product);
    setOrderedProducts((prevOrderedProducts) => [
      ...prevOrderedProducts,
      ...newProducts,
    ]);
    handleCloseModal();
  };

  const handleLike = (productId) => {
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [productId]: !prevLikedProducts[productId],
    }));
  };

  const relatedProducts = productsData
    .filter((p) => p.id !== selectedProduct?.id)
    .slice(0, 6);

  return (
    <>
      <Basket
        orderedProducts={orderedProducts}
        onProductRemove={handleProductRemove}
      />

      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={addToCart}
          relatedProducts={relatedProducts}
          isLiked={likedProducts[selectedProduct?.id]}
          onLike={handleLike}
        />
      )}

      <main>
        <header>
          <h1>Witaj!</h1>
        </header>
        <hr />

        <section style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {productsData.map((product) => (
            <Product
              key={product.id}
              product={product}
              orderedProducts={orderedProducts}
              onProductSelect={handleProductSelect}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
