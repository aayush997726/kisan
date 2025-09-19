import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translationService } from '../services/translationService';

export type Language = 'en' | 'hi';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: (key: string, fallback?: string) => string;
  isTranslating: boolean;
  toggleLanguage: () => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationQueue, setTranslationQueue] = useState<Set<string>>(new Set());

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'hi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const translate = (key: string, fallback?: string): string => {
    if (language === 'en') {
      return fallback || key;
    }
    
    // Static Hindi translations
    const staticTranslations: Record<string, string> = {
      // App
      'app.title': 'क्रॉप एडवाइजर',
      
      // Navigation
      'nav.dashboard': 'डैशबोर्ड',
      'nav.weather': 'मौसम',
      'nav.crops': 'फसल सलाह',
      'nav.disease': 'रोग पहचान',
      'nav.market': 'बाजार भाव',
      'nav.schemes': 'सरकारी योजनाएं',
      'nav.irrigation': 'सिंचाई',
      'nav.profile': 'प्रोफाइल',
      
      // Government Schemes
      'schemes.title': 'सरकारी योजनाएं',
      'schemes.subtitle': 'किसानों के लिए उपलब्ध सब्सिडी और सहायता कार्यक्रम',
      'schemes.pmkisan': 'पीएम-किसान',
      'schemes.cropinsurance': 'फसल बीमा',
      'schemes.soilhealthcard': 'मृदा स्वास्थ्य कार्ड',
      'schemes.pmkisanDesc': 'किसानों को प्रत्यक्ष आय सहायता',
      'schemes.cropinsuranceDesc': 'फसल हानि से सुरक्षा',
      'schemes.soilhealthcardDesc': 'मुफ्त मृदा परीक्षण और सलाह',
      'schemes.eligibility': 'पात्रता:',
      'schemes.eligibility.smallmarginalfarmers': 'छोटे और सीमांत किसान',
      'schemes.eligibility.allfarmers': 'सभी किसान',
      'schemes.applyNow': 'अभी आवेदन करें',
      'schemes.applicationStatus.title': 'आवेदन स्थिति',
      'schemes.applicationStatus.appliedOn': 'आवेदन किया गया',
      'schemes.applicationStatus.approved': 'अनुमोदित',
      'schemes.applicationStatus.underReview': 'समीक्षा के तहत',
      'schemes.applicationStatus.completed': 'पूर्ण',
      'schemes.amount.pmkisan': '₹2,000',
      'schemes.amount.pmkisanYearly': '₹6,000 प्रति वर्ष',
      'schemes.amount.cropInsuranceMax': '₹2,00,000 तक',
      'schemes.amount.pending': 'लंबित',
      'schemes.amount.free': 'मुफ्त',
      'schemes.date.dec15': '15 दिसंबर, 2023',
      'schemes.date.dec10': '10 दिसंबर, 2023',
      'schemes.date.nov28': '28 नवंबर, 2023',
      'schemes.howToApply.title': 'कैसे आवेदन करें',
      'schemes.howToApply.step1': '1. अपने निकटतम कॉमन सर्विस सेंटर (सीएससी) पर जाएं',
      'schemes.howToApply.step2': '2. आवश्यक दस्तावेज लेकर जाएं (आधार, बैंक विवरण, भूमि रिकॉर्ड)',
      'schemes.howToApply.step3': '3. अधिकारी की सहायता से आवेदन पत्र भरें',
      'schemes.howToApply.step4': '4. दस्तावेज जमा करें और पावती रसीद प्राप्त करें',
      'schemes.howToApply.step5': '5. ऑनलाइन या एसएमएस के माध्यम से आवेदन स्थिति ट्रैक करें',
      
      // Irrigation
      'irrigation.title': 'सिंचाई सलाह',
      'irrigation.subtitle': 'इष्टतम फसल विकास के लिए स्मार्ट जल प्रबंधन',
      'irrigation.soilMoisture': 'मृदा नमी',
      'irrigation.soilMoistureValue': '65%',
      'irrigation.optimalLevel': 'इष्टतम स्तर',
      'irrigation.nextIrrigation': 'अगली सिंचाई',
      'irrigation.waterRequired': 'पानी की आवश्यकता',
      'irrigation.waterRequiredAmount': '450 लीटर',
      'irrigation.nextIrrigationDays': '2 दिन',
      'irrigation.nextIrrigationDate': '18 दिसंबर',
      'irrigation.perAcre': 'प्रति एकड़',
      'irrigation.schedule.title': 'सिंचाई अनुसूची',
      'irrigation.schedule.duration': 'अवधि:',
      'irrigation.schedule.completed': 'पूर्ण',
      'irrigation.schedule.scheduled': 'निर्धारित',
      'irrigation.date.dec18': '18 दिसंबर',
      'irrigation.date.dec21': '21 दिसंबर',
      'irrigation.date.dec15': '15 दिसंबर',
      'irrigation.date.dec12': '12 दिसंबर',
      'irrigation.duration.2hours': '2 घंटे',
      'irrigation.at': 'पर',
      'irrigation.time.6am': 'सुबह 6:00',
      'irrigation.analytics.title': 'जल उपयोग विश्लेषण',
      'irrigation.analytics.thisWeek': 'इस सप्ताह:',
      'irrigation.analytics.thisMonth': 'इस महीने:',
      'irrigation.analytics.averageDaily': 'औसत दैनिक:',
      'irrigation.analytics.thisWeekValue': '1,250 लीटर',
      'irrigation.analytics.thisMonthValue': '4,800 लीटर',
      'irrigation.analytics.averageDailyValue': '180 लीटर',
      'irrigation.analytics.viewReport': 'विस्तृत रिपोर्ट देखें',
      'irrigation.controls.title': 'स्मार्ट नियंत्रण',
      'irrigation.controls.autoIrrigation': 'स्वचालित सिंचाई',
      'irrigation.controls.weatherIntegration': 'मौसम एकीकरण',
      'irrigation.controls.smsAlerts': 'एसएमएस अलर्ट',
      'irrigation.tips.title': 'जल संरक्षण सुझाव',
      'irrigation.tips.tip1': '• 30-50% पानी की बर्बादी कम करने के लिए ड्रिप सिंचाई का उपयोग करें',
      'irrigation.tips.tip2': '• वाष्पीकरण कम करने के लिए सुबह या शाम को पानी दें',
      'irrigation.tips.tip3': '• मिट्टी की नमी बनाए रखने के लिए पौधों के चारों ओर गीली घास डालें',
      'irrigation.tips.tip4': '• अधिक पानी देने से बचने के लिए मिट्टी की नमी नियमित रूप से मॉनिटर करें',
      
      // Profile
      'profile.title': 'आपका प्रोफाइल',
      'profile.subtitle': 'अपनी खेती की जानकारी और प्राथमिकताएं प्रबंधित करें',
      'profile.user.name': 'रमेश कुमार',
      'profile.user.farmerId': 'किसान आईडी: FRM001234',
      'profile.user.memberSince': '2022 से सदस्य',
      'profile.user.mobile': '+91 9876543210',
      'profile.user.village': 'श्रीरामपुर',
      'profile.personalInfo.title': 'व्यक्तिगत जानकारी',
      'profile.personalInfo.fullName': 'पूरा नाम',
      'profile.personalInfo.mobileNumber': 'मोबाइल नंबर',
      'profile.personalInfo.village': 'गांव',
      'profile.farmDetails.title': 'खेत का विवरण',
      'profile.farmDetails.totalLand': 'कुल भूमि (एकड़)',
      'profile.farmDetails.totalLandValue': '5.5',
      'profile.farmDetails.primarySoilType': 'प्राथमिक मिट्टी का प्रकार',
      'profile.farmDetails.waterSource': 'पानी का स्रोत',
      'profile.farmDetails.borewell': 'बोरवेल',
      'profile.farmDetails.canal': 'नहर',
      'profile.farmDetails.rainwater': 'बारिश का पानी',
      'profile.farmDetails.mixed': 'मिश्रित',
      'profile.farmDetails.blackSoil': 'काली मिट्टी',
      'profile.farmDetails.redSoil': 'लाल मिट्टी',
      'profile.farmDetails.alluvialSoil': 'जलोढ़ मिट्टी',
      'profile.farmDetails.sandyLoam': 'बलुई दोमट',
      'profile.updateProfile': 'प्रोफाइल अपडेट करें',
      'profile.currentCrops.title': 'वर्तमान फसलें',
      'profile.currentCrops.area': 'क्षेत्र:',
      'profile.currentCrops.currentStage': 'वर्तमान चरण:',
      'profile.currentCrops.planted': 'लगाया गया:',
      'profile.currentCrops.addNewCrop': 'नई फसल जोड़ें +',
      'profile.crops.cotton': 'कपास',
      'profile.crops.soybean': 'सोयाबीन',
      'profile.cropArea.cotton': '3 एकड़',
      'profile.cropArea.soybean': '2.5 एकड़',
      'profile.cropStage.flowering': 'फूल आना',
      'profile.cropStage.podformation': 'फली बनना',
      'profile.planted.june2023': 'जून 2023',
      'profile.notifications.title': 'सूचना प्राथमिकताएं',
      'profile.notifications.weatherAlerts': 'मौसम चेतावनी',
      'profile.notifications.weatherAlertsDesc': 'गंभीर मौसम चेतावनी और पूर्वानुमान',
      'profile.notifications.marketUpdates': 'बाजार भाव अपडेट',
      'profile.notifications.marketUpdatesDesc': 'आपकी फसलों के लिए दैनिक मूल्य अपडेट',
      'profile.notifications.diseaseOutbreaks': 'रोग प्रकोप',
      'profile.notifications.diseaseOutbreaksDesc': 'क्षेत्रीय रोग और कीट अलर्ट',
      'profile.notifications.govtSchemes': 'सरकारी योजनाएं',
      'profile.notifications.govtSchemesDesc': 'नई योजनाएं और आवेदन की समय सीमा',
      
      // Dashboard
      'dashboard.welcome': 'स्वागत है, किसान!',
      'dashboard.subtitle': 'बेहतर उपज और मुनाफे के लिए आपका स्मार्ट खेती साथी',
      'dashboard.weather.title': 'आज का मौसम',
      'dashboard.weather.viewDetails': 'विवरण देखें',
      'dashboard.cropAdvisory.title': 'फसल सलाह',
      'dashboard.cropAdvisory.subtitle': 'व्यक्तिगत फसल सुझाव प्राप्त करें',
      'dashboard.cropAdvisory.explore': 'अन्वेषण करें →',
      'dashboard.marketPrices.title': 'बाजार भाव',
      'dashboard.marketPrices.subtitle': 'आपकी फसलों के लिए वर्तमान मंडी दरें',
      'dashboard.marketPrices.checkPrices': 'भाव देखें →',
      'dashboard.diseaseDetection.title': 'रोग पहचान',
      'dashboard.diseaseDetection.subtitle': 'तुरंत फसल रोगों की पहचान करें',
      'dashboard.diseaseDetection.scanNow': 'अभी स्कैन करें →',
      'dashboard.govtSchemes.title': 'सरकारी योजनाएं',
      'dashboard.govtSchemes.subtitle': 'उपलब्ध सब्सिडी और सहायता',
      'dashboard.govtSchemes.viewSchemes': 'योजनाएं देखें →',
      'dashboard.quickTips.title': 'त्वरित सुझाव',
      'dashboard.quickTips.plantingTime': 'इष्टतम रोपण समय',
      'dashboard.quickTips.plantingTimeDesc': 'खरीफ फसलों के लिए, बेहतर उपज के लिए 15 जुलाई से पहले रोपें',
      'dashboard.quickTips.waterManagement': 'जल प्रबंधन',
      'dashboard.quickTips.waterManagementDesc': 'मिट्टी की नमी स्तर की निगरानी करें - आदर्श सीमा 60-70% है',
      
      // Weather
      'weather.title': 'मौसम पूर्वानुमान',
      'weather.temperature': 'तापमान',
      'weather.humidity': 'आर्द्रता',
      'weather.rainfall': 'वर्षा',
      'weather.feelsLike': '32°C जैसा लगता है',
      'weather.moderateLevel': 'मध्यम स्तर',
      'weather.last24Hours': 'पिछले 24 घंटे',
      'weather.forecast7Day': '7-दिवसीय पूर्वानुमान',
      'weather.location.kharifRegion': 'खरीफ क्षेत्र, महाराष्ट्र',
      'weather.condition.partlyCloudy': 'आंशिक रूप से बादल',
      'weather.condition.sunny': 'धूप',
      'weather.condition.rainy': 'बारिश',
      'weather.days.today': 'आज',
      'weather.days.tomorrow': 'कल',
      'weather.days.wed': 'बुध',
      'weather.days.thu': 'गुरु',
      'weather.days.fri': 'शुक्र',
      'weather.days.sat': 'शनि',
      'weather.days.sun': 'रवि',
      'weather.farmingAdvisory.title': 'खेती सलाह',
      'weather.farmingAdvisory.goodWeather': '✓ खेत के कामों के लिए अच्छा मौसम',
      'weather.farmingAdvisory.irrigation': '• आर्द्रता के कारण कीट गतिविधि की निगरानी करें',
      'weather.farmingAdvisory.pestActivity': '⚠ आर्द्रता के कारण कीट गतिविधि की निगरानी करें',
      
      // Crops
      'crops.title': 'फसल सलाह',
      'crops.subtitle': 'अपनी स्थितियों के आधार पर व्यक्तिगत फसल सुझाव प्राप्त करें',
      'crops.filter.title': 'सुझाव फिल्टर करें',
      'crops.filter.soilType': 'मिट्टी का प्रकार',
      'crops.filter.season': 'मौसम',
      'crops.filter.allSoilTypes': 'सभी मिट्टी के प्रकार',
      'crops.filter.allSeasons': 'सभी मौसम',
      'crops.filter.blackSoil': 'काली मिट्टी',
      'crops.filter.redSoil': 'लाल मिट्टी',
      'crops.filter.alluvialSoil': 'जलोढ़ मिट्टी',
      'crops.filter.sandyLoam': 'बलुई दोमट',
      'crops.filter.kharif': 'खरीफ',
      'crops.filter.rabi': 'रबी',
      'crops.filter.zaid': 'जायद',
      'crops.cotton': 'कपास',
      'crops.soybean': 'सोयाबीन',
      'crops.wheat': 'गेहूं',
      'crops.onion': 'प्याज',
      'crops.seasons.kharif': 'खरीफ',
      'crops.seasons.rabi': 'रबी',
      'crops.seasons.zaid': 'जायद',
      'crops.soilTypes.blacksoil': 'काली मिट्टी',
      'crops.soilTypes.redsoil': 'लाल मिट्टी',
      'crops.soilTypes.alluvialsoil': 'जलोढ़ मिट्टी',
      'crops.soilTypes.sandyloam': 'बलुई दोमट',
      'crops.yield.cotton': '15-20 क्विंटल/हेक्टेयर',
      'crops.yield.soybean': '12-18 क्विंटल/हेक्टेयर',
      'crops.yield.wheat': '25-30 क्विंटल/हेक्टेयर',
      'crops.yield.onion': '200-300 क्विंटल/हेक्टेयर',
      'crops.duration.cotton': '180-200 दिन',
      'crops.duration.soybean': '95-120 दिन',
      'crops.duration.wheat': '120-150 दिन',
      'crops.duration.onion': '150-180 दिन',
      'crops.card.season': 'मौसम:',
      'crops.card.soilType': 'मिट्टी का प्रकार:',
      'crops.card.expectedYield': 'अपेक्षित उपज:',
      'crops.card.duration': 'अवधि:',
      'crops.card.getDetailedPlan': 'विस्तृत योजना प्राप्त करें',
      'crops.card.highProfit': 'उच्च लाभ',
      'crops.card.mediumProfit': 'मध्यम लाभ',
      'crops.card.lowProfit': 'कम लाभ',
      'crops.noResults': 'आपके चयनित मानदंडों से कोई फसल मेल नहीं खाती। फिल्टर को समायोजित करने का प्रयास करें।',
      
      // Disease Detection
      'disease.title': 'रोग पहचान',
      'disease.subtitle': 'तुरंत रोग पहचान और उपचार सलाह के लिए फसल छवियां अपलोड करें',
      'disease.upload.title': 'फसल छवि अपलोड करें',
      'disease.upload.placeholder': 'फसल छवियां अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें',
      'disease.upload.chooseImage': 'छवि चुनें',
      'disease.upload.removeImage': 'छवि हटाएं',
      'disease.upload.analyzeDisease': 'रोग का विश्लेषण करें',
      'disease.leafblight': 'पत्ती झुलसा',
      'disease.powderymildew': 'पाउडरी मिल्ड्यू',
      'disease.rust': 'जंग',
      'disease.bacterialwilt': 'जीवाणु मुरझाना',
      'disease.crops.cotton': 'कपास',
      'disease.crops.soybean': 'सोयाबीन',
      'disease.crops.wheat': 'गेहूं',
      'disease.crops.tomato': 'टमाटर',
      'disease.treatment.fungicidespray': 'फंगीसाइड स्प्रे',
      'disease.treatment.sulfurapplication': 'सल्फर अनुप्रयोग',
      'disease.treatment.propiconazolespray': 'प्रोपिकोनाजोल स्प्रे',
      'disease.treatment.copperfungicide': 'कॉपर फंगीसाइड',
      'disease.common.title': 'सामान्य रोग',
      'disease.common.learnMore': 'और जानें →',
      'disease.common.crop': 'फसल:',
      'disease.common.treatment': 'उपचार:',
      'disease.common.high': 'उच्च',
      'disease.common.medium': 'मध्यम',
      'disease.prevention.title': 'रोकथाम सुझाव',
      'disease.prevention.tip1': '• नियमित खेत निगरानी और शीघ्र पहचान',
      'disease.prevention.tip2': '• रोग चक्र तोड़ने के लिए उचित फसल चक्र',
      'disease.prevention.tip3': '• उपलब्ध होने पर रोग प्रतिरोधी किस्मों का उपयोग करें',
      'disease.prevention.tip4': '• वायु संचार के लिए उचित पौधे की दूरी बनाए रखें',
      
      // Market Prices
      'market.title': 'बाजार भाव',
      'market.subtitle': 'आपकी फसलों के लिए लाइव मंडी दरें और मूल्य रुझान',
      'market.todaysPrices': 'आज के भाव',
      'market.lastUpdated': 'अंतिम अपडेट: 2 घंटे पहले',
      'market.perQuintal': 'प्रति क्विंटल',
      'market.noChange': 'कोई बदलाव नहीं',
      'market.crops.cotton': 'कपास',
      'market.crops.soybean': 'सोयाबीन',
      'market.crops.wheat': 'गेहूं',
      'market.crops.onion': 'प्याज',
      'market.markets.akolamandi': 'अकोला मंडी',
      'market.markets.laturmandi': 'लातूर मंडी',
      'market.markets.punemandi': 'पुणे मंडी',
      'market.markets.nashikmandi': 'नासिक मंडी',
      'market.calculator.title': 'मूल्य कैलकुलेटर',
      'market.calculator.selectCrop': 'फसल चुनें',
      'market.calculator.quantity': 'मात्रा (क्विंटल)',
      'market.calculator.enterQuantity': 'मात्रा दर्ज करें',
      'market.calculator.calculateValue': 'मूल्य की गणना करें',
      'market.nearbyMarkets.title': 'निकटवर्ती बाजार',
      'market.nearbyMarkets.prices': 'भाव →',
    };
    
    // If we have a static translation, return it
    if (staticTranslations[key]) {
      return staticTranslations[key];
    }
    
    // If we have a cached translation, return it
    if (translations[key]) {
      return translations[key];
    }
    
    // If we don't have a translation and haven't queued it yet, queue it for translation
    const textToTranslate = fallback || key;
    if (!translationQueue.has(key)) {
      setTranslationQueue(prev => new Set([...prev, key]));
      
      // Translate in the background
      translationService.translateText(textToTranslate, 'hi')
        .then(translated => {
          setTranslations(prev => ({ ...prev, [key]: translated }));
          setTranslationQueue(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
          });
        })
        .catch(error => {
          setTranslationQueue(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
          });
        });
    }
    
    // Return fallback while translating
    return textToTranslate;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const value: TranslationContextType = {
    language,
    setLanguage,
    translate,
    isTranslating,
    toggleLanguage,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
