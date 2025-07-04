import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'lucide-react';

const VehicleEmissionScene = React.lazy(() => import('./VehicleEmissionScene'));

const HomeHero: React.FC = () => {
  const { t } = useTranslation();

  const scrollToNextSection = () => {
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
      const navbarHeight = 64;
      const elementPosition = dashboardSection.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col dark bg-gray-900 text-white">
      {/* Background for dark theme only */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 -z-10" />

      {/* Full-width 3D Scene */}
      <div className="w-full h-[500px] mt-12">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Loading 3D scene...
          </div>
        }>
          <VehicleEmissionScene />
        </Suspense>
      </div>

      {/* Scroll Down Button */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToNextSection}
          className="animate-bounce p-2 rounded-full bg-gray-800 shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Scroll to dashboard"
        >
          <ArrowDown className="h-6 w-6 text-primary-400" />
        </button>
      </div>
    </div>
  );
};

export default HomeHero;
