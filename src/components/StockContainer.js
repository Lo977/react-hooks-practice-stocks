import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, onAddStock }) {
  const stocksDisplay = stocks.map((stock) => {
    return <Stock key={stock.id} stock={stock} handleStocks={onAddStock} />;
  });
  return (
    <div>
      <h2>Stocks</h2>
      {stocksDisplay}
    </div>
  );
}

export default StockContainer;
