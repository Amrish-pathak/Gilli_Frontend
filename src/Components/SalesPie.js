import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SalesPie = () => {
  const data = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      {
        label: 'Sales by Product',
        data: [300, 50, 100],
        backgroundColor: ['#4F46E5', '#22D3EE', '#6366F1'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="bg-[#1f2937] p-4 rounded-lg">
      <h2 className="text-white text-lg font-semibold mb-2">Sales by Product</h2>
      <Pie data={data} />
    </div>
  );
};
