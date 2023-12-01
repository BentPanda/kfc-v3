import BasketItem from "./BasketItem.scss";

const BaksetItem = (props) => {
  const { orderCount, product, onProductRemove } = props;
  const { name, description, price } = product;

  const handleRemoveButtonClick = () => {
    onProductRemove(product);
  };

  return (
    <li className="basket-item">
      <div className="info">
        <div>
          <span>{orderCount}x</span>
        </div>
        <div>
          <strong>{name}</strong>
          <p>{description}</p>
        </div>
        <div>
          <span>{price}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={handleRemoveButtonClick}>Remove</button>
      </div>
    </li>
  );
};

export default BaksetItem;
