
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
      <h3 className="mt-6 text-xl font-semibold text-gray-700">جاري تحليل البيانات...</h3>
      <p className="text-gray-500">يقوم الذكاء الاصطناعي بإعداد أفضل المقترحات لك. قد يستغرق هذا بضع لحظات.</p>
    </div>
  );
};

export default Spinner;
