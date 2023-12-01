import React, { useState, useEffect } from "react";
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
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    setProductsInCart([product]);
  }, [product]);

  const { name, description, price, imageUrl } = product;

  const handleAddToCartClick = () => {
    onAddToCart(product, productsInCart.length);
    setProductsInCart([product]);
  };

  const handleAddRelatedProductToCart = (relatedProduct) => {
    onAddToCart(relatedProduct, 1);
    setProductsInCart([relatedProduct]);
  };

  const handleIncrementProduct = () => {
    setProductsInCart([...productsInCart, product]);
  };

  const handleDecrementProduct = () => {
    if (productsInCart.length > 1) {
      setProductsInCart(productsInCart.slice(0, -1));
    }
  };

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
            <button onClick={handleDecrementProduct}>-</button>
            <span>{productsInCart.length}</span>
            <button onClick={handleIncrementProduct}>+</button>
          </div>
          <div className="add-to-cart-button">
            <button onClick={handleAddToCartClick}>Dodaj do koszyka</button>
          </div>
        </div>
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="carousel-wrapper">
            <h3>Dodaj to co lubisz:</h3>

            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              additionalTransfrom={0}
              containerClass="carousel-container"
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

export default ProductModal;
