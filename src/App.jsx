import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import Items from "./components/Items";
import FullItem from "./components/FullItem";
import { ITEMS } from "./data/items";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [category, setCategory] = useState("all");
  const [fullItem, setFullItem] = useState(null);

  const openItem = (item) => setFullItem(item);

  const closeItem = () => setFullItem(null);

  const addToOrder = (item) =>
    setOrders((prev) =>
      prev.some((o) => o.id === item.id)
        ? prev.map((o) =>
            o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o,
          )
        : [...prev, { ...item, quantity: 1 }],
    );

  // delta = +1 / -1; товар удаляется, когда количество достигает 0
  const updateQuantity = (id, delta) =>
    setOrders((prev) =>
      prev
        .map((o) => (o.id === id ? { ...o, quantity: o.quantity + delta } : o))
        .filter((o) => o.quantity > 0),
    );

  const removeFromOrder = (id) =>
    setOrders((prev) => prev.filter((o) => o.id !== id));

  const chooseCategory = (key) => {
    /*console.log("category:", key);*/
    setCategory(key);
  };

  const visibleItems =
    category === "all"
      ? ITEMS
      : ITEMS.filter((item) => item.category === category);

  console.log("fullItem:", fullItem);
  return (
    <div className="wrapper">
      <Header
        orders={orders}
        updateQuantity={updateQuantity}
        removeFromOrder={removeFromOrder}
      />
      <h2 className="section-title">Catalog</h2>
      <Categories activeCategory={category} onChoose={chooseCategory} />
      <Items
        items={visibleItems}
        orders={orders}
        onAdd={addToOrder}
        updateQuantity={updateQuantity}
        onOpen={openItem}
      />
      {fullItem && (
        <FullItem
          item={fullItem}
          onClose={closeItem}
          onAdd={addToOrder}
          updateQuantity={updateQuantity}
          quantity={orders.find((o) => o.id === fullItem.id)?.quantity}
        />
      )}
      <Footer />
    </div>
  );
}
