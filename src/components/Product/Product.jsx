import "./Product.scss";

const Product = (props) => {
  const { product, orderedProducts, onProductSelect } = props;
  const { name, price, description, imageUrl } = product;

  const orderCount = orderedProducts.filter(
    (orderedProduct) => product.id === orderedProduct.id
  ).length;

  const isOrdered = orderCount > 0;

  const handleButtonClick = () => {
    onProductSelect(product);
  };

  return (
    <article className="product" data-ordered={isOrdered}>
      <div>
        <img src={imageUrl} alt={name} />
      </div>
      <div>
        <header>
          <h4>{name}</h4>
          <small>{description}</small>
        </header>
        <section className="purchase">
          <strong>{price}</strong>
          <button type="button" onClick={handleButtonClick}>
            {isOrdered ? orderCount : "+"}
          </button>
        </section>
      </div>
    </article>
  );
};

export default Product;
