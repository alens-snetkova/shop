import React from "react";

export default function Header() {
  return (
    <header>
      <div className="top-bar">
        <span className="logo">Home Decor</span>

        <ul className="nav">
          <li>
            <a href="#">Главная</a>
          </li>
          <li>
            <a href="#">Каталог</a>
          </li>
          <li>
            <a href="#">О нас</a>
          </li>
          <li>
            <a href="#">Контакты</a>
          </li>
        </ul>
      </div>
      <div className="presentation"></div>
    </header>
  );
}
