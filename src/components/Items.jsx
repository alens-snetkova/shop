/**
 * Items — сетка карточек товаров.
 *
 * Props:
 *  - items          — товары, которые нужно показать (уже отфильтрованные)
 *  - orders         — корзина (нужна, чтобы узнать количество каждого товара)
 *  - onAdd          — добавить в корзину: (товар, элемент <img>)
 *  - updateQuantity — изменить количество: (id, delta)
 *  - onOpen         — открыть окно товара: (товар)
 */
import Item from "./Item";

export default function Items({
  items,
  orders,
  onAdd,
  updateQuantity,
  onOpen,
}) {
  // Словарь вида { id: количество }
  // Так каждая карточка узнаёт своё количество сразу, без поиска по массиву.
  const quantities = Object.fromEntries(orders.map((o) => [o.id, o.quantity]));

  return (
    <main>
      {items.map((el) => (
        <Item
          key={el.id}
          item={el}
          quantity={quantities[el.id]} // undefined, если товара нет в корзине
          onAdd={onAdd}
          updateQuantity={updateQuantity}
          onOpen={onOpen}
        />
      ))}
    </main>
  );
}
