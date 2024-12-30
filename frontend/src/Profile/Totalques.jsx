import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";

const Totalques = () => {
  const [totalSolved, setTotalSolved] = useState(0);
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

    const fetchSolvedQuestions = async () => {
      try {
        let totalSolvedCount = 0;

        // Fetch Codeforces solved questions
        const codeforcesResponse = await axios.get(
          `https://codeforces.com/api/user.status?handle=${codeforcesHandle}`
        );

        if (codeforcesResponse.data.status === "OK") {
          const solvedSet = new Set();
          codeforcesResponse.data.result.forEach((submission) => {
            if (submission.verdict === "OK") {
              solvedSet.add(submission.problem.name);
            }
          });
          totalSolvedCount += solvedSet.size;
        } else {
          setError("Failed to fetch data from Codeforces.");
          return;  // Exit early if error occurs
        }

        // Fetch LeetCode solved questions using the provided API
        const leetcodeResponse = await axios.get(
          `https://alfa-leetcode-api.onrender.com/${leetcodeUserId}/solved`
        );

        if (leetcodeResponse.data && leetcodeResponse.data.solvedProblem) {
          totalSolvedCount += leetcodeResponse.data.solvedProblem;
        } else {
          setError("Failed to fetch data from LeetCode.");
          return;  // Exit early if error occurs
        }

        setTotalSolved(totalSolvedCount);
      } catch (err) {
        console.error("Error fetching data:", err); // Log the error for more info
        setError("Error fetching data from APIs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSolvedQuestions();
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
      style={{ position: "relative", left: "30px", top: "66px" }}
    >
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-gray-300">
          Total Questions Solved
        </h3>
        <CheckCircle className="h-4 w-4 text-muted-foreground" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-100">{totalSolved}</div>
        <p className="text-xs text-gray-400">
          Impressive progress! Keep it up!
        </p>
      </div>
    </div>
  );
};

export default Totalques;
