import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const token = localStorage.getItem("token");

        // 🔐 Auth check
        if (!token) {
          // alert("Please login first");
          window.location.href = "https://trading-fronted-gamma.vercel.app/login";
          return;
        }

        const res = await axios.get(
          "https://trading-backend-2d5t.onrender.com/allHoldings",
          {
            headers: {
               Authorization: `Bearer ${token}`,
            },
          }
        );
          console.log("DATA:", res.data);
        setAllHoldings(res.data);
        setLoading(false);
      } catch (err) {
        console.log("Error:", err);

        if (err.response?.status === 403) {
          alert("Please login first");
          // window.location.href = "/login";
           window.location.href = "https://trading-fronted-gamma.vercel.app/login";
        }
        } finally {
         setLoading(false);
      }
    };

    fetchHoldings();
  }, []);

  // 🔄 Loading state
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }
  
  // 📊 Graph data
  const labels = allHoldings?.map((item) => item.name || "N/A") || [];

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings?.map((stock) => Number(stock.price) || 0) || [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

   console.log("GRAPH DATA:", data);

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          {/* ✅ Proper table structure */}
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock) => {
              const price = stock.price || 0;
              const qty = stock.qty || 0;
              const avg = stock.avg || 0;

              const curValue = price * qty;
              const pnl = curValue - avg * qty;

              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || stock.name}>
                  <td>{stock.name}</td>
                  <td>{qty}</td>
                  <td>{avg.toFixed(2)}</td>
                  <td>{price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>

                  <td className={profClass}>
                    {pnl.toFixed(2)}
                  </td>

                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="row">
        <div className="col">
          <h5>29,875.<span>55</span></h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>31,428.<span>95</span></h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;