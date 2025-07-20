
import React from 'react';
import { COLORS } from '../constants';

interface LoadingSpinnerProps {
  text: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div style={{ borderTopColor: COLORS.primary.skyBlue }} className="w-16 h-16 border-8 border-gray-200 rounded-full animate-spin mb-6"></div>
      <p className="text-2xl font-semibold text-slate-700">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
