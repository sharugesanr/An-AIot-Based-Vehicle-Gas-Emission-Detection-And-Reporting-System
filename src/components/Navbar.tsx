import React, { useState, useEffect } from 'react';
import { Activity, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64; // Height of the fixed navbar
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: t('navigation.home') },
    { id: 'dashboard', label: t('navigation.dashboard') },
    { id: 'fitness-certificate', label: t('navigation.fitnessCertificate') },
    { id: 'map-location', label: t('navigation.mapLocation') },
    { id: 'faqs', label: t('navigation.faqs') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <button onClick={() => scrollToSection('home')} className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">EcoTrack</span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Theme toggle and language selector */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center justify-between px-3 py-2">
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;