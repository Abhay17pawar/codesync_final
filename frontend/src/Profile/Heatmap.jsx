import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

const Heatmap = ({ activityData }) => {
  const getLastFiveMonths = () => {
    const months = [];
    for (let i = 0; i < 5; i++) {
      const date = dayjs().subtract(i, "month");
      months.push({
        name: date.format("MMM"), 
        year: date.year(), 
        days: date.daysInMonth(), 
      });
    }
    return months.reverse(); 
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
    <div
      className="bg-gradient-to-b from-gray-800 to-gray-900 p-5 rounded-lg shadow-md max-h-[240px] mt-20"
      style={{ position: "relative", left: "25px", top: "48px" }}
    >
      <h2 className="text-white text-lg font-semibold mb-4">
        Codeforces Activity Heatmap
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
                  activityData?.[`${month.name}-${month.year}`]?.[dayIdx] || 0; // Daily activity
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
  const [activityData, setActivityData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codeforcesHandle = localStorage.getItem("userCodeforces");

    if (!codeforcesHandle) {
      setError("Codeforces handle not found.");
      setLoading(false);
      return;
    }

    const fetchActivityData = async () => {
      try {
        const response = await axios.get(
          `https://codeforces.com/api/user.status?handle=${codeforcesHandle}`
        );

        if (response.data.status === "OK") {
          const submissions = response.data.result;
          const activityMap = {};

          // Process submissions
          submissions.forEach((submission) => {
            const date = dayjs.unix(submission.creationTimeSeconds);
            const monthKey = `${date.format("MMM")}-${date.year()}`;
            const dayIndex = date.date() - 1; 

            if (!activityMap[monthKey]) {
              activityMap[monthKey] = Array(date.daysInMonth()).fill(0);
            }

            activityMap[monthKey][dayIndex] += 1; // Increment count for the day
          });

          setActivityData(activityMap);
        } else {
          setError("Failed to fetch data from Codeforces.");
        }
      } catch (err) {
        setError("Error fetching data from Codeforces API.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center">
        <p>Loading activity data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return <Heatmap activityData={activityData} />;
};

export default Heatmaps;
