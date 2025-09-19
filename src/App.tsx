import React, { useState } from 'react';
import { 
  Home, 
  Cloud, 
  Sprout, 
  Bug, 
  TrendingUp, 
  FileText, 
  Droplets, 
  User, 
  Menu,
  X
} from 'lucide-react';
import { TranslationProvider } from './contexts/TranslationContext';
import { useTranslation } from './hooks/useTranslation';
import TranslateButton from './components/TranslateButton';
import Dashboard from './components/Dashboard';
import Weather from './components/Weather';
import Crops from './components/Crops';
import DiseaseDetection from './components/DiseaseDetection';
import MarketPrices from './components/MarketPrices';
import GovernmentSchemes from './components/GovernmentSchemes';
import Irrigation from './components/Irrigation';
import Profile from './components/Profile';

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  rainfall: number;
  icon: 'sun' | 'rain' | 'cloud';
}

interface CropRecommendation {
  name: string;
  season: string;
  soilType: string;
  expectedYield: string;
  duration: string;
  profitability: 'High' | 'Medium' | 'Low';
}

interface MarketPrice {
  crop: string;
  currentPrice: number;
  previousPrice: number;
  trend: 'up' | 'down' | 'stable';
  market: string;
}

interface GovernmentScheme {
  name: string;
  description: string;
  amount: string;
  eligibility: string;
}

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [diseaseImage, setDiseaseImage] = useState<string | null>(null);
  const { translate } = useTranslation();

  // Sample data - in a real app, this would come from APIs
  const weatherData: WeatherData = {
    location: 'Kharif Region, Maharashtra',
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    rainfall: 15,
    icon: 'cloud'
  };

  const cropRecommendations: CropRecommendation[] = [
    {
      name: 'Cotton',
      season: 'Kharif',
      soilType: 'Black Soil',
      expectedYield: '15-20 quintals/hectare',
      duration: '180-200 days',
      profitability: 'High'
    },
    {
      name: 'Soybean',
      season: 'Kharif',
      soilType: 'Red Soil',
      expectedYield: '12-18 quintals/hectare',
      duration: '95-120 days',
      profitability: 'Medium'
    },
    {
      name: 'Wheat',
      season: 'Rabi',
      soilType: 'Alluvial Soil',
      expectedYield: '25-30 quintals/hectare',
      duration: '120-150 days',
      profitability: 'High'
    },
    {
      name: 'Onion',
      season: 'Rabi',
      soilType: 'Sandy Loam',
      expectedYield: '200-300 quintals/hectare',
      duration: '150-180 days',
      profitability: 'High'
    }
  ];

  const marketPrices: MarketPrice[] = [
    { crop: 'Cotton', currentPrice: 6500, previousPrice: 6200, trend: 'up', market: 'Akola Mandi' },
    { crop: 'Soybean', currentPrice: 4200, previousPrice: 4300, trend: 'down', market: 'Latur Mandi' },
    { crop: 'Wheat', currentPrice: 2100, previousPrice: 2050, trend: 'up', market: 'Pune Mandi' },
    { crop: 'Onion', currentPrice: 3500, previousPrice: 3500, trend: 'stable', market: 'Nashik Mandi' }
  ];

  const governmentSchemes: GovernmentScheme[] = [
    {
      name: 'PM-KISAN',
      description: 'Direct income support to farmers',
      amount: '₹6,000 per year',
      eligibility: 'Small & Marginal Farmers'
    },
    {
      name: 'Crop Insurance',
      description: 'Protection against crop losses',
      amount: 'Up to ₹2,00,000',
      eligibility: 'All Farmers'
    },
    {
      name: 'Soil Health Card',
      description: 'Free soil testing and advisory',
      amount: 'Free',
      eligibility: 'All Farmers'
    }
  ];

  const navigationItems = [
    { id: 'dashboard', label: translate('nav.dashboard', 'Dashboard'), icon: Home },
    { id: 'weather', label: translate('nav.weather', 'Weather'), icon: Cloud },
    { id: 'crops', label: translate('nav.crops', 'Crop Advisory'), icon: Sprout },
    { id: 'disease', label: translate('nav.disease', 'Disease Detection'), icon: Bug },
    { id: 'market', label: translate('nav.market', 'Market Prices'), icon: TrendingUp },
    { id: 'schemes', label: translate('nav.schemes', 'Govt. Schemes'), icon: FileText },
    { id: 'irrigation', label: translate('nav.irrigation', 'Irrigation'), icon: Droplets },
    { id: 'profile', label: translate('nav.profile', 'Profile'), icon: User }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDiseaseImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setDiseaseImage(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard weatherData={weatherData} onNavigate={setActiveSection} />;
      case 'weather': return <Weather weatherData={weatherData} />;
      case 'crops': return <Crops cropRecommendations={cropRecommendations} />;
      case 'disease': return <DiseaseDetection diseaseImage={diseaseImage} onImageUpload={handleImageUpload} onImageRemove={handleImageRemove} />;
      case 'market': return <MarketPrices marketPrices={marketPrices} />;
      case 'schemes': return <GovernmentSchemes governmentSchemes={governmentSchemes} />;
      case 'irrigation': return <Irrigation />;
      case 'profile': return <Profile />;
      default: return <Dashboard weatherData={weatherData} onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-lg font-bold text-gray-800">{translate('app.title', 'CropAdvisor')}</span>
            </div>
          </div>
          <TranslateButton size="sm" variant="outline" />
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Sprout className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-xl font-bold text-gray-800">{translate('app.title', 'CropAdvisor')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <TranslateButton size="sm" variant="ghost" />
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <TranslationProvider>
      <AppContent />
    </TranslationProvider>
  );
}

export default App;
