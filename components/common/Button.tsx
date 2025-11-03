
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, fullWidth = false, ...props }) => {
  const widthClass = fullWidth ? 'w-full' : '';
  return (
    <button
      {...props}
      className={`px-8 py-3 bg-green-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 ${widthClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
