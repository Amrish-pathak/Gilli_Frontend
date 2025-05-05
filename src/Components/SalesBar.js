// SalesBar.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const SalesBar = ({ sales }) => {
  const categories = ['Category 1', 'Category 2', 'Category 3'];
  const data = [3000, 5000, 2500];

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <p className="text-white mb-2">Sales by Category</p>
      <Bar
        data={{
          labels: categories,
          datasets: [{
            label: 'Sales',
            data,
            backgroundColor: ['#4b5563', '#8b5cf6', '#06b6d4']
          }]
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: '#fff'
              }
            }
          },
          scales: {
            x: {
              ticks: { color: '#fff' }
            },
            y: {
              ticks: { color: '#fff' }
            }
          }
        }}
      />
    </div>
  );
};
