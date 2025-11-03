
import React, { useState } from 'react';
import Input from './common/Input';
import Button from './common/Button';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phoneNumber: string) => void;
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      onSubmit(phoneNumber);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-center mb-4">الخطوة الأخيرة!</h3>
        <p className="text-center text-gray-600 mb-6">أدخل رقم هاتفك مع واتساب لاستلام تفاصيل النظام.</p>
        <form onSubmit={handleSubmit}>
          <Input
            label="رقم الهاتف"
            name="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="مثال: 07701234567"
            required
            autoFocus
          />
          <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
            <Button type="submit" fullWidth>إرسال النتائج</Button>
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-semibold"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppModal;
