import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface CropRecommendation {
  name: string;
  season: string;
  soilType: string;
  expectedYield: string;
  duration: string;
  profitability: 'High' | 'Medium' | 'Low';
}

interface CropsProps {
  cropRecommendations: CropRecommendation[];
}

export const Crops: React.FC<CropsProps> = ({ cropRecommendations }) => {
  const { translate } = useTranslation();
  const [selectedSoilType, setSelectedSoilType] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');

  const getFilteredCrops = () => {
    return cropRecommendations.filter(crop => {
      const soilMatch = selectedSoilType === '' || crop.soilType.toLowerCase().includes(selectedSoilType.toLowerCase());
      const seasonMatch = selectedSeason === '' || crop.season.toLowerCase() === selectedSeason.toLowerCase();
      return soilMatch && seasonMatch;
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">{translate('crops.title', 'Crop Advisory')}</h1>
        <p className="opacity-90">{translate('crops.subtitle', 'Get personalized crop recommendations based on your conditions')}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('crops.filter.title', 'Filter Recommendations')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{translate('crops.filter.soilType', 'Soil Type')}</label>
            <select 
              value={selectedSoilType}
              onChange={(e) => setSelectedSoilType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">{translate('crops.filter.allSoilTypes', 'All Soil Types')}</option>
              <option value="black">{translate('crops.filter.blackSoil', 'Black Soil')}</option>
              <option value="red">{translate('crops.filter.redSoil', 'Red Soil')}</option>
              <option value="alluvial">{translate('crops.filter.alluvialSoil', 'Alluvial Soil')}</option>
              <option value="sandy">{translate('crops.filter.sandyLoam', 'Sandy Loam')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{translate('crops.filter.season', 'Season')}</label>
            <select 
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">{translate('crops.filter.allSeasons', 'All Seasons')}</option>
              <option value="kharif">{translate('crops.filter.kharif', 'Kharif')}</option>
              <option value="rabi">{translate('crops.filter.rabi', 'Rabi')}</option>
              <option value="zaid">{translate('crops.filter.zaid', 'Zaid')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getFilteredCrops().map((crop, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Sprout className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {crop.name === 'Cotton' ? translate('crops.cotton', 'Cotton') :
                     crop.name === 'Soybean' ? translate('crops.soybean', 'Soybean') :
                     crop.name === 'Wheat' ? translate('crops.wheat', 'Wheat') :
                     crop.name === 'Onion' ? translate('crops.onion', 'Onion') :
                     crop.name}
                  </h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    crop.profitability === 'High' ? 'bg-green-100 text-green-800' :
                    crop.profitability === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {crop.profitability === 'High' ? translate('crops.card.highProfit', 'High Profit') :
                     crop.profitability === 'Medium' ? translate('crops.card.mediumProfit', 'Medium Profit') :
                     translate('crops.card.lowProfit', 'Low Profit')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">{translate('crops.card.season', 'Season:')}</span>
                <span className="font-medium text-gray-800">
                  {crop.season === 'Kharif' ? translate('crops.seasons.kharif', 'Kharif') :
                   crop.season === 'Rabi' ? translate('crops.seasons.rabi', 'Rabi') :
                   crop.season === 'Zaid' ? translate('crops.seasons.zaid', 'Zaid') :
                   crop.season}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{translate('crops.card.soilType', 'Soil Type:')}</span>
                <span className="font-medium text-gray-800">
                  {crop.soilType === 'Black Soil' ? translate('crops.soilTypes.blacksoil', 'Black Soil') :
                   crop.soilType === 'Red Soil' ? translate('crops.soilTypes.redsoil', 'Red Soil') :
                   crop.soilType === 'Alluvial Soil' ? translate('crops.soilTypes.alluvialsoil', 'Alluvial Soil') :
                   crop.soilType === 'Sandy Loam' ? translate('crops.soilTypes.sandyloam', 'Sandy Loam') :
                   crop.soilType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{translate('crops.card.expectedYield', 'Expected Yield:')}</span>
                <span className="font-medium text-gray-800">
                  {crop.expectedYield === '15-20 quintals/hectare' ? translate('crops.yield.cotton', '15-20 quintals/hectare') :
                   crop.expectedYield === '12-18 quintals/hectare' ? translate('crops.yield.soybean', '12-18 quintals/hectare') :
                   crop.expectedYield === '25-30 quintals/hectare' ? translate('crops.yield.wheat', '25-30 quintals/hectare') :
                   crop.expectedYield === '200-300 quintals/hectare' ? translate('crops.yield.onion', '200-300 quintals/hectare') :
                   crop.expectedYield}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{translate('crops.card.duration', 'Duration:')}</span>
                <span className="font-medium text-gray-800">
                  {crop.duration === '180-200 days' ? translate('crops.duration.cotton', '180-200 days') :
                   crop.duration === '95-120 days' ? translate('crops.duration.soybean', '95-120 days') :
                   crop.duration === '120-150 days' ? translate('crops.duration.wheat', '120-150 days') :
                   crop.duration === '150-180 days' ? translate('crops.duration.onion', '150-180 days') :
                   crop.duration}
                </span>
              </div>
            </div>

            <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
              {translate('crops.card.getDetailedPlan', 'Get Detailed Plan')}
            </button>
          </div>
        ))}
      </div>

      {getFilteredCrops().length === 0 && (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <Sprout className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">{translate('crops.noResults', 'No crops match your selected criteria. Try adjusting the filters.')}</p>
        </div>
      )}
    </div>
  );
};

export default Crops;
