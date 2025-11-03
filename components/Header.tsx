
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800">
          <span className="text-green-600">شركة عوض الفهيم</span> 
          <span className="block sm:inline text-xl font-medium text-gray-600 sm:ms-2">لحساب تكلفة منظومتك الشمسية</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
