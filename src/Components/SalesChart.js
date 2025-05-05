import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';


export const SalesChart = ({ sales }) => {
  const chartData = useMemo(() => {
    const labels = sales.map(s => new Date(s.date).toLocaleDateString());
    const data = sales.map(s => s.amount);
    return {
      labels,
      datasets: [{
        label: 'Sales',
        data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      }]
    };
  }, [sales]);

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <p className="text-white mb-2">Sales Trend</p>
      <Line data={chartData} />
    </div>
  );
};
