import React from 'react';

interface StatusBadgeProps {
  status: 'En revisión' | 'Resuelto' | 'Pendiente';
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'En revisión':
      return 'bg-yellow-500 text-white';
    case 'Resuelto':
      return 'bg-green-500 text-white';
    case 'Pendiente':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return <span className={`inline-block px-2 py-1 rounded ${getStatusBadgeClass(status)}`}>{status}</span>;
};

export default StatusBadge;
