
import React from 'react';
import { SystemType } from '../types';

interface SystemSelectorProps {
  onSelect: (type: SystemType) => void;
}

const SystemSelector: React.FC<SystemSelectorProps> = ({ onSelect }) => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-2 text-gray-900">احسب تكلفة منظومتك الشمسية</h2>
      <p className="text-lg text-gray-600 mb-8">اختر نوع النظام للبدء</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelect('agricultural')}
          className="group flex flex-col items-center justify-center p-8 bg-green-50 rounded-xl border-2 border-green-200 hover:border-green-500 hover:bg-green-100 transition-all duration-300"
        >
          <img src="https://picsum.photos/seed/tractor/100/100" alt="نظام زراعي" className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg" />
          <span className="text-2xl font-bold text-green-800">نظام زراعي</span>
        </button>
        <button
          onClick={() => onSelect('home')}
          className="group flex flex-col items-center justify-center p-8 bg-blue-50 rounded-xl border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-100 transition-all duration-300"
        >
          <img src="https://picsum.photos/seed/home/100/100" alt="نظام منزلي" className="w-24 h-24 rounded-full mb-4 object-cover shadow-lg" />
          <span className="text-2xl font-bold text-blue-800">نظام منزلي</span>
        </button>
      </div>
    </div>
  );
};

export default SystemSelector;
