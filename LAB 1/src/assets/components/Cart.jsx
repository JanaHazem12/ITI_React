import React, { useState } from "react";
import Item from "./Item";

export default function Cart(props) {
  console.log(props.handleEmptyCart());
  // {props.handleEmptyCart === true ? 'Cart is Empty' :

  return (
    <>
      <div>
        {props.handleEmptyCart() ? (
          "Cart is Empty !"
        ) : (
          <>
            {props.items.map((itm) => (
              <Item
                id={itm.id}
                name={itm.name}
                count={itm.count}
                handleDel={props.handleDel}
                handleInc={props.handleInc}
                handleDec={props.handleDec}
              />
            ))}
            <button
              className="btn btn-outline btn-error"
              onClick={props.handleReset}
            >
              Reset
            </button>
          </>
        )}
      </div>
    </>
  );
}
