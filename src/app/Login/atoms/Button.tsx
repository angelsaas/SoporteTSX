import React from 'react';

interface ButtonProps {
  text: string;
  onClick: (e: React.FormEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
  >
    {text}
  </button>
);

export default Button;
