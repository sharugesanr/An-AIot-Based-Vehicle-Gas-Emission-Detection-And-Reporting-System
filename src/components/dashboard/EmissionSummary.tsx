import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingDown, TrendingUp, BarChart2 } from 'lucide-react';

interface EmissionSummaryProps {
  type: 'CO' | 'CO2';
  currentValue: number;
  dailyAverage: number;
  peakValue: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  unit?: string;
}

const EmissionSummary: React.FC<EmissionSummaryProps> = ({
  type,
  currentValue,
  dailyAverage,
  peakValue,
  trend,
  trendPercentage,
  unit = 'ppm'
}) => {
  const { t } = useTranslation();
  
  // Determine colors based on emission type and trend
  const getColor = () => {
    if (type === 'CO') {
      // CO colors
      return {
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        textColor: 'text-blue-700 dark:text-blue-300',
        iconColor: 'text-blue-600 dark:text-blue-400'
      };
    } else {
      // CO2 colors
      return {
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        borderColor: 'border-purple-200 dark:border-purple-800',
        textColor: 'text-purple-700 dark:text-purple-300',
        iconColor: 'text-purple-600 dark:text-purple-400'
      };
    }
  };
  
  const getTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUp className="h-5 w-5 text-red-500" />;
    } else if (trend === 'down') {
      return <TrendingDown className="h-5 w-5 text-green-500" />;
    } else {
      return <BarChart2 className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  const getTrendText = () => {
    if (trend === 'up') {
      return (
        <span className="text-red-500">
          +{trendPercentage}% {t('dashboard.emissionTrend')}
        </span>
      );
    } else if (trend === 'down') {
      return (
        <span className="text-green-500">
          -{trendPercentage}% {t('dashboard.emissionTrend')}
        </span>
      );
    } else {
      return (
        <span className="text-yellow-500">
          Stable {t('dashboard.emissionTrend')}
        </span>
      );
    }
  };
  
  const colors = getColor();
  
  return (
    <div className={`rounded-lg shadow-sm p-4 ${colors.bgColor} border ${colors.borderColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-semibold ${colors.textColor}`}>
            {type === 'CO' ? t('dashboard.carbonMonoxide') : t('dashboard.carbonDioxide')}
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {currentValue.toFixed(2)} <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
          </p>
        </div>
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${colors.bgColor}`}>
          {type === 'CO' ? (
            <span className="text-2xl">💨</span>
          ) : (
            <span className="text-2xl">🌫️</span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.dailyAverage')}</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {dailyAverage.toFixed(2)} {unit}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t('dashboard.peakValue')}</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {peakValue.toFixed(2)} {unit}
          </p>
        </div>
      </div>
      
      <div className="flex items-center mt-4 text-sm">
        {getTrendIcon()}
        <span className="ml-1">{getTrendText()}</span>
      </div>
    </div>
  );
};

export default EmissionSummary;