import React from "react";
import dayjs from "dayjs";

const Heatmap = ({ activityData }) => {
  // Get the last 5 months dynamically
  const getLastFiveMonths = () => {
    const months = [];
    for (let i = 0; i < 5; i++) {
      const date = dayjs().subtract(i, "month");
      months.push({
        name: date.format("MMM"), // Get short month name
        year: date.year(), // Year to differentiate between years if needed
        days: date.daysInMonth(), // Get the number of days in the month
      });
    }
    return months.reverse(); // Reverse to display in chronological order
  };

  // Map activity counts to colors
  const getColor = (count) => {
    if (count === 0) return "bg-gray-200"; // Light gray
    if (count === 1) return "bg-green-200"; // Light green
    if (count === 2) return "bg-green-400"; // Medium green
    return "bg-green-600"; // Dark green
  };

  const months = getLastFiveMonths();

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-5 rounded-lg shadow-md max-h-[240px] mt-20 "style={{ position: 'relative', left: '25px', top: '48px' }} >
      <h2 className="text-white text-lg font-semibold mb-4">
        Activity Heatmap
      </h2>
      <div className="flex items-start space-x-4 overflow-x-auto p-4">
        {months.map((month, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <h3 className="mb-2 text-gray-300 text-sm font-medium">
              {month.name}
            </h3>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: month.days }).map((_, dayIdx) => {
                const activityCount =
                  activityData?.[`${month.name}-${month.year}`]?.[dayIdx] || 0;   
                return (
                  <div
                    key={dayIdx}
                    className={`w-4 h-4 rounded-sm ${getColor(activityCount)}`}
                    title={`Count: ${activityCount}`}
                  ></div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Heatmaps = () => {
  const activityData = {
    "Jul-2023": Array(31).fill().map(() => Math.floor(Math.random() * 4)),
    "Aug-2023": Array(31).fill().map(() => Math.floor(Math.random() * 4)),
    "Sep-2023": Array(30).fill().map(() => Math.floor(Math.random() * 4)),
    "Oct-2023": Array(31).fill().map(() => Math.floor(Math.random() * 4)),
    "Nov-2023": Array(30).fill().map(() => Math.floor(Math.random() * 4)),
    "Dec-2023": Array(31).fill().map(() => Math.floor(Math.random() * 4)),
  };

  return (
      <Heatmap activityData={activityData} />
  );
};

export default Heatmaps;
