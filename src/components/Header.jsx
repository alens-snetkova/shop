import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function Header({ orders = [] }) {
  const [cartOpen, setCartOpen] = useState(false);

  const total = orders
    .reduce((sum, item) => sum + Number(item.price), 0)
    .toFixed(2);

  return (
    <header>
      <div className="top-bar">
        <div className="container">
          <span className="logo">Home Decor</span>
          <div className="nav-wrapper">
            <ul className="nav">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Catalog</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contacts</a>
              </li>
            </ul>

            <IoCartOutline
              onClick={() => setCartOpen(!cartOpen)}
              className={`cart-icon ${cartOpen ? "active" : ""}`}
            />

            {cartOpen && (
              <div className="cart">
                {orders.length > 0 ? (
                  <>
                    {orders.map((el, index) => (
                      <div className="cart-item" key={`${el.id}-${index}`}>
                        <img src={el.img} alt={el.title} />
                        <span className="cart-item-title">{el.title}</span>
                        <b>{el.price} $</b>
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
