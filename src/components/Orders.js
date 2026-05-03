import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
         if (!token) {
        console.log("No token found");
        window.location.href = "/login";
        return;
      }
        const res = await axios.get(
          "https://trading-backend-2d5t.onrender.com/allOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }

        );
        setOrders(res.data);
      } catch (err) {
        console.log(err);
        if (err.response?.status === 403) {
        alert("Please login first");
        window.location.href = "/login";
        }
      }
    };

    fetchOrders();
  }, []);
  // return (
  //   <div className="orders">
  //     <div className="no-orders">
  //       <p>You haven't placed any orders today</p>

  //       <Link to={"/"} className="btn">
  //         Get started
  //       </Link>
  //     </div>
  //   </div>
  // );
  
// };
return (
  <div className="orders-container">
    {orders.length === 0 ? (
      <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to="/" className="btn">
          Get started
        </Link>
      </div>
    ) : (
      <table className="orders-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Mode</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.name}</td>
              <td>{order.qty}</td>
              <td>₹ {order.price}</td>
              <td>
                <span
                  className={`mode ${
                    order.mode === "BUY" ? "buy" : "sell"
                  }`}
                >
                  {order.mode}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}

export default Orders;