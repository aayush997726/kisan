import React, { useState } from 'react';
import { Bug, Shield } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface DiseaseDetectionProps {
  diseaseImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

export const DiseaseDetection: React.FC<DiseaseDetectionProps> = ({ 
  diseaseImage, 
  onImageUpload, 
  onImageRemove 
}) => {
  const { translate } = useTranslation();

  const commonDiseases = [
    { name: 'Leaf Blight', crop: 'Cotton', severity: 'High', treatment: 'Fungicide spray' },
    { name: 'Powdery Mildew', crop: 'Soybean', severity: 'Medium', treatment: 'Sulfur application' },
    { name: 'Rust', crop: 'Wheat', severity: 'High', treatment: 'Propiconazole spray' },
    { name: 'Bacterial Wilt', crop: 'Tomato', severity: 'High', treatment: 'Copper fungicide' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-2">{translate('disease.title', 'Disease Detection')}</h1>
        <p className="opacity-90">{translate('disease.subtitle', 'Upload crop images for instant disease identification and treatment advice')}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('disease.upload.title', 'Upload Crop Image')}</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
          {diseaseImage ? (
            <div className="space-y-4">
              <img 
                src={diseaseImage} 
                alt="Uploaded crop" 
                className="max-w-xs mx-auto rounded-lg shadow-md"
              />
              <div className="space-y-2">
                <button 
                  onClick={onImageRemove}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  {translate('disease.upload.removeImage', 'Remove Image')}
                </button>
                <div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
                    {translate('disease.upload.analyzeDisease', 'Analyze Disease')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Bug className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">{translate('disease.upload.placeholder', 'Click to upload or drag and drop crop images')}</p>
              <input 
                type="file" 
                accept="image/*" 
                onChange={onImageUpload}
                className="hidden" 
                id="image-upload"
              />
              <label 
                htmlFor="image-upload" 
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer inline-block"
              >
                {translate('disease.upload.chooseImage', 'Choose Image')}
              </label>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('disease.common.title', 'Common Diseases')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonDiseases.map((disease, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800">
                  {disease.name === 'Leaf Blight' ? translate('disease.leafblight', 'Leaf Blight') :
                   disease.name === 'Powdery Mildew' ? translate('disease.powderymildew', 'Powdery Mildew') :
                   disease.name === 'Rust' ? translate('disease.rust', 'Rust') :
                   disease.name === 'Bacterial Wilt' ? translate('disease.bacterialwilt', 'Bacterial Wilt') :
                   disease.name}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  disease.severity === 'High' ? 'bg-red-100 text-red-800' : 
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {disease.severity === 'High' ? translate('disease.common.high', 'High') : translate('disease.common.medium', 'Medium')}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {translate('disease.common.crop', 'Crop:')} {
                  disease.crop === 'Cotton' ? translate('disease.crops.cotton', 'Cotton') :
                  disease.crop === 'Soybean' ? translate('disease.crops.soybean', 'Soybean') :
                  disease.crop === 'Wheat' ? translate('disease.crops.wheat', 'Wheat') :
                  disease.crop === 'Tomato' ? translate('disease.crops.tomato', 'Tomato') :
                  disease.crop
                }
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {translate('disease.common.treatment', 'Treatment:')} {
                  disease.treatment === 'Fungicide spray' ? translate('disease.treatment.fungicidespray', 'Fungicide spray') :
                  disease.treatment === 'Sulfur application' ? translate('disease.treatment.sulfurapplication', 'Sulfur application') :
                  disease.treatment === 'Propiconazole spray' ? translate('disease.treatment.propiconazolespray', 'Propiconazole spray') :
                  disease.treatment === 'Copper fungicide' ? translate('disease.treatment.copperfungicide', 'Copper fungicide') :
                  disease.treatment
                }
              </p>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                {translate('disease.common.learnMore', 'Learn More →')}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">{translate('disease.prevention.title', 'Prevention Tips')}</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>{translate('disease.prevention.tip1', '• Regular field monitoring and early detection')}</li>
              <li>{translate('disease.prevention.tip2', '• Proper crop rotation to break disease cycles')}</li>
              <li>{translate('disease.prevention.tip3', '• Use disease-resistant varieties when available')}</li>
              <li>{translate('disease.prevention.tip4', '• Maintain proper plant spacing for air circulation')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
