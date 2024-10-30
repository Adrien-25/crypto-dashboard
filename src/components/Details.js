import React, { useContext } from "react";
import Card from "./Card";
import ThemeContext from "../context/ThemeContext";

const Details = ({ details }) => {
  const { darkMode } = useContext(ThemeContext);

  const detailsList = {
    name: "Nom",
    symbol: "Symbole",
    genesis_date: "Création",
    hashing_algorithm: "Hachage",
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <Card>
      <ul
        className={`w-full h-full flex flex-col justify-between divide-y-1 ${
          darkMode ? "divide-gray-800" : null
        }`}
      >
        {Object.keys(detailsList).map((item) => {
          let displayValue = details[item];
          if (item === "symbol") {
            displayValue = displayValue?.toUpperCase();
          } else if (item === "genesis_date" && displayValue) {
            displayValue = formatDate(displayValue);
          }
          return (
            <li key={item} className="flex-1 flex justify-between items-center">
              <span>{detailsList[item]}</span>
              <span className="font-bold">
                {/* {details[item]} */}
                {displayValue}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
