import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";


import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY"  }) => {
  const [message, setMessage] = useState("");
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  
  const { closeBuyWindow } = useContext(GeneralContext);
  
  const isSell = mode === "SELL";

  const handleBuyClick = async() => {
    try{
    const res = await axios.post("http://localhost:3002/newOrder", {
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: mode,
    });
    //  console.log(res.data);
     setMessage(`Order placed successfully(${mode})`);

    setTimeout(() => {
     setMessage("");
      closeBuyWindow();
    },3000); 
   

    } catch (err) {
      // console.log(err);
      alert("order failed");
    }
  };

  const handleCancelClick = () => {
     closeBuyWindow();
  };

  return (
    <>
    {message && (
    <div className="toast-message">
    {message}
    </div>
    )}
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className={isSell ? "btn btn-red" : "btn btn-blue"} 
          onClick={handleBuyClick}
          >
            {isSell ? "Sell": "Buy"}
          </button>
          <button className="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default BuyActionWindow;