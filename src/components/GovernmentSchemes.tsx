import React from 'react';
import { FileText, BookOpen } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface GovernmentScheme {
  name: string;
  description: string;
  amount: string;
  eligibility: string;
}

interface GovernmentSchemesProps {
  governmentSchemes: GovernmentScheme[];
}

export const GovernmentSchemes: React.FC<GovernmentSchemesProps> = ({ governmentSchemes }) => {
  const { translate } = useTranslation();

  const applicationStatus = [
    { scheme: 'PM-KISAN', status: 'Approved', amount: '₹2,000', date: translate('schemes.date.dec15', 'Dec 15, 2023'), key: 'pmkisan' },
    { scheme: 'Crop Insurance', status: 'Under Review', amount: 'Pending', date: translate('schemes.date.dec10', 'Dec 10, 2023'), key: 'cropinsurance' },
    { scheme: 'Soil Health Card', status: 'Completed', amount: 'Free', date: translate('schemes.date.nov28', 'Nov 28, 2023'), key: 'soilhealthcard' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">{translate('schemes.title', 'Government Schemes')}</h1>
        <p className="opacity-90">{translate('schemes.subtitle', 'Available subsidies and support programs for farmers')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {governmentSchemes.map((scheme, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-green-600 font-bold text-lg">
                {scheme.amount === '₹6,000 per year' ? translate('schemes.amount.pmkisanYearly', '₹6,000 per year') :
                 scheme.amount === 'Up to ₹2,00,000' ? translate('schemes.amount.cropInsuranceMax', 'Up to ₹2,00,000') :
                 scheme.amount === 'Free' ? translate('schemes.amount.free', 'Free') :
                 scheme.amount}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {scheme.name === 'PM-KISAN' ? translate('schemes.pmkisan', 'PM-KISAN') :
               scheme.name === 'Crop Insurance' ? translate('schemes.cropinsurance', 'Crop Insurance') :
               scheme.name === 'Soil Health Card' ? translate('schemes.soilhealthcard', 'Soil Health Card') :
               scheme.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {scheme.name === 'PM-KISAN' ? translate('schemes.pmkisanDesc', 'Direct income support to farmers') :
               scheme.name === 'Crop Insurance' ? translate('schemes.cropinsuranceDesc', 'Protection against crop losses') :
               scheme.name === 'Soil Health Card' ? translate('schemes.soilhealthcardDesc', 'Free soil testing and advisory') :
               scheme.description}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{translate('schemes.eligibility', 'Eligibility:')}</span>
              <span className="text-sm font-medium text-gray-800">
                {scheme.eligibility === 'Small & Marginal Farmers' ? translate('schemes.eligibility.smallmarginalfarmers', 'Small & Marginal Farmers') :
                 scheme.eligibility === 'All Farmers' ? translate('schemes.eligibility.allfarmers', 'All Farmers') :
                 scheme.eligibility}
              </span>
            </div>
            
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium">
              {translate('schemes.applyNow', 'Apply Now')}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('schemes.applicationStatus.title', 'Application Status')}</h2>
        <div className="space-y-4">
          {applicationStatus.map((application, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">{translate(`schemes.${application.key}`, application.scheme)}</h3>
                <p className="text-sm text-gray-600">{translate('schemes.applicationStatus.appliedOn', 'Applied on')} {application.date}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  application.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {application.status === 'Approved' ? translate('schemes.applicationStatus.approved', 'Approved') :
                   application.status === 'Under Review' ? translate('schemes.applicationStatus.underReview', 'Under Review') :
                   translate('schemes.applicationStatus.completed', 'Completed')}
                </span>
                <p className="text-sm text-gray-600 mt-1">
                  {application.amount === '₹2,000' ? translate('schemes.amount.pmkisan', '₹2,000') :
                   application.amount === 'Pending' ? translate('schemes.amount.pending', 'Pending') :
                   application.amount === 'Free' ? translate('schemes.amount.free', 'Free') :
                   application.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start space-x-3">
          <BookOpen className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">{translate('schemes.howToApply.title', 'How to Apply')}</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>{translate('schemes.howToApply.step1', '1. Visit your nearest Common Service Center (CSC)')}</li>
              <li>{translate('schemes.howToApply.step2', '2. Carry required documents (Aadhaar, Bank details, Land records)')}</li>
              <li>{translate('schemes.howToApply.step3', '3. Fill the application form with officer assistance')}</li>
              <li>{translate('schemes.howToApply.step4', '4. Submit documents and receive acknowledgment receipt')}</li>
              <li>{translate('schemes.howToApply.step5', '5. Track application status online or through SMS')}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentSchemes;
