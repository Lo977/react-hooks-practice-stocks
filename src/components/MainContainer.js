import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [isPortfolio, setIsPortfolio] = useState([]);
  const [sort, setSort] = useState(false);
  const [category, setCategory] = useState("");
  console.log(category);
  // console.log(sort);
  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then((data) => setStocks(data));
  }, []);
  // console.log(stocks);
  // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;//
  function handleFilter(e) {
    setCategory(e);
  }
  // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;//
  const filteredStocks = stocks.filter((stock) =>
    stock.type.startsWith(category)
  );
  // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;//

  function handleSort(sortItem) {
    setSort(sortItem);
    const sortedStocks =
      sortItem === "Alphabetically"
        ? stocks.sort((a, b) => a.name.localeCompare(b.name))
        : stocks.sort((a, b) => a.price - b.price);
    setStocks(sortedStocks);
  }
  // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;//
  function addStocksOnPorfolio(stock) {
    if (isPortfolio.find((portfolio) => portfolio.id === stock.id)) {
      return null;
    } else {
      setIsPortfolio([...isPortfolio, stock]);
    }
  }
  function removedStock(stock) {
    const removedStock = isPortfolio.filter(
      (portfolio) => portfolio.id !== stock.id
    );
    setIsPortfolio(removedStock);
  }
  // ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;//

  return (
    <div>
      <SearchBar onSort={handleSort} onFilter={handleFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={filteredStocks}
            onAddStock={addStocksOnPorfolio}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            isPortfolio={isPortfolio}
            onRemove={removedStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
