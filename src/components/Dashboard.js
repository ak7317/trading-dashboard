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
// import { useNavigate } from "react-router-dom";




const Dashboard = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
   const tokenFromURL = params.get("token");
    console.log("TOKEN FROM URL:", tokenFromURL);
  if (tokenFromURL) {
    localStorage.setItem("token", tokenFromURL);

    // 👉 optional: URL clean कर दो
    // window.history.replaceState({}, document.title, "/");
    setTimeout(() => {
       window.history.replaceState({}, document.title, window.location.pathname);
  
    }, 100);
   
  }

  // 🔐 final check
  const token = localStorage.getItem("token");
   console.log("TOKEN IN STORAGE:", token);


  if (!token) {
    // window.location.href = "http://localhost:3000/login";
      window.location.href = "trading-fronted-git-main-ak7317s-projects.vercel.app/login";
    // NavigateEvent("/login");
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