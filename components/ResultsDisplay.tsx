
import React from 'react';
import { AIResponse, SystemProposal } from '../types';
import Button from './common/Button';
import Card from './common/Card';

interface ResultsDisplayProps {
  response: AIResponse;
  onReset: () => void;
  whatsAppNumber: string;
}

const formatWhatsAppMessage = (response: AIResponse): string => {
    const formatSystem = (title: string, system: SystemProposal) => {
        const components = system.components.map(c => `* ${c.name}: ${c.specification}`).join('\n');
        return `*${title}*\n\n` +
               `*السعر:* ${system.price}\n` +
               `*الضمان:* ${system.warranty}\n` +
               `*مستوى الحماية:* ${system.protection}\n` +
               `*السبب المقترح:* ${system.rationale}\n\n` +
               `*المكونات:*\n${components}`;
    };

    return `مرحباً،\n\n` +
           `بناءً على طلبك، قمنا بإعداد مقترحين لنظام الطاقة الشمسية. إليك التفاصيل:\n\n` +
           `------------------------------------\n\n` +
           `${formatSystem('النظام الاقتصادي', response.economy)}\n\n` +
           `------------------------------------\n\n` +
           `${formatSystem('النظام الممتاز', response.premium)}\n\n` +
           `للمزيد من المعلومات أو لتأكيد الطلب، يرجى التواصل معنا.\n\n` +
           `*شركة عوض الفهيم للمواد الكهربائية*`;
};

const SystemProposalCard: React.FC<{ system: SystemProposal, title: string, color: 'green' | 'blue' }> = ({ system, title, color }) => {
    const borderColor = color === 'green' ? 'border-green-500' : 'border-blue-500';
    const textColor = color === 'green' ? 'text-green-800' : 'text-blue-800';
    const bgColor = color === 'green' ? 'bg-green-50' : 'bg-blue-50';

    return (
        <Card className={`border-t-4 ${borderColor}`}>
            <h3 className={`text-2xl font-extrabold mb-3 ${textColor}`}>{title}</h3>
            <p className="text-gray-600 mb-4">{system.rationale}</p>
            
            <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between items-center p-2 rounded-md bg-gray-100">
                    <span className="font-bold">السعر الإجمالي:</span>
                    <span className="font-bold text-lg text-indigo-600">{system.price}</span>
                </div>
                <div className="flex justify-between items-center p-2">
                    <span className="font-semibold text-gray-700">الضمان:</span>
                    <span>{system.warranty}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                    <span className="font-semibold text-gray-700">مستوى الحماية:</span>
                    <span>{system.protection}</span>
                </div>
            </div>

            <h4 className="font-bold text-lg mt-6 mb-3">مكونات النظام:</h4>
            <ul className={`space-y-2 list-disc list-inside ${bgColor} p-4 rounded-lg`}>
                {system.components.map((comp, index) => (
                    <li key={index} className="text-gray-700">
                        <span className="font-semibold">{comp.name}:</span> {comp.specification}
                    </li>
                ))}
            </ul>
        </Card>
    );
};


const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ response, onReset, whatsAppNumber }) => {

    const companyWhatsAppNumber = "9647700000000"; // Replace with your company's actual WhatsApp number
    const message = encodeURIComponent(formatWhatsAppMessage(response));
    const whatsappUrl = `https://wa.me/${companyWhatsAppNumber}?text=${message}`;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">مقترحات الأنظمة الخاصة بك</h2>
        <p className="text-lg text-gray-600">
          قمنا بإعداد خيارين بناءً على احتياجاتك. سيتم إرسال نسخة إلى واتساب على الرقم <span className="font-bold">{whatsAppNumber}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SystemProposalCard system={response.economy} title="النظام الاقتصادي" color="green" />
        <SystemProposalCard system={response.premium} title="النظام الممتاز" color="blue" />
      </div>

      <div className="text-center pt-6 border-t space-y-4">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button>
            افتح واتساب لإرسال النتائج
          </Button>
        </a>
        <p className="text-sm text-gray-500">إذا لم يتم فتح واتساب، يمكنك نسخ النتائج وإرسالها يدوياً.</p>
        <button onClick={onReset} className="text-indigo-600 hover:text-indigo-800 font-semibold">
          حساب جديد
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
