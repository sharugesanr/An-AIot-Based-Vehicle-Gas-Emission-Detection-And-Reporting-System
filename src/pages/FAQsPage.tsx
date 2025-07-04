import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

const FAQsPage: React.FC = () => {
  const { t } = useTranslation();
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };
  
  // FAQ items data
  const faqItems = [
    {
      question: t('faqs.question1'),
      answer: t('faqs.answer1'),
      category: 'data'
    },
    {
      question: t('faqs.question2'),
      answer: t('faqs.answer2'),
      category: 'emissions'
    },
    {
      question: t('faqs.question3'),
      answer: t('faqs.answer3'),
      category: 'certificate'
    },
    {
      question: t('faqs.question4'),
      answer: t('faqs.answer4'),
      category: 'alerts'
    },
    {
      question: t('faqs.question5'),
      answer: t('faqs.answer5'),
      category: 'location'
    },
    {
      question: 'How do I interpret the dashboard charts?',
      answer: 'The dashboard charts display CO and CO₂ emission data over time. Blue lines represent Carbon Monoxide (CO) levels, while purple lines show Carbon Dioxide (CO₂) levels. The shaded area indicates the range of normal variation. Hover over any point to see exact readings and timestamps.',
      category: 'dashboard'
    },
    {
      question: 'What should I do if my vehicle shows high emission levels?',
      answer: 'If your vehicle consistently shows high emission levels (red indicators), we recommend scheduling a maintenance check with a certified mechanic. Issues like clogged air filters, faulty oxygen sensors, or deteriorating catalytic converters can cause elevated emissions.',
      category: 'emissions'
    },
    {
      question: 'Is my data secure in the EcoTrack system?',
      answer: 'Yes, all data in EcoTrack is encrypted both in transit and at rest. We use industry-standard security protocols to protect your information. Your vehicle location and emission data is only accessible to you and authorized transport authorities as required by regulations.',
      category: 'data'
    },
    {
      question: 'How often is the emission data updated?',
      answer: 'Emission data is updated in real-time from the sensors in your vehicle. The dashboard refreshes automatically every 30 seconds to show the latest readings. You can also manually refresh the data at any time by clicking the refresh button on the dashboard.',
      category: 'data'
    },
    {
      question: 'Can I access my vehicle data from multiple devices?',
      answer: 'Yes, you can access your EcoTrack account from any device with an internet connection. Simply log in using your credentials, and your vehicle data will be synchronized across all your devices in real-time.',
      category: 'accessibility'
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('faqs.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Find answers to commonly asked questions about the EcoTrack vehicle emissions monitoring system.
        </p>
      </div>
      
      {/* Search input */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* FAQ items */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleItem(index)}
                aria-expanded={openItem === index}
              >
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white font-medium">
                    {item.question}
                  </span>
                </div>
                {openItem === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              
              <div 
                className={`px-6 pb-4 transition-all duration-200 ease-in-out overflow-hidden ${
                  openItem === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 dark:text-gray-400 pl-8">
                  {item.answer}
                </p>
                <div className="mt-3 pl-8">
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <HelpCircle className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No matching questions found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search query or browse all FAQs
            </p>
            <button 
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    
    </div>
  );
};

export default FAQsPage;