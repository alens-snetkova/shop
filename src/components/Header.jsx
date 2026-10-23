/**
 * Header — шапка сайта: логотип, меню, иконка корзины и выпадающее
 * окно корзины, а также баннер под шапкой.
 *
 * Props:
 *  - orders          — товары в корзине (с полем quantity)
 *  - updateQuantity  — изменить количество: (id, delta)
 *  - removeFromOrder — удалить товар из корзины: (id)
 */
import { useState } from "react";
import { IoCartOutline, IoMenu, IoClose } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import QuantityControl from "./QuantityControl";

// Пункты меню;
export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Catalog", href: "#catalog" },
  { label: "About Us", href: "#about" },
  { label: "Contacts", href: "#contacts" },
];

export default function Header({
  orders = [],
  updateQuantity,
  removeFromOrder,
}) {
  // Открыто ли окно корзины (локальное состояние: нужно только шапке)
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Общая сумма: цена × количество по каждому товару, строкой с 2 знаками
  const total = orders
    .reduce((sum, o) => sum + o.price * o.quantity, 0)
    .toFixed(2);

  return (
    <header>
      <div className="top-bar">
        <div className="container">
          <a className="logo" href="#home">
            Home Decor
          </a>

          <div className="nav-wrapper">
            {/* Меню */}
            <ul className="nav">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>

            {/* Иконка корзины: клик открывает и закрывает окно.
                Класс "cart-icon" используется и в анимации полёта
                (App ищет иконку по этому классу). */}
            <IoCartOutline
              onClick={() => setCartOpen((open) => !open)}
              className={`cart-icon ${cartOpen ? "active" : ""}`}
            />
            {/* Бургер / крестик (виден только на планшете/мобилке) */}
            {menuOpen ? (
              <IoClose
                className={`burger-menu ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <IoMenu
                className="burger-menu"
                onClick={() => setMenuOpen(true)}
              />
            )}

            {/* Выпадающее мобильное меню */}
            <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)} // закрывает меню при клике
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Окно корзины */}
            {cartOpen && (
              <div className="cart">
                {orders.length > 0 ? (
                  <>
                    {orders.map((el) => (
                      <div className="cart-item" key={el.id}>
                        <img src={el.img} alt={el.title} />
                        <span className="cart-item-title">{el.title}</span>

                        <QuantityControl
                          quantity={el.quantity}
                          onChange={(delta) => updateQuantity(el.id, delta)}
                          quantityClassName="item-price"
                        />

                        {/* Стоимость позиции с учётом количества */}
                        <b className="item-total">
                          {(el.price * el.quantity).toFixed(2)} $
                        </b>

                        <MdDeleteForever
                          className="cart-icon-delete"
                          title="Remove"
                          onClick={() => removeFromOrder(el.id)}
                        />
                      </div>
                    ))}

                    <p className="cart-total">Total: {total} $</p>
                  </>
                ) : (
                  <p className="cart-empty">Cart is empty</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Баннер под фиксированной шапкой (картинка и подписи — в CSS) */}
      <div className="presentation"></div>
    </header>
  );
}
