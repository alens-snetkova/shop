import React, { Component } from "react";
import { useEffect } from "react";
import QuantityControl from "./QuantityControl";
import { IoClose } from "react-icons/io5";

export default function FullItem({
  item,
  onClose,
  quantity,
  onAdd,
  updateQuantity,
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className="full-overlay">
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
            <div className="add-to-cart" onClick={() => onAdd(item)}>
              Add to Cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
