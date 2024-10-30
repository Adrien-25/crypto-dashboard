import React, { useContext, useEffect, useState } from "react";
import ChartFilter from "./ChartFilter";
import Card from "./Card";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Tooltip,
  Line,
} from "recharts";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchHistoricalData } from "../utils/api/stock-api";
import // createDate,
// convertDateToUnixTimestamp,
// convertUnixTimestampToDate,
"../utils/helpers/date-helper";
import { chartConfig } from "../constants/config";

const Chart = () => {
  const [filter, setFilter] = useState("1D");
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [data, setData] = useState([]);

  const formatData = (data) => {
    return data.prices.map((item, index) => {
      return {
        value: item[1],
        date: new Date(item[0]).toLocaleDateString(),
      };
    });
  };

  useEffect(() => {
    // const getDateRange = () => {
    //   const { days, weeks, months, years } = chartConfig[filter];
    //   const endDate = new Date();
    //   const startDate = createDate(endDate, -days, -weeks, -months, -years);
    //   const startTimestampUnix = convertDateToUnixTimestamp(startDate);
    //   const endTimestampUnix = convertDateToUnixTimestamp(endDate);
    //   return { startTimestampUnix, endTimestampUnix };
    // };

    const updateChartData = async () => {
      try {
        // const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;
        const result = await fetchHistoricalData(
          stockSymbol,
          resolution
          // startTimestampUnix,
          // endTimestampUnix
        );
        setData(formatData(result));
      } catch (error) {
        setData([]);
        // console.log(result);
      }
    };

    console.log(data);
    updateChartData();
    // eslint-disable-next-line
  }, [stockSymbol, filter]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => (
          <li key={item}>
            <ChartFilter
              text={item}
              active={filter === item}
              onClick={() => {
                setFilter(item);
              }}
            />
          </li>
        ))}
      </ul>
      <ResponsiveContainer className="p-0">
        <LineChart  data={data}>
          <Tooltip
            contentStyle={darkMode ? { backgroundColor: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
            cursor={false}
            formatter={(value) => [`${value}`, "Prix"]}
          />
          <Line
            type="monotone"
            dataKey="value"
            // stroke="#312e81"
            stroke={darkMode ? "#818cf8" : "#312e81"}
            fill="url(#chartColor)"
            fillOpacity={1}
            strokeWidth={0.5}
            // dot={true}
            dot={{ r: 3, fill: darkMode ? "#818cf8" : "#312e81" }} // Couleur des points
          />

          <XAxis dataKey="date" tick={false} />

          <YAxis
            tick={false}
            // domain={["dataMin", "dataMax"]}
            domain={[(dataMin) => dataMin * 0.99, "dataMax"]}
          />
        </LineChart >
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
