import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';

const platforms = [
  { label: 'Easy', value: 50 },
  { label: 'Medium', value: 30 },
  { label: 'Hard', value: 20 },
];

const platforms2 = [
    { label: 'Codeforces', value: 60},
    { label: 'CodeChef' , value : 40}
]
const dsaColors = ['#03C03C', '#ffeb3b', '#EF0107'];
const palette = ['#0066b2', '#A31F34'];

const colorPerItem = [
  { ...platforms[0], color: 'orange' },
  { ...platforms[1], color: 'gray' },
];

const pieParams = {
  height: 200,
  margin: { right: 5 },
  slotProps: { legend: { hidden: true } },
};

const ProblemsSolved = () => {
  return (
    <div className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 h-auto"style={{ position: 'relative', left: '385px', top: '-338px' }}>
      <h2 className="text-2xl font-bold text-white mb-6">Problems Solved</h2>

      {/* DSA Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">DSA</h3>
        
        {/* DSA Pie Chart */}
        <div className="mt-6">
          <Stack direction="row" width="100%" textAlign="center" spacing={2}>
            <Box flexGrow={1}>
              <PieChart
                colors={dsaColors}
                series={[{ data: platforms }]}
                {...pieParams}
              />
            </Box>
          </Stack>
        </div>
      </div>

      {/* Competitive Programming Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Competitive Programming</h3>
        
        {/* Competitive Programming Pie Chart for Overall */}
        <div className="mt-6">
          <Stack direction="row" width="100%" textAlign="center" spacing={2}>
            <Box flexGrow={1}>
              <PieChart
                colors={palette}
                series={[{ data: platforms2 }]}
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
