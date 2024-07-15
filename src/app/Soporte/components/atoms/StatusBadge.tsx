import React from 'react';

interface StatusBadgeProps {
  status?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case 'PEN':
        return 'bg-yellow-500 text-white';
      case 'RES':
        return 'bg-green-500 text-white';
      case 'ERR':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <span className={`inline-block px-2 py-1 rounded ${getStatusBadgeClass(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
