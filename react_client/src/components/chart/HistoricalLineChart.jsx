import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import lcwSingleHistory from "../../api/lcwHistoricalAPI";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  PointElement,
  LineElement,
} from "chart.js";
import lcwRemainingCredits from "../../api/lcwRemainingCredits";
import SpinAnimation from "../animation/Animation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  PointElement,
  LineElement
);

// Number of milliseconds in each day
const _MILLISECONDS_PER_DAY = 86400000;

const dateSevenDaysAgo = (days = 30) => {
  const daysBeforeInMS = days * _MILLISECONDS_PER_DAY;
  const today = Date.now();
  console.log(
    "today: ",
    today,
    " less daysBefore: ",
    daysBeforeInMS,
    " equal = ",
    today - daysBeforeInMS
  );
  return today - daysBeforeInMS;
};

function HistoricalLineChart({
  coin = "BTC",
  // start = new Date(),
  // end = dateSevenDaysAgo(),
}) {
  const start = new Date();
  const end = dateSevenDaysAgo();

  const [rates, setRates] = useState([]);
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getHistoryData = async function fetchData() {
    const cryptoData = await lcwSingleHistory(coin, start, end);
    if (cryptoData) {
      setRates(() => cryptoData.history.map((data) => data.rate));
      setDates(() =>
        cryptoData.history.map((data) => new Date(data.date).toLocaleString())
      );
      setIsLoading(false);
      // console.log(lcwRemainingCredits());
      // console.log(
      //   "User Data RATE: ",
      //   cryptoData.history?.map((entry) => entry.rate)
      // );
      // console.log(
      //   "User Data DATE: ",
      //   cryptoData.history?.map((entry) =>
      //     new Date(entry.date).toLocaleString()
      //   )
      // );
    }
  };

  setTimeout(() => {
    getHistoryData();
  }, 60000);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: `${coin} Price in USD`,
        data: rates,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${coin.toUpperCase()} Historical Data | ${start}`,
      },
    },
    title: {
      display: true,
      text: "Cryptocurrency Line Chart",
    },
  };

  return (
    <>
      {isLoading ? (
        <SpinAnimation />
      ) : (
        <div className="line-chart w-50">
          <Line data={chartData} options={options} />
        </div>
      )}
    </>
  );
}

export default HistoricalLineChart;
