import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Briefcase, DollarSign, Heart } from 'lucide-react';

interface FamilyContext {
  parentalOccupation: string;
  financialStability: string;
  parentalAspirations: string;
}

interface FamilyContextFormProps {
  data: FamilyContext;
  onUpdate: (data: Partial<FamilyContext>) => void;
  errors: Partial<Record<keyof FamilyContext, string>>;
}

const FamilyContextForm: React.FC<FamilyContextFormProps> = ({ 
  data, 
  onUpdate, 
  errors 
}) => {
  const stabilityOptions = [
    { value: 'not-stable', label: 'Not Stable - Financial concerns' },
    { value: 'managing', label: 'Managing - Making ends meet' },
    { value: 'comfortable', label: 'Comfortable - Moderate resources' },
    { value: 'very-stable', label: 'Very Stable - Financial security' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Family Context</h2>
        <p className="text-gray-600">Understanding your family background helps us provide more relevant career guidance.</p>
      </div>

      <div className="space-y-6">
        <Input
          label="Parental Occupation"
          placeholder="e.g., Teacher, Engineer, Business Owner, Doctor, etc."
          value={data.parentalOccupation}
          onChange={(e) => onUpdate({ parentalOccupation: e.target.value })}
          leftIcon={<Briefcase className="h-5 w-5" />}
          error={errors.parentalOccupation}
        />

        <Select
          label="Family Financial Stability"
          options={stabilityOptions}
          value={data.financialStability}
          onChange={(value) => onUpdate({ financialStability: value })}
          error={errors.financialStability}
          placeholder="Select financial situation..."
        />
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Privacy Note:</strong> This information helps us recommend feasible educational paths and career options within your budget range. All data is kept confidential.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Heart className="inline h-4 w-4 mr-2" />
            Parental Career Aspirations
          </label>
          <textarea
            placeholder="What careers do your parents suggest for you? What are their expectations or hopes for your future? (Optional)"
            value={data.parentalAspirations}
            onChange={(e) => onUpdate({ parentalAspirations: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors duration-200 resize-none"
            rows={4}
          />
          {errors.parentalAspirations && (
            <p className="mt-1 text-sm text-red-600">{errors.parentalAspirations}</p>
          )}
          <p className="mt-1 text-sm text-gray-600">
            Understanding parental expectations helps us balance your interests with family aspirations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FamilyContextForm;