import React, { useState } from "react";
import Product from "./components/Product/Product";
import Basket from "./components/Basket/Basket";
import ProductModal from "./components/ProductModal/ProductModal";

import productsData from "./mock/products.json";

import "./App.css";

function App() {
  const [orderedProducts, setOrderedProducts] = useState([]); //basket
  const [isModalOpen, setIsModalOpen] = useState(false); // sprawdzanie czy modal jest otwarty
  const [selectedProduct, setSelectedProduct] = useState(null); // produkt w modalu
  const [likedProducts, setLikedProducts] = useState({}); // oznaczenie produktów poluboinych

  // Funkcja która otwiera modal
  const handleProductSelect = (product) => {
    setIsModalOpen(true);
    setSelectedProduct(product);
  };

  // funkcja ktora zamyka modal
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

  // Funkcja dodawania produktów do koszyka
  const addToCart = (product, quantity) => {
    const newProducts = Array(quantity).fill(product);
    setOrderedProducts((prevOrderedProducts) => [
      ...prevOrderedProducts,
      ...newProducts,
    ]);
    handleCloseModal();
  };

  // Funkcja do polubiania produktów
  const handleLike = (productId) => {
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [productId]: !prevLikedProducts[productId],
    }));
  };

  // Filtrowanie produktow w dodaj to co lubisz, i ustawianie maksymalnej ilosći produktów w sekcji dodaj to co lubisz
  const relatedProducts = productsData
    .filter((p) => p.id !== selectedProduct?.id)
    .slice(0, 6);

  // Renderowanie głównego komponentu aplikacji
  return (
    <>
      <Basket
        orderedProducts={orderedProducts}
        onProductRemove={handleProductRemove}
      />

      {/* Modal*/}
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

        {/* Wyświetlanie listy produktów */}
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
