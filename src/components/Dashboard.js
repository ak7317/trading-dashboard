import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import { useEffect } from "react";




const Dashboard = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
  const tokenFromURL = params.get("token");
  if (tokenFromURL) {
    localStorage.setItem("token", tokenFromURL);

    // 👉 optional: URL clean कर दो
    window.history.replaceState({}, document.title, "/");
  }

  // 🔐 final check
  const token = localStorage.getItem("token");


  if (!token) {
    window.location.href = "/login";
  }
}, []);
  return  (
    <GeneralContextProvider>
    <div className="dashboard-container">
    
      <WatchList />
   
    
      <div className="content">
        <Routes>
         <Route path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
     </GeneralContextProvider>
  );
};

export default Dashboard;