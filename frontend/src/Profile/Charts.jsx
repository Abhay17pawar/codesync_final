import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RatingChart = () => {
  const [chartData, setChartData] = useState(null);
  const handle = localStorage.getItem('usercodechef') 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://codechef-api.vercel.app/handle/${handle}`
        );
        const { ratingData } = response.data;

        const labels = ratingData.map((entry) => entry.code); // Contest names
        const ratings = ratingData.map((entry) => parseInt(entry.rating, 10)); // Ratings

        setChartData({
          labels,
          datasets: [
            {
              label: "CodeChef Ratings",
              data: ratings,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [handle]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows control over height and width
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500, // Y-axis interval
        },
      },
      x: {
        ticks: {
          display: false, // Hides X-axis labels
        },
        grid: {
          display: false, // Hides X-axis grid lines
        },
      },
    },
  };

  return (
    <div
      className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-md"
      style={{
        width: "950px", // Adjust chart container width
        height: "400px", // Adjust chart container height
        transform: "translate(390px, -684px)", // Moves the chart horizontally and vertically
        padding: "20px", // Adds padding inside the container
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RatingChart;
