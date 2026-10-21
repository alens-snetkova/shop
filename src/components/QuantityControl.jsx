import { FaPlus, FaMinus } from "react-icons/fa6";

export default function QuantityControl({
  quantity,
  onChange,
  quantityClassName,
}) {
  return (
    <div className="quantity-control">
      <FaMinus className="cart-icon-quantity" onClick={() => onChange(-1)} />
      <span className={quantityClassName}>{quantity}</span>
      <FaPlus className="cart-icon-quantity" onClick={() => onChange(1)} />
    </div>
  );
}
