/**
 * FullItem — окно с подробной карточкой товара поверх страницы.
 *
 * Props:
 *  - item           — товар, который показываем
 *  - quantity       — количество этого товара в корзине (undefined, если нет)
 *  - onClose        — закрыть окно
 *  - onAdd          — добавить в корзину: (товар, элемент <img>)
 *  - updateQuantity — изменить количество: (id, delta)
 */
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import QuantityControl from "./QuantityControl";

export default function FullItem({
  item,
  onClose,
  quantity,
  onAdd,
  updateQuantity,
}) {
  // Пока окно открыто, страница под ним не должна прокручиваться.
  // Функция, возвращаемая из эффекта, выполняется при закрытии окна
  // и возвращает прокрутку обратно.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    // Тёмный фон на весь экран
    <div className="full-overlay">
      {/* Сама карточка */}
      <div className="full-item">
        <IoClose className="full-item-close" onClick={onClose} />

        <img src={item.img} alt={item.title} />

        <div className="full-item-inf">
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
            <div
              className="add-to-cart"
              onClick={(e) => {
                // Фото внутри этого окна — старт анимации полёта
                const img = e.currentTarget
                  .closest(".full-item")
                  .querySelector("img");
                onAdd(item, img);
              }}
            >
              Add to Cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
