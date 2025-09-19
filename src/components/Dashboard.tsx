import React from 'react';
import { 
  Sprout, 
  TrendingUp, 
  Bug, 
  FileText, 
  ChevronRight,
  MapPin,
  Leaf,
  Droplets,
  Sun,
  CloudRain,
  Cloud
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  rainfall: number;
  icon: 'sun' | 'rain' | 'cloud';
}

interface DashboardProps {
  weatherData: WeatherData;
  onNavigate: (section: string) => void;
}

const WeatherIcon = ({ type }: { type: 'sun' | 'rain' | 'cloud' }) => {
  switch (type) {
    case 'sun': return <Sun className="h-8 w-8 text-yellow-500" />;
    case 'rain': return <CloudRain className="h-8 w-8 text-blue-500" />;
    case 'cloud': return <Cloud className="h-8 w-8 text-gray-500" />;
  }
};

export const Dashboard: React.FC<DashboardProps> = ({ weatherData, onNavigate }) => {
  const { translate } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">{translate('dashboard.welcome', 'Welcome, Farmer!')}</h1>
        <p className="opacity-90">{translate('dashboard.subtitle', 'Your smart farming companion for better yields and profits')}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{translate('dashboard.weather.title', "Today's Weather")}</h2>
          <button 
            onClick={() => onNavigate('weather')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            {translate('dashboard.weather.viewDetails', 'View Details')}
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <WeatherIcon type={weatherData.icon} />
          <div>
            <p className="text-2xl font-bold text-gray-900">{weatherData.temperature}°C</p>
            <p className="text-gray-600">
              {weatherData.condition === 'Partly Cloudy' ? translate('weather.condition.partlyCloudy', 'Partly Cloudy') :
               weatherData.condition === 'Sunny' ? translate('weather.condition.sunny', 'Sunny') :
               weatherData.condition === 'Rainy' ? translate('weather.condition.rainy', 'Rainy') :
               weatherData.condition}
            </p>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {weatherData.location === 'Kharif Region, Maharashtra' ? translate('weather.location.kharifRegion', 'Kharif Region, Maharashtra') :
               weatherData.location}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between mb-3">
            <Sprout className="h-8 w-8 text-green-600" />
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-800">{translate('dashboard.cropAdvisory.title', 'Crop Advisory')}</h3>
          <p className="text-sm text-gray-600 mt-1">{translate('dashboard.cropAdvisory.subtitle', 'Get personalized crop recommendations')}</p>
          <button 
            onClick={() => onNavigate('crops')}
            className="mt-3 text-green-600 hover:text-green-700 font-medium text-sm"
          >
            {translate('dashboard.cropAdvisory.explore', 'Explore →')}
          </button>
        </div>

        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-800">{translate('dashboard.marketPrices.title', 'Market Prices')}</h3>
          <p className="text-sm text-gray-600 mt-1">{translate('dashboard.marketPrices.subtitle', 'Current mandi rates for your crops')}</p>
          <button 
            onClick={() => onNavigate('market')}
            className="mt-3 text-orange-600 hover:text-orange-700 font-medium text-sm"
          >
            {translate('dashboard.marketPrices.checkPrices', 'Check Prices →')}
          </button>
        </div>

        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
          <div className="flex items-center justify-between mb-3">
            <Bug className="h-8 w-8 text-red-600" />
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-800">{translate('dashboard.diseaseDetection.title', 'Disease Detection')}</h3>
          <p className="text-sm text-gray-600 mt-1">{translate('dashboard.diseaseDetection.subtitle', 'Identify crop diseases instantly')}</p>
          <button 
            onClick={() => onNavigate('disease')}
            className="mt-3 text-red-600 hover:text-red-700 font-medium text-sm"
          >
            {translate('dashboard.diseaseDetection.scanNow', 'Scan Now →')}
          </button>
        </div>

        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
          <div className="flex items-center justify-between mb-3">
            <FileText className="h-8 w-8 text-purple-600" />
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-800">{translate('dashboard.govtSchemes.title', 'Govt. Schemes')}</h3>
          <p className="text-sm text-gray-600 mt-1">{translate('dashboard.govtSchemes.subtitle', 'Available subsidies and support')}</p>
          <button 
            onClick={() => onNavigate('schemes')}
            className="mt-3 text-purple-600 hover:text-purple-700 font-medium text-sm"
          >
            {translate('dashboard.govtSchemes.viewSchemes', 'View Schemes →')}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('dashboard.quickTips.title', 'Quick Tips')}</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
            <Leaf className="h-5 w-5 text-green-600 mt-1" />
            <div>
              <p className="font-medium text-gray-800">{translate('dashboard.quickTips.plantingTime', 'Optimal Planting Time')}</p>
              <p className="text-sm text-gray-600">{translate('dashboard.quickTips.plantingTimeDesc', 'For Kharif crops, plant before July 15th for better yields')}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
            <Droplets className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <p className="font-medium text-gray-800">{translate('dashboard.quickTips.waterManagement', 'Water Management')}</p>
              <p className="text-sm text-gray-600">{translate('dashboard.quickTips.waterManagementDesc', 'Monitor soil moisture levels - ideal range is 60-70%')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
