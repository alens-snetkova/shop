import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import QuantityControl from "./QuantityControl";
import { MdDeleteForever } from "react-icons/md";

const NAV_LINKS = ["Home", "Catalog", "About Us", "Contacts"];

export default function Header({
  orders = [],
  updateQuantity,
  removeFromOrder,
}) {
  const [cartOpen, setCartOpen] = useState(false);

  const total = orders
    .reduce((sum, o) => sum + o.price * o.quantity, 0)
    .toFixed(2);

  return (
    <header>
      <div className="top-bar">
        <div className="container">
          <span className="logo">Home Decor</span>
          <div className="nav-wrapper">
            <ul className="nav">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>

            <IoCartOutline
              onClick={() => setCartOpen((open) => !open)}
              className={`cart-icon ${cartOpen ? "active" : ""}`}
            />

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
      <div className="presentation"></div>
    </header>
  );
}
