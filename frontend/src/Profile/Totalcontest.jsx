import React, { useEffect, useState } from "react";
import { ChartNoAxesCombined } from "lucide-react";
import axios from "axios";

const Totalcontest = () => {
  const [totalContests, setTotalContests] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codeforcesHandle = localStorage.getItem("userCodeforces");
    const leetcodeUserId = localStorage.getItem("userleetcode");

    if (!codeforcesHandle || !leetcodeUserId) {
      setError("Missing handles for Codeforces or LeetCode.");
      setLoading(false);
      return;
    }

    const fetchContests = async () => {
      try {
        let totalContestsCount = 0;

        // Fetch Codeforces contests
        const codeforcesResponse = await axios.get(
          `https://codeforces.com/api/user.rating?handle=${codeforcesHandle}`
        );

        if (codeforcesResponse.data.status === "OK") {
          totalContestsCount += codeforcesResponse.data.result.length; // Adding Codeforces contests
        } else {
          setError("Failed to fetch data from Codeforces.");
          return;  // Exit early if error occurs
        }

        // Fetch LeetCode contests
        const leetcodeResponse = await axios.get(
          `https://alfa-leetcode-api.onrender.com/${leetcodeUserId}/contest`
        );

        if (leetcodeResponse.data && leetcodeResponse.data.contestAttend) {
          totalContestsCount += leetcodeResponse.data.contestAttend; // Adding LeetCode contests
        } else {
          setError("Failed to fetch data from LeetCode.");
          return;  // Exit early if error occurs
        }

        setTotalContests(totalContestsCount);
      } catch (err) {
        console.error("Error fetching data:", err); // Log the error for more info
        setError("Error fetching data from APIs.");
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 h-36">
        <p className="text-sm font-medium text-gray-300">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 h-36">
        <p className="text-sm font-medium text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 h-36"
      style={{ position: "relative", left: "30px", top: "80px" }}
    >
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-300">Total Contests</h3>
        <ChartNoAxesCombined className="h-5 w-5 text-gray-400" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-100">{totalContests}</div>
        <p className="text-xs text-gray-400">Keep participating!</p>
      </div>
    </div>
  );
};

export default Totalcontest;
