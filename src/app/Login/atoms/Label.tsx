import React from 'react';

interface LabelProps {
  text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {text}
    </label>
  );
};

export default Label;
