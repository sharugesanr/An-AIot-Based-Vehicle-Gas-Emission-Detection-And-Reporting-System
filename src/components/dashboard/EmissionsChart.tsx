import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../../contexts/ThemeContext';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface EmissionsChartProps {
  title: string;
  labels: string[];
  data: number[];
  color: string;
  limit?: number;
  unit?: string;
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({
  title,
  labels,
  data,
  color,
  limit = 0,
  unit = 'ppm'
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  
  // Chart styling for light/dark mode
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
  
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: color,
        backgroundColor: `${color}33`, // Color with alpha for fill
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: true,
        tension: 0.4, // Smooth curves
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: textColor,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(17, 24, 39, 0.9)',
        bodyColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(17, 24, 39, 0.7)',
        borderColor: gridColor,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw} ${unit}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          maxRotation: 45,
          minRotation: 45,
        }
      },
      y: {
        grid: {
          color: gridColor,
          drawBorder: false,
        },
        ticks: {
          color: textColor,
          callback: function(value: any) {
            return `${value} ${unit}`;
          }
        },
        beginAtZero: true,
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    },
    animation: {
      duration: 1000,
    }
  };
  
  return (
    <div className="h-80 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {limit > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('dashboard.safeLevel')}:
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              &lt; {limit} {unit}
            </span>
          </div>
        )}
      </div>
      <div className="h-64">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default EmissionsChart;