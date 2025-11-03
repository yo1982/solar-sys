
import React, { useState } from 'react';
import { HomeData } from '../types';
import { IRAQI_GOVERNORATES } from '../constants';
import Input from './common/Input';
import Select from './common/Select';
import Button from './common/Button';

interface HomeFormProps {
  onSubmit: (data: HomeData) => void;
}

const HomeForm: React.FC<HomeFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    dayAmperage: '',
    nightAmperage: '',
    hasNationalGrid: true,
    outageHours: '',
    governorate: IRAQI_GOVERNORATES[0],
    region: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dayAmperage || !formData.nightAmperage || !formData.region || (formData.hasNationalGrid && !formData.outageHours)) {
      setError('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    setError('');
    onSubmit({
      type: 'home',
      dayAmperage: Number(formData.dayAmperage),
      nightAmperage: Number(formData.nightAmperage),
      hasNationalGrid: formData.hasNationalGrid,
      outageHours: Number(formData.outageHours),
      governorate: formData.governorate,
      region: formData.region,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">تفاصيل النظام المنزلي</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="الأمبير المطلوب نهاراً" name="dayAmperage" type="number" value={formData.dayAmperage} onChange={handleChange} placeholder="مثال: 15" required />
          <Input label="الأمبير المطلوب ليلاً" name="nightAmperage" type="number" value={formData.nightAmperage} onChange={handleChange} placeholder="مثال: 5" required />
        </div>
        <div className="flex items-center space-s-4 p-3 bg-gray-50 rounded-lg">
          <input
            id="hasNationalGrid"
            name="hasNationalGrid"
            type="checkbox"
            checked={formData.hasNationalGrid}
            onChange={handleChange}
            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="hasNationalGrid" className="font-medium text-gray-700">
            هل تتوفر الكهرباء الوطنية؟
          </label>
        </div>
        {formData.hasNationalGrid && (
          <Input label="عدد ساعات انقطاع الكهرباء الوطنية" name="outageHours" type="number" value={formData.outageHours} onChange={handleChange} placeholder="مثال: 8" required />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="المحافظة"
            name="governorate"
            value={formData.governorate}
            onChange={handleChange}
            options={IRAQI_GOVERNORATES.map(g => ({ value: g, label: g }))}
          />
          <Input label="المنطقة" name="region" type="text" value={formData.region} onChange={handleChange} placeholder="مثال: المنصور" required />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="pt-4">
          <Button type="submit" fullWidth>
            احسب النظام
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HomeForm;
