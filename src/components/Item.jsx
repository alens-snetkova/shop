import QuantityControl from "./QuantityControl";

export default function Item({ item, quantity, onAdd, updateQuantity }) {
  return (
    <div className="item">
      <img src={item.img} alt={item.title} />
      <h2>{item.title}</h2>
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
