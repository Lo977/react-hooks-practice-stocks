import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ isPortfolio, onRemove }) {
  const portfolioDispay = isPortfolio.map((stock) => {
    return <Stock key={stock.id} stock={stock} handleStocks={onRemove} />;
  });
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioDispay}
    </div>
  );
}

export default PortfolioContainer;
