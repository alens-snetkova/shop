import Item from "./Item";

export default function Items({ items, orders, onAdd, updateQuantity }) {
  // { id: quantity } — чтобы не делать find() в каждой карточке
  const quantities = Object.fromEntries(orders.map((o) => [o.id, o.quantity]));

  return (
    <main>
      {items.map((el) => (
        <Item
          key={el.id}
          item={el}
          quantity={quantities[el.id]}
          onAdd={onAdd}
          updateQuantity={updateQuantity}
        />
      ))}
    </main>
  );
}
