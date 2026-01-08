import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { JointVenture } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface JVShareholdingChartProps {
  jointVentures: JointVenture[];
}

export const JVShareholdingChart: React.FC<JVShareholdingChartProps> = ({ jointVentures }) => {
  const data = {
    labels: jointVentures.map(jv => jv.partnerName),
    datasets: [
      {
        label: 'FF Shareholding %',
        data: jointVentures.map(jv => jv.shareholding),
        backgroundColor: [
          '#f4db42', // ffYellow
          '#18342f', // ffGreen
          '#4e4c4c', // ffDarkGrey
          '#b0adad', // ffMidGrey
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            family: 'FoundersGrotesk, system-ui, sans-serif',
            size: 12,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: '#121212',
        titleFont: {
          family: 'FoundersGrotesk, system-ui, sans-serif',
          size: 14,
        },
        bodyFont: {
          family: 'FoundersGrotesk, system-ui, sans-serif',
          size: 12,
        },
        padding: 12,
        callbacks: {
          label: function(context: any) {
            return `FF Stake: ${context.parsed}%`;
          }
        }
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-ffLightGrey">
      <h3 className="text-lg font-bold text-ffBlack mb-4">JV Shareholding Distribution</h3>
      <div className="h-80">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};
