import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';

interface Hotspot {
  id: number;
  lat: number;
  lng: number;
  level: 'low' | 'medium' | 'high';
  reading: number;
  type: 'CO' | 'CO2';
}

interface EmissionHotspotsProps {
  hotspots: Hotspot[];
}

const EmissionHotspots: React.FC<EmissionHotspotsProps> = ({ hotspots }) => {
  const { t } = useTranslation();
  
  // Get color and class based on emission level
  const getLevelStyles = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return {
          bgClass: 'bg-green-100 dark:bg-green-900',
          textClass: 'text-green-800 dark:text-green-200',
          icon: '🟢'
        };
      case 'medium':
        return {
          bgClass: 'bg-yellow-100 dark:bg-yellow-900',
          textClass: 'text-yellow-800 dark:text-yellow-200',
          icon: '🟡'
        };
      case 'high':
        return {
          bgClass: 'bg-red-100 dark:bg-red-900',
          textClass: 'text-red-800 dark:text-red-200',
          icon: '🔴'
        };
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('dashboard.hotspots')}
        </h3>
        {hotspots.filter(h => h.level === 'high').length > 0 && (
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-1" />
            <span className="text-sm text-red-500">
              {hotspots.filter(h => h.level === 'high').length} critical hotspots detected
            </span>
          </div>
        )}
      </div>
      
      <div className="overflow-y-auto max-h-80">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Reading
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Level
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {hotspots.map((hotspot) => {
              const levelStyles = getLevelStyles(hotspot.level);
              
              return (
                <tr key={hotspot.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    #{hotspot.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {hotspot.lat.toFixed(4)}, {hotspot.lng.toFixed(4)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {hotspot.type}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {hotspot.reading.toFixed(2)} ppm
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`${levelStyles.bgClass} ${levelStyles.textClass} px-2 py-1 text-xs font-medium rounded-full`}>
                      {levelStyles.icon} {hotspot.level.charAt(0).toUpperCase() + hotspot.level.slice(1)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmissionHotspots;