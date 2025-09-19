import React from 'react';
import { Droplets, Calendar } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const Irrigation: React.FC = () => {
  const { translate } = useTranslation();

  const irrigationSchedule = [
    { date: 'Dec 18', time: translate('irrigation.time.6am', '6:00 AM'), duration: '2 hours', status: 'scheduled' },
    { date: 'Dec 21', time: translate('irrigation.time.6am', '6:00 AM'), duration: '2 hours', status: 'scheduled' },
    { date: 'Dec 15', time: translate('irrigation.time.6am', '6:00 AM'), duration: '2 hours', status: 'completed' },
    { date: 'Dec 12', time: translate('irrigation.time.6am', '6:00 AM'), duration: '2 hours', status: 'completed' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">{translate('irrigation.title', 'Irrigation Advisory')}</h1>
        <p className="opacity-90">{translate('irrigation.subtitle', 'Smart water management for optimal crop growth')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">{translate('irrigation.soilMoisture', 'Soil Moisture')}</h3>
            <Droplets className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{translate('irrigation.soilMoistureValue', '65%')}</p>
          <p className="text-green-600 mt-1 text-sm font-medium">{translate('irrigation.optimalLevel', 'Optimal Level')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">{translate('irrigation.nextIrrigation', 'Next Irrigation')}</h3>
            <Calendar className="h-5 w-5 text-orange-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">{translate('irrigation.nextIrrigationDays', '2 Days')}</p>
          <p className="text-orange-600 mt-1 text-sm font-medium">{translate('irrigation.nextIrrigationDate', 'December 18')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">{translate('irrigation.waterRequired', 'Water Required')}</h3>
            <Droplets className="h-5 w-5 text-cyan-500" />
          </div>
          <p className="text-lg font-bold text-gray-900">{translate('irrigation.waterRequiredAmount', '450 L')}</p>
          <p className="text-cyan-600 mt-1 text-sm font-medium">{translate('irrigation.perAcre', 'Per acre')}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('irrigation.schedule.title', 'Irrigation Schedule')}</h2>
        <div className="space-y-4">
          {irrigationSchedule.map((irrigation, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
              irrigation.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  irrigation.status === 'completed' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <Droplets className={`h-5 w-5 ${
                    irrigation.status === 'completed' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {irrigation.date === 'Dec 18' ? translate('irrigation.date.dec18', 'Dec 18') :
                     irrigation.date === 'Dec 21' ? translate('irrigation.date.dec21', 'Dec 21') :
                     irrigation.date === 'Dec 15' ? translate('irrigation.date.dec15', 'Dec 15') :
                     irrigation.date === 'Dec 12' ? translate('irrigation.date.dec12', 'Dec 12') :
                     irrigation.date} {translate('irrigation.at', 'at')} {irrigation.time}
                  </p>
                  <p className="text-sm text-gray-600">{translate('irrigation.schedule.duration', 'Duration:')} {
                    irrigation.duration === '2 hours' ? translate('irrigation.duration.2hours', '2 hours') :
                    irrigation.duration
                  }</p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${
                irrigation.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {irrigation.status === 'completed' ? translate('irrigation.schedule.completed', 'completed') : translate('irrigation.schedule.scheduled', 'scheduled')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('irrigation.analytics.title', 'Water Usage Analytics')}</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{translate('irrigation.analytics.thisWeek', 'This Week:')}</span>
              <span className="font-medium text-gray-800">{translate('irrigation.analytics.thisWeekValue', '1,250 L')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{translate('irrigation.analytics.thisMonth', 'This Month:')}</span>
              <span className="font-medium text-gray-800">{translate('irrigation.analytics.thisMonthValue', '4,800 L')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{translate('irrigation.analytics.averageDaily', 'Average Daily:')}</span>
              <span className="font-medium text-gray-800">{translate('irrigation.analytics.averageDailyValue', '180 L')}</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            {translate('irrigation.analytics.viewReport', 'View Detailed Report')}
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('irrigation.controls.title', 'Smart Controls')}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-800">{translate('irrigation.controls.autoIrrigation', 'Auto Irrigation')}</span>
              <button className="bg-green-500 w-12 h-6 rounded-full relative">
                <div className="bg-white w-5 h-5 rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-800">{translate('irrigation.controls.weatherIntegration', 'Weather Integration')}</span>
              <button className="bg-green-500 w-12 h-6 rounded-full relative">
                <div className="bg-white w-5 h-5 rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-800">{translate('irrigation.controls.smsAlerts', 'SMS Alerts')}</span>
              <button className="bg-gray-300 w-12 h-6 rounded-full relative">
                <div className="bg-white w-5 h-5 rounded-full absolute left-0.5 top-0.5"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-start space-x-3">
          <Droplets className="h-6 w-6 text-green-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">{translate('irrigation.tips.title', 'Water Conservation Tips')}</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>{translate('irrigation.tips.tip1', '• Use drip irrigation to reduce water wastage by 30-50%')}</li>
              <li>{translate('irrigation.tips.tip2', '• Water early morning or evening to minimize evaporation')}</li>
              <li>{translate('irrigation.tips.tip3', '• Mulch around plants to retain soil moisture')}</li>
              <li>{translate('irrigation.tips.tip4', '• Monitor soil moisture regularly to avoid over-watering')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Irrigation;
