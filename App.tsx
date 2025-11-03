
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SystemType, AgriculturalData, HomeData, AIResponse } from './types';
import Header from './components/Header';
import SystemSelector from './components/SystemSelector';
import AgriculturalForm from './components/AgriculturalForm';
import HomeForm from './components/HomeForm';
import WhatsAppModal from './components/WhatsAppModal';
import ResultsDisplay from './components/ResultsDisplay';
import Spinner from './components/Spinner';
import { generatePrompt } from './services/geminiService';

const App: React.FC = () => {
  const [systemType, setSystemType] = useState<SystemType | null>(null);
  const [formData, setFormData] = useState<AgriculturalData | HomeData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);

  const handleSystemSelect = (type: SystemType) => {
    setSystemType(type);
    setAiResponse(null);
    setError(null);
  };

  const handleFormSubmit = (data: AgriculturalData | HomeData) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (number: string) => {
    setWhatsAppNumber(number);
    setIsModalOpen(false);
    if (formData) {
      await getAIProposals({ ...formData, whatsAppNumber: number });
    }
  };

  const getAIProposals = useCallback(async (fullFormData: (AgriculturalData | HomeData) & { whatsAppNumber: string }) => {
    setIsLoading(true);
    setError(null);
    setAiResponse(null);

    if (!process.env.API_KEY) {
        setError("مفتاح API غير متوفر. يرجى التأكد من تكوينه بشكل صحيح.");
        setIsLoading(false);
        return;
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = generatePrompt(systemType!, fullFormData);
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        
        const text = response.text.trim();
        const parsedResponse: AIResponse = JSON.parse(text);
        setAiResponse(parsedResponse);

    } catch (e) {
        console.error("Error calling Gemini API:", e);
        setError("حدث خطأ أثناء تحليل البيانات. يرجى المحاولة مرة أخرى.");
    } finally {
        setIsLoading(false);
    }
  }, [systemType]);

  const handleReset = () => {
    setSystemType(null);
    setFormData(null);
    setAiResponse(null);
    setError(null);
    setWhatsAppNumber('');
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return (
        <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-bold text-lg">خطأ!</p>
          <p>{error}</p>
          <button onClick={handleReset} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            البدء من جديد
          </button>
        </div>
      );
    }
    if (aiResponse) {
      return <ResultsDisplay response={aiResponse} onReset={handleReset} whatsAppNumber={whatsAppNumber} />;
    }
    if (systemType === 'agricultural') {
      return <AgriculturalForm onSubmit={handleFormSubmit} />;
    }
    if (systemType === 'home') {
      return <HomeForm onSubmit={handleFormSubmit} />;
    }
    return <SystemSelector onSelect={handleSystemSelect} />;
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} شركة عوض الفهيم للمواد الكهربائية</p>
      </footer>

      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default App;
