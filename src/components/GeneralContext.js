import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [orderMode, setOrderMode] = useState("BUY");
  
  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setOrderMode("BUY");
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };
  const handleOpenSellWindow = (uid) => {
  setIsSellWindowOpen(true);
  setSelectedStockUID(uid);
  setOrderMode("SELL");
};
const handleCloseSellWindow = () => {
  setIsSellWindowOpen(false);
  setSelectedStockUID("");
};

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
          openSellWindow: handleOpenSellWindow,
         closeSellWindow: handleCloseSellWindow,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID}  mode={orderMode} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID}mode={orderMode} />}
      </GeneralContext.Provider>
  );
};

export default GeneralContext;