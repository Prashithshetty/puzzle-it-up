
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  color: string;
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, disabled = false, color, leftIcon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ backgroundColor: disabled ? '#D1D5DB' : color }}
      className="w-full px-6 py-3 text-white font-bold text-lg rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
    >
      {leftIcon && <span className="mr-3">{leftIcon}</span>}
      {text}
    </button>
  );
};

export default Button;
