import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';
import EmissionsChart from '../components/dashboard/EmissionsChart';
import EmissionSummary from '../components/dashboard/EmissionSummary';
import EmissionHotspots from '../components/dashboard/EmissionHotspots';
import {
  generateCOData,
  generateCO2Data,
  generateTimeLabels,
  generateHotspots
} from '../utils/mockData';
import { ref, onValue } from 'firebase/database';
import { database } from '../utils/firebase';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [coData, setCoData] = useState<number[]>([]);
  const [co2Data, setCo2Data] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<string[]>([]);
  const [hotspots, setHotspots] = useState<any[]>([]);

  const [coSummary, setCoSummary] = useState({
    currentValue: 0,
    dailyAverage: 0,
    peakValue: 0,
    trend: 'stable' as 'up' | 'down' | 'stable',
    trendPercentage: 0
  });

  const [co2Summary, setCo2Summary] = useState({
    currentValue: 0,
    dailyAverage: 0,
    peakValue: 0,
    trend: 'stable' as 'up' | 'down' | 'stable',
    trendPercentage: 0
  });

  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Real-time sensor value updates
  useEffect(() => {
    const coRef = ref(database, 'SensorData/MQ135'); // CO
    const co2Ref = ref(database, 'SensorData/MQ7');   // CO2

    const unsubscribeCO = onValue(coRef, (snapshot) => {
      const value = snapshot.val();
      setCoSummary(prev => ({ ...prev, currentValue: parseFloat(value) || 0 }));
    });

    const unsubscribeCO2 = onValue(co2Ref, (snapshot) => {
      const value = snapshot.val();
      setCo2Summary(prev => ({ ...prev, currentValue: parseFloat(value) || 0 }));
    });

    return () => {
      unsubscribeCO();
      unsubscribeCO2();
    };
  }, []);

  const updateData = () => {
    setLoading(true);

    const newCoData = generateCOData(24, 3, 2);
    const newCo2Data = generateCO2Data(24, 420, 60);
    const newTimeLabels = generateTimeLabels(24);
    const newHotspots = generateHotspots(8);

    setCoData(newCoData);
    setCo2Data(newCo2Data);
    setTimeLabels(newTimeLabels);
    setHotspots(newHotspots);
    setLastUpdate(new Date());

    const coPeak = Math.max(...newCoData);
    const coAverage = newCoData.reduce((sum, val) => sum + val, 0) / newCoData.length;
    const coTrend = Math.random() > 0.5 ? 'up' : 'down';
    const coTrendPercentage = Math.floor(Math.random() * 15) + 1;

    setCoSummary(prev => ({
      ...prev,
      dailyAverage: coAverage,
      peakValue: coPeak,
      trend: coTrend,
      trendPercentage: coTrendPercentage
    }));

    const co2Peak = Math.max(...newCo2Data);
    const co2Average = newCo2Data.reduce((sum, val) => sum + val, 0) / newCo2Data.length;
    const co2Trend = Math.random() > 0.5 ? 'up' : 'down';
    const co2TrendPercentage = Math.floor(Math.random() * 10) + 1;

    setCo2Summary(prev => ({
      ...prev,
      dailyAverage: co2Average,
      peakValue: co2Peak,
      trend: co2Trend,
      trendPercentage: co2TrendPercentage
    }));

    setLoading(false);
  };

  useEffect(() => {
    updateData();

    const interval = setInterval(() => {
      updateData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('dashboard.lastUpdate')}: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>

        <button
          onClick={updateData}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <EmissionSummary
          type="CO"
          currentValue={coSummary.currentValue}
          dailyAverage={coSummary.dailyAverage}
          peakValue={coSummary.peakValue}
          trend={coSummary.trend}
          trendPercentage={coSummary.trendPercentage}
        />
        <EmissionSummary
          type="CO2"
          currentValue={co2Summary.currentValue}
          dailyAverage={co2Summary.dailyAverage}
          peakValue={co2Summary.peakValue}
          trend={co2Summary.trend}
          trendPercentage={co2Summary.trendPercentage}
          unit="ppm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EmissionsChart
          title={t('dashboard.carbonMonoxide')}
          labels={timeLabels}
          data={coData}
          color="#3B82F6"
          limit={9}
          unit="ppm"
        />
        <EmissionsChart
          title={t('dashboard.carbonDioxide')}
          labels={timeLabels}
          data={co2Data}
          color="#8B5CF6"
          limit={500}
          unit="ppm"
        />
      </div>

      <EmissionHotspots hotspots={hotspots} />
    </div>
  );
};

export default DashboardPage;
