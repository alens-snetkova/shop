/**
 * Item — карточка одного товара в каталоге.
 *
 * Props:
 *  - item           — данные товара
 *  - quantity       — сколько таких товаров в корзине (undefined, если нет)
 *  - onAdd          — добавить в корзину: (товар, элемент <img>)
 *  - updateQuantity — изменить количество: (id, delta)
 *  - onOpen         — открыть окно товара: (товар)
 *
 * Внизу карточки показывается либо кнопка «Add to Cart»,
 * либо блок «− число +», если товар уже в корзине.
 */
import QuantityControl from "./QuantityControl";

export default function Item({
  item,
  quantity,
  onAdd,
  updateQuantity,
  onOpen,
}) {
  return (
    <div className="item">
      {/* Окно товара открывается по клику на картинку или название.
          На всю карточку обработчик не вешаем: иначе клик по кнопке
          «Add to Cart» тоже открывал бы окно. */}
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
        <div
          className="add-to-cart"
          onClick={(e) => {
            // Находим фото этой карточки: оно нужно для анимации полёта
            const img = e.currentTarget.closest(".item").querySelector("img");
            onAdd(item, img);
          }}
        >
          Add to Cart
        </div>
      )}
    </div>
  );
}
