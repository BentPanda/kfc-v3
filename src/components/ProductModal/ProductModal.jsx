import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ProductModal.scss";

const ProductModal = ({
  product,
  onClose,
  onAddToCart,
  relatedProducts,
  isLiked,
  onLike,
}) => {
  // ilosc produktów w koszyku
  const [quantity, setQuantity] = useState(1);

  const { name, description, price, imageUrl } = product;

  // Fdodawanie do koszyka
  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  const handleAddRelatedProductToCart = (relatedProduct) => {
    onAddToCart(relatedProduct, 1);
  };

  // zwiekszenie dodawanych produktow do koszyka
  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // zmniejszenie dodawanych produktow do koszyka
  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // coś do karuzeli z neta
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="product-modal-backdrop">
      <div className="product-modal">
        <div className="product-modal-header">
          <div className="heart-icon" onClick={() => onLike(product.id)}>
            {isLiked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
          </div>
          <MdClose className="close-icon" onClick={onClose} />
        </div>
        <div className="product-modal-content">
          <div className="product-image">
            <img src={imageUrl} alt={name} />
          </div>
          <div className="product-details">
            <h3>{name}</h3>
            <p>{description}</p>
            <p>Cena: {price}</p>
          </div>
          <div className="quantity-controls">
            <button onClick={handleDecrementQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrementQuantity}>+</button>
          </div>
          <div className="add-to-cart-button">
            <button onClick={handleAddToCartClick}>Dodaj do koszyka</button>
          </div>
        </div>
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="carousel-wrapper">
            <h3>Dodaj do koszyka</h3>

            {/*konfiguracja karuzeli*/}
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              ssr={true}
              infinite={true}
              autoPlay={false}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="carousel-product-item">
                  <img
                    src={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                  />
                  <h4>{relatedProduct.name}</h4>
                  <p>{relatedProduct.description}</p>
                  <span>Cena: {relatedProduct.price}</span>
                  <button
                    onClick={() =>
                      handleAddRelatedProductToCart(relatedProduct)
                    }
                  >
                    Dodaj do koszyka
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
};
