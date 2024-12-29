import React from 'react';
import { CheckCircle } from 'lucide-react';

const Totalques = () => {
  const totalSolved = 200;

  return (
    <div className="w-full max-w-sm bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 h-36 " style={{ position: 'relative', left: '30px', top: '66px' }}>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-gray-300">Total Questions Solved</h3>   
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
