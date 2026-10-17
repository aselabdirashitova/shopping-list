
import React from "react";

function ShoppingItem(props) {
  return (
    <div className="item">
      <input
        type="checkbox"
        checked={props.product.bought || false}
        onChange={() => props.toggleBought(props.product.id)}
      />

      <span className={props.product.bought ? "bought" : ""}>
        {props.product.name} — {props.product.price} сом
      </span>

      <button onClick={() => props.deleteProduct(props.product.id)}>
        Удалить
      </button>
    </div>
  );
}

export default ShoppingItem;
