import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
 const codeforcesHandle = localStorage.getItem("userCodeforces");

const CodeforcesRatingChart = () => {
  const [ratingData, setRatingData] = useState({ labels: [], data: [] });

  useEffect(() => {
   
    fetch(`https://codeforces.com/api/user.rating?handle=${codeforcesHandle}`)
      .then((response) => response.json())
      .then((data) => {
        const labels = data.result.map((item) => item.contestId);
        const rating = data.result.map((item) => item.newRating);
        setRatingData({ labels, data: rating });
      });
  }, []);

  const ratingChart = {
    labels: ratingData.labels,
    datasets: [
      {
        label: "Codeforces Ratings",
        data: ratingData.data,
        borderColor: "rgba(75, 192, 192, 1)", 
        backgroundColor: "rgba(75, 192, 192, 0.2)", 
        fill: true,
      },
    ],
  };

  const ratingChartOptions = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      title: {
        display: false,
        color: "#fff", 
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)", 
        callbacks: {
            
            label: function (tooltipItem) {
              return `Rating: ${tooltipItem.raw}`; 
            },
            title: function() {
                return ''; // Hides the contest ID or title
              }
          },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500, 
        },
        grid: {
          borderColor: "rgba(75, 192, 192, 0.2)", // Y-axis grid color
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
        width: "1050px", 
        height: "400px", 
        transform: "translate(800px, -1050px)", 
        padding: "20px", 
      }}
    >
      <Line data={ratingChart} options={ratingChartOptions} />
    </div>
  );
};

export default CodeforcesRatingChart;
