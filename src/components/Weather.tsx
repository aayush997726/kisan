import React from 'react';
import { 
  MapPin,
  Sun,
  CloudRain,
  Cloud,
  Thermometer,
  Droplets
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

interface WeatherProps {
  weatherData: WeatherData;
}

const WeatherIcon = ({ type }: { type: 'sun' | 'rain' | 'cloud' }) => {
  switch (type) {
    case 'sun': return <Sun className="h-8 w-8 text-yellow-500" />;
    case 'rain': return <CloudRain className="h-8 w-8 text-blue-500" />;
    case 'cloud': return <Cloud className="h-8 w-8 text-gray-500" />;
  }
};

export const Weather: React.FC<WeatherProps> = ({ weatherData }) => {
  const { translate } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{translate('weather.title', 'Weather Forecast')}</h1>
            <p className="opacity-90 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {weatherData.location === 'Kharif Region, Maharashtra' ? translate('weather.location.kharifRegion', 'Kharif Region, Maharashtra') :
               weatherData.location}
            </p>
          </div>
          <WeatherIcon type={weatherData.icon} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">{translate('weather.temperature', 'Temperature')}</h3>
            <Thermometer className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{weatherData.temperature}°C</p>
          <p className="text-gray-600 mt-1">{translate('weather.feelsLike', 'Feels like 32°C')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">{translate('weather.humidity', 'Humidity')}</h3>
            <Droplets className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{weatherData.humidity}%</p>
          <p className="text-gray-600 mt-1">{translate('weather.moderateLevel', 'Moderate level')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">{translate('weather.rainfall', 'Rainfall')}</h3>
            <CloudRain className="h-5 w-5 text-gray-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{weatherData.rainfall}mm</p>
          <p className="text-gray-600 mt-1">{translate('weather.last24Hours', 'Last 24 hours')}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('weather.forecast7Day', '7-Day Forecast')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-800">{translate(`weather.days.${day.toLowerCase()}`, day)}</p>
              <Sun className="h-6 w-6 text-yellow-500 mx-auto my-2" />
              <p className="text-sm text-gray-600">{28 + index}°C</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{translate('weather.farmingAdvisory.title', 'Farming Advisory')}</h2>
        <div className="space-y-2">
          <p className="text-green-700 font-medium">{translate('weather.farmingAdvisory.goodWeather', '✓ Good weather for field operations')}</p>
          <p className="text-blue-700 font-medium">{translate('weather.farmingAdvisory.irrigation', '• Consider irrigation in next 2-3 days')}</p>
          <p className="text-orange-700 font-medium">{translate('weather.farmingAdvisory.pestActivity', '⚠ Monitor for pest activity due to humidity')}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
