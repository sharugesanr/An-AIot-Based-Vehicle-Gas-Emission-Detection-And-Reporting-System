import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Calendar, CheckCircle, XCircle, Download, Clock } from 'lucide-react';
import { vehicleData } from '../utils/mockData';

const FitnessCertificatePage: React.FC = () => {
  const { t } = useTranslation();
  
  // Convert string dates to Date objects
  const lastInspectionDate = new Date(vehicleData.lastInspection);
  const nextDueDate = new Date(vehicleData.nextDueDate);
  const today = new Date();
  
  // Calculate days remaining
  const daysRemaining = Math.ceil((nextDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isValid = daysRemaining > 0;
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {t('fitnessCertificate.title')}
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* Certificate header */}
        <div className="bg-primary-50 dark:bg-primary-900/30 p-6 border-b border-primary-100 dark:border-primary-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Vehicle Fitness Certificate
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {vehicleData.manufacturer} {vehicleData.model} ({vehicleData.year})
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className={`flex items-center ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isValid ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-1" />
                    <span className="font-medium">{t('fitnessCertificate.valid')}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 mr-1" />
                    <span className="font-medium">{t('fitnessCertificate.expired')}</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center mt-1 text-sm">
                <Clock className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                <span className={`${daysRemaining <= 30 ? 'text-amber-600 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'}`}>
                  {daysRemaining > 0 
                    ? `${daysRemaining} ${t('fitnessCertificate.daysRemaining')}`
                    : `Overdue by ${Math.abs(daysRemaining)} days`}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Certificate details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Owner and vehicle details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Vehicle Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('fitnessCertificate.ownerName')}
                  </p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {vehicleData.ownerName}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('fitnessCertificate.vehicleNumber')}
                  </p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {vehicleData.vehicleNumber}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Vehicle Type
                  </p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {vehicleData.manufacturer} {vehicleData.model} - {vehicleData.engineType}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Inspection and due dates */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                Inspection Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('fitnessCertificate.lastInspection')}
                  </p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      {lastInspectionDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('fitnessCertificate.nextDueDate')}
                  </p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2" />
                    <p className={`text-base font-medium ${isValid ? 'text-gray-900 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
                      {nextDueDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Certificate ID
                  </p>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    FC-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Inspection history */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Inspection History
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Result
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {vehicleData.inspectionHistory.map((inspection, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(inspection.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          inspection.result === 'Pass' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {inspection.result}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        {inspection.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Download button */}
<div className="mt-8 flex justify-center">
  <a
    href="src\fitness_certificate.pdf" // Replace with actual path to the PDF file
    download
    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
  >
    <Download className="h-4 w-4 mr-2" />
    {t('fitnessCertificate.downloadCertificate')}
  </a>
</div>
        </div>
      </div>
    </div>
  );
};

export default FitnessCertificatePage;