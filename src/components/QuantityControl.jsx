/**
 * QuantityControl — блок «− число +».
 * Переиспользуется в корзине, карточке каталога и окне товара.
 * Сам ничего не хранит: показывает число и сообщает родителю о кликах.
 *
 * Props:
 *  - quantity          — текущее количество
 *  - onChange          — вызывается с -1 (минус) или 1 (плюс)
 *  - quantityClassName — класс для числа (в корзине и в каталоге
 *                        оно оформляется по-разному)
 */
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
