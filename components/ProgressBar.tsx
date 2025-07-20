
import React from 'react';
import { COLORS } from '../constants';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="w-full flex-grow">
      <p className="text-sm font-semibold text-slate-600 mb-1">
        Puzzle {current} of {total}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="h-4 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%`, backgroundColor: COLORS.primary.green }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
