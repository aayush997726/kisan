import React from 'react';
import { TrendingUp, Calendar, MapPin, Sprout } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface MarketPrice {
  crop: string;
  currentPrice: number;
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  market: string;
}

interface MarketPricesProps {
  marketPrices: MarketPrice[];
}

export const MarketPrices: React.FC<MarketPricesProps> = ({ marketPrices }) => {
  const { translate } = useTranslation();

  const nearbyMarkets = [
    { name: 'Akola Mandi', key: 'akolaMandi' },
    { name: 'Latur Mandi', key: 'laturMandi' },
    { name: 'Pune Mandi', key: 'puneMandi' },
    { name: 'Nashik Mandi', key: 'nashikMandi' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">{translate('market.title', 'Market Prices')}</h1>
        <p className="opacity-90">{translate('market.subtitle', 'Live mandi rates and price trends for your crops')}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{translate('market.todaysPrices', "Today's Prices")}</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{translate('market.lastUpdated', 'Last updated: 2 hours ago')}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {marketPrices.map((price, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Sprout className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {price.crop === 'Cotton' ? translate('market.crops.cotton', 'Cotton') :
                     price.crop === 'Soybean' ? translate('market.crops.soybean', 'Soybean') :
                     price.crop === 'Wheat' ? translate('market.crops.wheat', 'Wheat') :
                     price.crop === 'Onion' ? translate('market.crops.onion', 'Onion') :
                     price.crop}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {price.market === 'Akola Mandi' ? translate('market.markets.akolamandi', 'Akola Mandi') :
                     price.market === 'Latur Mandi' ? translate('market.markets.laturmandi', 'Latur Mandi') :
                     price.market === 'Pune Mandi' ? translate('market.markets.punemandi', 'Pune Mandi') :
                     price.market === 'Nashik Mandi' ? translate('market.markets.nashikmandi', 'Nashik Mandi') :
                     price.market}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-900">₹{price.currentPrice.toLocaleString()}</span>
                  <div className={`flex items-center space-x-1 ${
                    price.trend === 'up' ? 'text-green-600' :
                    price.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {price.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                    {price.trend === 'down' && <TrendingUp className="h-4 w-4 transform rotate-180" />}
                    <span className="text-sm font-medium">
                      {price.trend === 'stable' ? translate('market.noChange', 'No change') : 
                       `₹${Math.abs(price.currentPrice - price.previousPrice)}`}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{translate('market.perQuintal', 'per quintal')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('market.calculator.title', 'Price Calculator')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translate('market.calculator.selectCrop', 'Select Crop')}</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>{translate('market.crops.cotton', 'Cotton')}</option>
                <option>{translate('market.crops.soybean', 'Soybean')}</option>
                <option>{translate('market.crops.wheat', 'Wheat')}</option>
                <option>{translate('market.crops.onion', 'Onion')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translate('market.calculator.quantity', 'Quantity (quintals)')}</label>
              <input 
                type="number" 
                placeholder={translate('market.calculator.enterQuantity', 'Enter quantity')}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium">
              {translate('market.calculator.calculateValue', 'Calculate Value')}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('market.nearbyMarkets.title', 'Nearby Markets')}</h2>
          <div className="space-y-3">
            {nearbyMarkets.map((market, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="font-medium text-gray-800">{translate(`market.markets.${market.key}`, market.name)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{15 + index} km</span>
                  <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                    {translate('market.nearbyMarkets.prices', 'Prices →')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;
