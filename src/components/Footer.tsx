import React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity} from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t('navigation.home'), href: '#home' },
    { label: t('navigation.dashboard'), href: '#dashboard' },
    { label: t('navigation.fitnessCertificate'), href: '#fitness-certificate' },
    { label: t('navigation.mapLocation'), href: '#map-location' },
    { label: t('navigation.faqs'), href: '#faqs' }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 py-12 mt-12 scroll-smooth">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand and description */}
          <div>
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">EcoTrack</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Advanced vehicle emissions monitoring for a cleaner, greener future.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {currentYear} EcoTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
