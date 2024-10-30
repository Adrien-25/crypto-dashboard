import React from "react";
import Card from "./Card";

const Overview = ({
  symbol,
  price,
  change,
  changePercent,
  currency,
  logoLink,
}) => {
  return (
    <Card>
      {/* <span className="absolute left-4 top-4 text-neutral-400 text-lg xl:text-xl 2xl:text-2xl">
        {symbol}
      </span> */}
      <div className="flex h-full flex-col justify-center">
        <div className="flex items-center	justify-center gap-3 items-center py-3 xl:p-0">
          <img
            src={logoLink}
            alt="bitcoin"
            className="w-[3rem] h-[3rem] mx-1.5"
          ></img>
          <h1 className="capitalize text-neutral-400 text-2xl font-bold text-center d-block">
            {symbol}
          </h1>
        </div>
        <div className="w-full xl:h-full flex items-center justify-around py-3 xl:p-0">
          <span className="text-2xl xl:text-4xl 2xl:text-5xl flex items-center">
            ${price}
            <span className="text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2">
              {currency}
            </span>
          </span>
          <span
            className={`text-lg xl:text-xl 2xl:text-2xl ${
              change > 0 ? "text-lime-500" : "text-red-500"
            }`}
          >
            {/* {change}  */}
            <span>({changePercent}%)</span>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default Overview;
