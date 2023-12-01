import "./Basket.scss";
import { groupBy } from "../../utils";
import BasketItem from "../BasketItem/BasketItem";

const Basket = (props) => {
  const { orderedProducts, onProductRemove } = props;

  const groupedOrderedProducts = Object.entries(
    groupBy(orderedProducts, (product) => product.name)
  );

  const totalCost = orderedProducts
    .map((orderedProduct) => orderedProduct.price)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="basket">
      <header>
        <h5>
          <span>Basket</span>
          <span>({orderedProducts.length} product)</span>
        </h5>
      </header>
      <section>
        <ul>
          {groupedOrderedProducts.map(([name, orderedProducts]) => (
            <BasketItem
              key={name}
              product={orderedProducts[0]}
              orderCount={orderedProducts.length}
              onProductRemove={onProductRemove}
            />
          ))}
        </ul>
      </section>
      <section>
        <button type="button" className="pay-button">
          Order and Pay ({totalCost.toFixed(2)})
        </button>
      </section>
    </div>
  );
};

export default Basket;
