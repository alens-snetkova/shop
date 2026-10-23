/**
 * App — корневой компонент приложения.
 *
 * Здесь хранятся все общие состояния (корзина, выбранная категория,
 * открытый товар, летящие картинки) и все функции, которые его меняют.
 * Дочерние компоненты только показывают данные и сообщают о действиях
 * пользователя через переданные им функции (props).
 *
 * Структура потока данных:
 *   App → Header / Categories / Items → Item / FullItem
 */
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
import Items from "./components/Items";
import FullItem from "./components/FullItem";
import FlyingImage from "./components/FlyingImage";
import { ITEMS } from "./data/items";

export default function App() {
  /* ------------------------------------------------------------------
   * 1. СОСТОЯНИЕ
   * ------------------------------------------------------------------ */

  // Товары в корзине: [{ ...товар, quantity: число }]
  const [orders, setOrders] = useState([]);

  // Ключ выбранной категории ("all" — показывать всё)
  const [category, setCategory] = useState("all");

  // Товар, открытый в окне подробностей; null — окно закрыто
  const [fullItem, setFullItem] = useState(null);

  // Картинки, которые прямо сейчас летят в корзину (для анимации)
  const [flights, setFlights] = useState([]);

  /* ------------------------------------------------------------------
   * 2. КОРЗИНА
   * ------------------------------------------------------------------ */

  /**
   * Добавляет товар в корзину.
   * Если такой товар уже есть — увеличивает его количество на 1,
   * если нет — добавляет с quantity: 1.
   * Состояние не изменяется «на месте»: всегда создаётся новая копия массива
   * */

  const addToOrder = (item) =>
    setOrders((prev) =>
      prev.some((o) => o.id === item.id)
        ? prev.map((o) =>
            o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o,
          )
        : [...prev, { ...item, quantity: 1 }],
    );

  /**
   * Меняет количество товара на delta (+1 или -1).
   * Товар автоматически удаляется, когда количество доходит до 0.
   */
  const updateQuantity = (id, delta) =>
    setOrders((prev) =>
      prev
        .map((o) => (o.id === id ? { ...o, quantity: o.quantity + delta } : o))
        .filter((o) => o.quantity > 0),
    );

  /** Полностью удаляет товар из корзины. */
  const removeFromOrder = (id) =>
    setOrders((prev) => prev.filter((o) => o.id !== id));

  /* ------------------------------------------------------------------
   * 3. АНИМАЦИЯ «ПОЛЁТ КАРТИНКИ В КОРЗИНУ»
   * ------------------------------------------------------------------ */

  /**
   * Запускает полёт картинки от фото товара к иконке корзины.
   * @param {string} imgSrc — адрес картинки товара
   * @param {HTMLElement} imgEl — элемент <img>, откуда стартует полёт
   *
   * getBoundingClientRect() возвращает положение и размер элемента
   * относительно окна браузера. По этим координатам FlyingImage
   * рассчитывает путь анимации.
   */
  const startFlight = (imgSrc, imgEl) => {
    const cartEl = document.querySelector(".cart-icon"); // иконка корзины в шапке
    if (!imgEl || !cartEl) return;

    // Если пользователь отключил анимацию
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setFlights((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(), // уникальный id (для key и удаления)
        img: imgSrc,
        from: imgEl.getBoundingClientRect(), // где сейчас фото
        to: cartEl.getBoundingClientRect(), // где иконка корзины
      },
    ]);
  };

  /** Убирает картинку из списка полётов, когда анимация закончилась. */
  const removeFlight = (id) =>
    setFlights((prev) => prev.filter((f) => f.id !== id));

  /**
   * Единая точка добавления в корзину из интерфейса:
   * добавляет товар и запускает анимацию. Используется и в каталоге,
   * и в окне подробностей.
   */
  const handleAdd = (item, imgEl) => {
    addToOrder(item);
    startFlight(item.img, imgEl);
  };

  /* ------------------------------------------------------------------
   * 4. ОКНО ТОВАРА
   * ------------------------------------------------------------------ */

  const openItem = (item) => setFullItem(item);
  const closeItem = () => setFullItem(null);

  /* ------------------------------------------------------------------
   * 5. КАТЕГОРИИ
   * ------------------------------------------------------------------ */

  const chooseCategory = (key) => setCategory(key);

  // Список для показа считается из выбранной категории при каждом рендере,
  // поэтому хранить его в состоянии не нужно
  const visibleItems =
    category === "all"
      ? ITEMS
      : ITEMS.filter((item) => item.category === category);

  /* ------------------------------------------------------------------
   * 6. РАЗМЕТКА
   * ------------------------------------------------------------------ */
  return (
    <div className="wrapper">
      <div id="home"></div> {/* Якорь для "Home" */}
      <Header
        orders={orders}
        updateQuantity={updateQuantity}
        removeFromOrder={removeFromOrder}
      />
      <h2 id="catalog" className="section-title">
        Catalog
      </h2>
      <Categories activeCategory={category} onChoose={chooseCategory} />
      <Items
        items={visibleItems}
        orders={orders}
        onAdd={handleAdd}
        updateQuantity={updateQuantity}
        onOpen={openItem}
      />
      {/* Окно товара показывается только пока fullItem не null.
          Количество берём из корзины: в самом товаре его нет. */}
      {fullItem && (
        <FullItem
          item={fullItem}
          onClose={closeItem}
          onAdd={handleAdd}
          updateQuantity={updateQuantity}
          quantity={orders.find((o) => o.id === fullItem.id)?.quantity}
        />
      )}
      {/* Летящие картинки: по одной на каждое добавление в корзину */}
      {flights.map((f) => (
        <FlyingImage
          key={f.id}
          img={f.img}
          from={f.from}
          to={f.to}
          onDone={() => removeFlight(f.id)}
        />
      ))}
      <Footer />
    </div>
  );
}
