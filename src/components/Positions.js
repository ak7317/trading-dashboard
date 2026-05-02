import React, {useState, useEffect} from "react";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    axios
      .get("https://trading-backend-2d5t.onrender.com/allPositions", {
        headers: { Authorization: token },
      })
      .then((res) => setAllPositions(res.data))
      .catch((err) => {
        if (err.response?.status === 403) {
          window.location.href = "/login";
        }
      });
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>

          <tbody>
            {allPositions.map((stock, index) => {
              const curValue = (stock.price || 0) * (stock.qty || 0);
              const pnl = curValue - (stock.avg || 0) * (stock.qty || 0);
              const isProfit = pnl >= 0;

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg?.toFixed(2)}</td>
                  <td>{stock.price?.toFixed(2)}</td>
                  <td className={isProfit ? "profit" : "loss"}>
                    {pnl.toFixed(2)}
                  </td>
                  <td>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;