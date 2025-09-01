import React, { useState } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { BookOpen, Trophy, Users, Target } from 'lucide-react';

interface AcademicInfo {
  subjectPreferences: string[];
  lastAcademicScore: string;
  activities: string[];
  careerCuriosity: string;
  psychometricCompleted: boolean;
}

interface AcademicFormProps {
  data: AcademicInfo;
  onUpdate: (data: Partial<AcademicInfo>) => void;
  errors: Partial<Record<keyof AcademicInfo, string>>;
}

const AcademicForm: React.FC<AcademicFormProps> = ({ 
  data, 
  onUpdate, 
  errors 
}) => {
  const [showPsychometric, setShowPsychometric] = useState(false);

  const subjectOptions = [
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'history', label: 'History' },
    { value: 'geography', label: 'Geography' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'economics', label: 'Economics' },
    { value: 'english', label: 'English Literature' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'art', label: 'Arts & Design' },
    { value: 'music', label: 'Music' },
    { value: 'psychology', label: 'Psychology' }
  ];

  const activityOptions = [
    { value: 'sports', label: 'Sports & Athletics' },
    { value: 'music', label: 'Music & Performing Arts' },
    { value: 'debate', label: 'Debate & Public Speaking' },
    { value: 'science-projects', label: 'Science Projects' },
    { value: 'coding', label: 'Programming & Coding' },
    { value: 'volunteering', label: 'Community Volunteering' },
    { value: 'leadership', label: 'Student Leadership' },
    { value: 'writing', label: 'Creative Writing' },
    { value: 'research', label: 'Research Projects' },
    { value: 'competitions', label: 'Academic Competitions' },
    { value: 'internships', label: 'Internships' },
    { value: 'clubs', label: 'Club Participation' }
  ];

  const handlePsychometricTest = () => {
    setShowPsychometric(true);
    // Simulate completing psychometric test
    setTimeout(() => {
      onUpdate({ psychometricCompleted: true });
      setShowPsychometric(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Academic & Interests</h2>
        <p className="text-gray-600">Tell us about your academic preferences and extracurricular activities.</p>
      </div>

      <div className="space-y-6">
        <Select
          label="Subject Preferences"
          options={subjectOptions}
          multiple
          selectedValues={data.subjectPreferences}
          onMultiChange={(values) => onUpdate({ subjectPreferences: values })}
          error={errors.subjectPreferences}
        />

        <Input
          label="Last Academic Year Score/Grade"
          placeholder="e.g., 85%, A Grade, 3.8 GPA"
          value={data.lastAcademicScore}
          onChange={(e) => onUpdate({ lastAcademicScore: e.target.value })}
          leftIcon={<BookOpen className="h-5 w-5" />}
          error={errors.lastAcademicScore}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Psychometric Assessment
          </label>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            {!data.psychometricCompleted ? (
              <div className="text-center">
                <Target className="mx-auto h-12 w-12 text-blue-500 mb-3" />
                <p className="text-sm text-gray-700 mb-4">
                  Take our quick psychometric test to better understand your personality traits and aptitudes.
                </p>
                <Button
                  variant="secondary"
                  onClick={handlePsychometricTest}
                  loading={showPsychometric}
                >
                  {showPsychometric ? 'Analyzing Your Responses...' : 'Take Quick Test (5 mins)'}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-green-600">
                  <Trophy className="h-5 w-5" />
                  <span className="font-medium">Psychometric Test Completed</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Your personality profile has been analyzed and will be included in your career recommendations.
                </p>
              </div>
            )}
          </div>
        </div>

        <Select
          label="Activities & Experiences"
          options={activityOptions}
          multiple
          selectedValues={data.activities}
          onMultiChange={(values) => onUpdate({ activities: values })}
          error={errors.activities}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Career Exploration
          </label>
          <textarea
            placeholder="Are there any careers you are already curious about? Tell us what interests you..."
            value={data.careerCuriosity}
            onChange={(e) => onUpdate({ careerCuriosity: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-colors duration-200 resize-none"
            rows={4}
          />
          {errors.careerCuriosity && (
            <p className="mt-1 text-sm text-red-600">{errors.careerCuriosity}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicForm;