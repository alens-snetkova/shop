import QuantityControl from "./QuantityControl";
import FullItem from "./FullItem";

export default function Item({
  item,
  quantity,
  onAdd,
  updateQuantity,
  onOpen,
}) {
  return (
    <div className="item">
      <img src={item.img} alt={item.title} onClick={() => onOpen(item)} />
      <h2 onClick={() => onOpen(item)}>{item.title}</h2>
      <p>{item.desc}</p>
      <b>{item.price.toFixed(2)} $</b>
      {quantity ? (
        <div className="in-cart">
          <QuantityControl
            quantity={quantity}
            onChange={(delta) => updateQuantity(item.id, delta)}
            quantityClassName="quantity"
          />
        </div>
      ) : (
        <div className="add-to-cart" onClick={() => onAdd(item)}>
          Add to Cart
        </div>
      )}
    </div>
  );
}
