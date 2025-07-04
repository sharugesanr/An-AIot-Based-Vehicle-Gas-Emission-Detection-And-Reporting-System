import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Navigation, Clock, AlertTriangle, Route } from 'lucide-react';
import { vehicleData, generateHotspots } from '../utils/mockData';

const MapLocationPage: React.FC = () => {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [hotspots, setHotspots] = useState<any[]>(generateHotspots(5));
  
  // Create a fake map canvas with vehicle location
  useEffect(() => {
    if (mapRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = mapRef.current.clientWidth;
      canvas.height = mapRef.current.clientHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw map background
        const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const bgColor = theme === 'dark' ? '#1E293B' : '#F8FAFC';
        const gridColor = theme === 'dark' ? '#334155' : '#E2E8F0';
        const roadColor = theme === 'dark' ? '#475569' : '#CBD5E1';
        const waterColor = theme === 'dark' ? '#1E40AF' : '#93C5FD';
        
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid lines
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let y = 0; y < canvas.height; y += 30) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        
        // Vertical grid lines
        for (let x = 0; x < canvas.width; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        // Draw a few fake roads
        ctx.strokeStyle = roadColor;
        ctx.lineWidth = 10;
        
        // Main roads
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        
        // Draw a fake water body
        ctx.fillStyle = waterColor;
        ctx.beginPath();
        ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 60, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw vehicle marker
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Draw vehicle point
        ctx.fillStyle = '#3B82F6';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw pulse around vehicle
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        for (let i = 1; i <= 3; i++) {
          ctx.globalAlpha = 0.3 - (i * 0.1);
          ctx.beginPath();
          ctx.arc(centerX, centerY, 12 + (i * 8), 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        
        // Draw hotspots
        hotspots.forEach((hotspot) => {
          // Generate random position around center
          const offsetX = (Math.random() - 0.5) * canvas.width * 0.7;
          const offsetY = (Math.random() - 0.5) * canvas.height * 0.7;
          const x = centerX + offsetX;
          const y = centerY + offsetY;
          
          let color;
          if (hotspot.level === 'low') {
            color = '#10B981'; // Green
          } else if (hotspot.level === 'medium') {
            color = '#F59E0B'; // Amber
          } else {
            color = '#EF4444'; // Red
          }
          
          // Draw hotspot marker
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw pulse for high-level hotspots
          if (hotspot.level === 'high') {
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, 14, 0, Math.PI * 2);
            ctx.stroke();
          }
        });
        
        // Append the canvas to the map container
        mapRef.current.innerHTML = '';
        mapRef.current.appendChild(canvas);
      }
    }
  }, [hotspots, lastUpdated]);
  
  // Update periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      setHotspots(generateHotspots(5));
    }, 20000); // Every 20 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('mapLocation.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {t('mapLocation.lastUpdated')}: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map visualization */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 h-[600px]">
          <div ref={mapRef} className="w-full h-full"></div>
        </div>
        
        {/* Vehicle information */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current location */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <MapPin className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
              {t('mapLocation.currentLocation')}
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Latitude</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {vehicleData.currentLocation.lat.toFixed(6)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Longitude</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {vehicleData.currentLocation.lng.toFixed(6)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Speed</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {Math.floor(Math.random() * 60) + 20} km/h
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Heading</span>
                <div className="flex items-center">
                  <Navigation className="h-4 w-4 mr-1 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    North-East
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Update</span>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {lastUpdated.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Emission alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 mr-2 text-accent-500 dark:text-accent-400" />
              Emission Alerts
            </h3>
            
            <div className="space-y-4">
              {hotspots
                .filter(h => h.level === 'high')
                .slice(0, 3)
                .map((hotspot, index) => (
                  <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-100 dark:border-red-800">
                    <div className="flex items-start">
                      <span className="text-lg mr-2">🔴</span>
                      <div>
                        <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                          {t('mapLocation.emissionHotspot')}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {hotspot.type} level: {hotspot.reading.toFixed(2)} ppm
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Coordinates: {hotspot.lat.toFixed(4)}, {hotspot.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              
              {hotspots.filter(h => h.level === 'high').length === 0 && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-100 dark:border-green-800">
                  <div className="flex items-start">
                    <span className="text-lg mr-2">✅</span>
                    <div>
                      <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                        No critical emission hotspots detected
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        All emissions within acceptable limits
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Actions
            </h3>
            
            <div className="space-y-3">
              <button className="flex items-center justify-center w-full px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors">
                <Route className="h-5 w-5 mr-2" />
                {t('mapLocation.viewRoute')}
              </button>
              
              <button className="flex items-center justify-center w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Navigation className="h-5 w-5 mr-2" />
                Get Directions
              </button>
              
              <button className="flex items-center justify-center w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Clock className="h-5 w-5 mr-2" />
                View Travel History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLocationPage;