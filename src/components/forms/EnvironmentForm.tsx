import React from 'react';
import Select from '../ui/Select';
import { Users, Home, Globe } from 'lucide-react';

interface EnvironmentInfo {
  peerInfluence: string;
  familyExpectations: string;
  culturalNorms: string;
}

interface EnvironmentFormProps {
  data: EnvironmentInfo;
  onUpdate: (data: Partial<EnvironmentInfo>) => void;
  errors: Partial<Record<keyof EnvironmentInfo, string>>;
}

const EnvironmentForm: React.FC<EnvironmentFormProps> = ({ 
  data, 
  onUpdate, 
  errors 
}) => {
  const peerInfluenceOptions = [
    { value: 'not-at-all', label: 'Not at all - I make independent choices' },
    { value: 'a-little', label: 'A little - I consider their opinions sometimes' },
    { value: 'moderately', label: 'Moderately - Their choices affect my thinking' },
    { value: 'a-lot', label: 'A lot - I often follow what they choose' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Environment</h2>
        <p className="text-gray-600">Social and cultural factors that influence your career decision-making process.</p>
      </div>

      <div className="space-y-6">
        <Select
          label="Peer Influence on Career Choices"
          options={peerInfluenceOptions}
          value={data.peerInfluence}
          onChange={(value) => onUpdate({ peerInfluence: value })}
          error={errors.peerInfluence}
          placeholder="How much do friends' career choices influence you?"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Home className="inline h-4 w-4 mr-2" />
            Extended Family Expectations
          </label>
          <textarea
            placeholder="What careers are your extended family, relatives, or family friends suggesting? What are the common expectations in your family circle?"
            value={data.familyExpectations}
            onChange={(e) => onUpdate({ familyExpectations: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors duration-200 resize-none"
            rows={4}
          />
          {errors.familyExpectations && (
            <p className="mt-1 text-sm text-red-600">{errors.familyExpectations}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="inline h-4 w-4 mr-2" />
            Cultural & Regional Expectations (Optional)
          </label>
          <textarea
            placeholder="Are there any specific cultural, religious, or regional expectations for your career? What career paths are traditionally preferred in your community?"
            value={data.culturalNorms}
            onChange={(e) => onUpdate({ culturalNorms: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors duration-200 resize-none"
            rows={4}
          />
          {errors.culturalNorms && (
            <p className="mt-1 text-sm text-red-600">{errors.culturalNorms}</p>
          )}
          <p className="mt-1 text-sm text-gray-600">
            Understanding cultural context helps us provide culturally sensitive career guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentForm;