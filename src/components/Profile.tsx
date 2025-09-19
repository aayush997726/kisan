import React from 'react';
import { User, Sprout } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export const Profile: React.FC = () => {
  const { translate } = useTranslation();

  const currentCrops = [
    { crop: 'Cotton', area: translate('profile.cropArea.cotton', '3 acres'), stage: 'Flowering', planted: translate('profile.planted.june2023', 'June 2023'), key: 'cotton' },
    { crop: 'Soybean', area: translate('profile.cropArea.soybean', '2.5 acres'), stage: 'Pod Formation', planted: translate('profile.planted.june2023', 'June 2023'), key: 'soybean' }
  ];

  const notifications = [
    { name: translate('profile.notifications.weatherAlerts', 'Weather Alerts'), description: translate('profile.notifications.weatherAlertsDesc', 'Severe weather warnings and forecasts'), key: 'weatherAlerts' },
    { name: translate('profile.notifications.marketUpdates', 'Market Price Updates'), description: translate('profile.notifications.marketUpdatesDesc', 'Daily price updates for your crops'), key: 'marketUpdates' },
    { name: translate('profile.notifications.diseaseOutbreaks', 'Disease Outbreaks'), description: translate('profile.notifications.diseaseOutbreaksDesc', 'Regional disease and pest alerts'), key: 'diseaseOutbreaks' },
    { name: translate('profile.notifications.govtSchemes', 'Government Schemes'), description: translate('profile.notifications.govtSchemesDesc', 'New schemes and application deadlines'), key: 'govtSchemes' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">{translate('profile.title', 'Your Profile')}</h1>
        <p className="opacity-90">{translate('profile.subtitle', 'Manage your farm information and preferences')}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{translate('profile.user.name', 'Ramesh Kumar')}</h2>
            <p className="text-gray-600">{translate('profile.user.farmerId', 'Farmer ID: FRM001234')}</p>
            <p className="text-sm text-gray-500">{translate('profile.user.memberSince', 'Member since 2022')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">{translate('profile.personalInfo.title', 'Personal Information')}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{translate('profile.personalInfo.fullName', 'Full Name')}</label>
                <input 
                  type="text" 
                  value={translate('profile.user.name', 'Ramesh Kumar')} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{translate('profile.personalInfo.mobileNumber', 'Mobile Number')}</label>
                <input 
                  type="tel" 
                  value={translate('profile.user.mobile', '+91 9876543210')} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{translate('profile.personalInfo.village', 'Village')}</label>
                <input 
                  type="text" 
                  value={translate('profile.user.village', 'Shrirampur')} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">{translate('profile.farmDetails.title', 'Farm Details')}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{translate('profile.farmDetails.totalLand', 'Total Land (acres)')}</label>
                <input 
                  type="number" 
                  value={translate('profile.farmDetails.totalLandValue', '5.5')} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{translate('profile.farmDetails.primarySoilType', 'Primary Soil Type')}</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option>{translate('profile.farmDetails.blackSoil', 'Black Soil')}</option>
                  <option>{translate('profile.farmDetails.redSoil', 'Red Soil')}</option>
                  <option>{translate('profile.farmDetails.alluvialSoil', 'Alluvial Soil')}</option>
                  <option>{translate('profile.farmDetails.sandyLoam', 'Sandy Loam')}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{translate('profile.farmDetails.waterSource', 'Water Source')}</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option>{translate('profile.farmDetails.borewell', 'Borewell')}</option>
                  <option>{translate('profile.farmDetails.canal', 'Canal')}</option>
                  <option>{translate('profile.farmDetails.rainwater', 'Rainwater')}</option>
                  <option>{translate('profile.farmDetails.mixed', 'Mixed')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
          {translate('profile.updateProfile', 'Update Profile')}
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('profile.currentCrops.title', 'Current Crops')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentCrops.map((crop, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">
                  {crop.crop === 'Cotton' ? translate('profile.crops.cotton', 'Cotton') :
                   crop.crop === 'Soybean' ? translate('profile.crops.soybean', 'Soybean') :
                   crop.crop}
                </h3>
                <Sprout className="h-5 w-5 text-green-600" />
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">{translate('profile.currentCrops.area', 'Area:')} {
                  crop.area === '3 acres' ? translate('profile.cropArea.cotton', '3 acres') :
                  crop.area === '2.5 acres' ? translate('profile.cropArea.soybean', '2.5 acres') :
                  crop.area
                }</p>
                <p className="text-gray-600">{translate('profile.currentCrops.currentStage', 'Current Stage:')} {
                  crop.stage === 'Flowering' ? translate('profile.cropStage.flowering', 'Flowering') :
                  crop.stage === 'Pod Formation' ? translate('profile.cropStage.podformation', 'Pod Formation') :
                  crop.stage
                }</p>
                <p className="text-gray-600">{translate('profile.currentCrops.planted', 'Planted:')} {
                  crop.planted === 'June 2023' ? translate('profile.planted.june2023', 'June 2023') :
                  crop.planted
                }</p>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
          {translate('profile.currentCrops.addNewCrop', 'Add New Crop +')}
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('profile.notifications.title', 'Notification Preferences')}</h2>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">
                  {notification.name === 'Weather Alerts' ? translate('profile.notifications.weatherAlerts', 'Weather Alerts') :
                   notification.name === 'Market Price Updates' ? translate('profile.notifications.marketUpdates', 'Market Price Updates') :
                   notification.name === 'Disease Outbreaks' ? translate('profile.notifications.diseaseOutbreaks', 'Disease Outbreaks') :
                   notification.name === 'Government Schemes' ? translate('profile.notifications.govtSchemes', 'Government Schemes') :
                   notification.name}
                </p>
                <p className="text-sm text-gray-600">
                  {notification.name === 'Weather Alerts' ? translate('profile.notifications.weatherAlertsDesc', 'Severe weather warnings and forecasts') :
                   notification.name === 'Market Price Updates' ? translate('profile.notifications.marketUpdatesDesc', 'Daily price updates for your crops') :
                   notification.name === 'Disease Outbreaks' ? translate('profile.notifications.diseaseOutbreaksDesc', 'Regional disease and pest alerts') :
                   notification.name === 'Government Schemes' ? translate('profile.notifications.govtSchemesDesc', 'New schemes and application deadlines') :
                   notification.description}
                </p>
              </div>
              <button className="bg-green-500 w-12 h-6 rounded-full relative">
                <div className="bg-white w-5 h-5 rounded-full absolute right-0.5 top-0.5"></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
