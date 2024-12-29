import React from 'react';
import { ChartNoAxesCombined } from 'lucide-react'; // Import the desired icon

const Totalcontest = () => {
  const totalSolved = 200;

  return (
    <div className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 h-36" style={{ position: 'relative', left: '30px', top: '80px' }}>
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-300">Total Contests</h3>
        <ChartNoAxesCombined className="h-5 w-5 text-gray-400" /> 
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-100">{totalSolved}</div>
        <p className="text-xs text-gray-400">
          Keep participating!
        </p>
      </div>
    </div>
  );
};

export default Totalcontest;
