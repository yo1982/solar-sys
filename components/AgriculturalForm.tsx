
import React, { useState } from 'react';
import { AgriculturalData } from '../types';
import { IRAQI_GOVERNORATES } from '../constants';
import Input from './common/Input';
import Select from './common/Select';
import Button from './common/Button';

interface AgriculturalFormProps {
  onSubmit: (data: AgriculturalData) => void;
}

const AgriculturalForm: React.FC<AgriculturalFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    pumpType: 'submersible',
    power: '',
    governorate: IRAQI_GOVERNORATES[0],
    region: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.power || !formData.region) {
      setError('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }
    setError('');
    onSubmit({
      type: 'agricultural',
      pumpType: formData.pumpType as 'submersible' | 'motor',
      power: Number(formData.power),
      governorate: formData.governorate,
      region: formData.region,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">تفاصيل النظام الزراعي</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Select
          label="نوع المضخة"
          name="pumpType"
          value={formData.pumpType}
          onChange={handleChange}
          options={[
            { value: 'submersible', label: 'غاطسة' },
            { value: 'motor', label: 'سطحية (ماتور)' },
          ]}
        />
        <Input
          label="القدرة بالحصان"
          name="power"
          type="number"
          value={formData.power}
          onChange={handleChange}
          placeholder="مثال: 10"
          required
        />
        <Select
          label="المحافظة"
          name="governorate"
          value={formData.governorate}
          onChange={handleChange}
          options={IRAQI_GOVERNORATES.map(g => ({ value: g, label: g }))}
        />
        <Input
          label="المنطقة"
          name="region"
          type="text"
          value={formData.region}
          onChange={handleChange}
          placeholder="مثال: القرنة"
          required
        />
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

export default AgriculturalForm;
