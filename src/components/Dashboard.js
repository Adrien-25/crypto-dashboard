import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import Overview from "./Overview";
import Details from "./Details";
import Chart from "./Chart";
import Header from "./Header";
import StockContext from "../context/StockContext";
import { fetchStockDetails } from "../utils/api/stock-api";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [stockDetails, setStockDetails] = useState({});
  // console.log(JSON.stringify(stockDetails, null, 2));

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };
    // console.log(stockDetails);
    updateStockDetails();
    // eslint-disable-next-line
  }, [stockSymbol]);

  return (
    <div
      // className={`grid-rows-[auto, 1fr, 1fr, 1fr, ...] h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 pt-0 font-quicksand ${
      //   darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      // }`}
      className={`grid-rows-[auto, 1fr, 1fr, 1fr, ...] h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-10 pt-0 font-quicksand min-h-screen h-fit	${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 flex justify-between items-center py-3">
        <Header name={stockDetails.name} />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Chart />
      </div>
      <div>
        <Overview
          symbol={stockSymbol}
          price={stockDetails.market_data?.current_price?.usd}
          change={stockDetails.market_data?.price_change_24h}
          changePercent={stockDetails.market_data?.market_cap_change_percentage_24h?.toFixed(
            2
          )}
          logoLink={stockDetails.image?.small}
          currency={stockDetails.currency}
        />
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
    </div>
  );
};

export default Dashboard;
