import React from 'react';
import Input from '../ui/Input';
import { User, Calendar, MapPin, Clock } from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  birthTime: string;
  birthPlace: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onUpdate: (data: Partial<PersonalInfo>) => void;
  errors: Partial<Record<keyof PersonalInfo, string>>;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ 
  data, 
  onUpdate, 
  errors 
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">All About You</h2>
        <p className="text-gray-600">Let's start with your basic information to personalize your career guidance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={data.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value })}
          leftIcon={<User className="h-5 w-5" />}
          error={errors.fullName}
          required
        />

        <Input
          label="Date of Birth"
          type="date"
          value={data.dateOfBirth}
          onChange={(e) => onUpdate({ dateOfBirth: e.target.value })}
          leftIcon={<Calendar className="h-5 w-5" />}
          error={errors.dateOfBirth}
          required
        />

        <Input
          label="Birth Time"
          type="time"
          placeholder="HH:MM"
          value={data.birthTime}
          onChange={(e) => onUpdate({ birthTime: e.target.value })}
          leftIcon={<Clock className="h-5 w-5" />}
          hint="Optional - for more personalized insights"
          error={errors.birthTime}
        />

        <Input
          label="Birth Place"
          placeholder="City, State/Country"
          value={data.birthPlace}
          onChange={(e) => onUpdate({ birthPlace: e.target.value })}
          leftIcon={<MapPin className="h-5 w-5" />}
          error={errors.birthPlace}
          required
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;