import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

const platforms2 = [
  { label: 'Codeforces', value: 60 },
  { label: 'CodeChef', value: 40 }
];

const dsaColors = ['#03C03C', '#ffeb3b', '#EF0107'];
const palette = ['#0066b2', '#A31F34'];

const pieParams = {
  height: 200,
  margin: { right: 5 },
  slotProps: { legend: { hidden: true } },
};

const ProblemsSolved = () => {
  const [dsaData, setDsaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const leetcodeUserId = localStorage.getItem("userleetcode");

  useEffect(() => {
    const fetchDsaData = async () => {
      try {
        const response = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${leetcodeUserId}`);
        console.log(response.data); // Log the API response to debug
        if (response.data) {
          const easy = response.data.easySolved;
          const medium = response.data.mediumSolved;
          const hard = response.data.hardSolved;

          const newData = [
            { label: 'Easy', value: easy },
            { label: 'Medium', value: medium },
            { label: 'Hard', value: hard },
          ];
          setDsaData(newData);
        } else {
          setError('No data available.');
        }
      } catch (err) {
        setError('Error fetching data from API.');
      } finally {
        setLoading(false);
      }
    };

    fetchDsaData();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 h-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Loading DSA Data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 h-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Error: {error}</h2>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 h-auto"
      style={{ position: 'relative', left: '33px', top: '12px' }} 
    >
      <h2 className="text-2xl font-bold text-white mb-3">Problems Solved</h2>

      {/* DSA Section */}
      <div style={{ marginBottom: '5px' }}> 
        <h3 className="text-xl font-semibold text-white mb-0">DSA</h3>

        {/* DSA Pie Chart */}
        <div className="mt-6">
          <Stack direction="row" width="100%" textAlign="center" spacing={2}>
            <Box flexGrow={1}>
              <PieChart
                colors={dsaColors}
                series={[{ data: dsaData }]}
                {...pieParams}
              />
            </Box>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default ProblemsSolved;
