import React, { useState } from 'react';
import Background from '../ui/Background';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FormData } from './FormScreen';
import { User, BookOpen, Home, Globe, FileText, Shield, CheckCircle } from 'lucide-react';

interface ReviewScreenProps {
  formData: FormData;
  onConfirm: () => void;
  onBack: () => void;
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ formData, onConfirm, onBack }) => {
  const [agreed, setAgreed] = useState(false);

  const formatSubjects = (subjects: string[]) => {
    return subjects.map(subject => 
      subject.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    ).join(', ');
  };

  const formatActivities = (activities: string[]) => {
    return activities.map(activity => 
      activity.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    ).join(', ');
  };

  const getStabilityLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      'not-stable': 'Not Stable',
      'managing': 'Managing',
      'comfortable': 'Comfortable',
      'very-stable': 'Very Stable'
    };
    return labels[value] || value;
  };

  const getPeerInfluenceLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      'not-at-all': 'Not at all',
      'a-little': 'A little',
      'moderately': 'Moderately',
      'a-lot': 'A lot'
    };
    return labels[value] || value;
  };

  const sections = [
    {
      icon: <User className="h-6 w-6 text-emerald-500" />,
      title: 'Personal Information',
      items: [
        { label: 'Full Name', value: formData.personalInfo.fullName },
        { label: 'Date of Birth', value: formData.personalInfo.dateOfBirth },
        { label: 'Birth Time', value: formData.personalInfo.birthTime || 'Not provided' },
        { label: 'Birth Place', value: formData.personalInfo.birthPlace }
      ]
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      title: 'Academic & Interests',
      items: [
        { label: 'Subject Preferences', value: formatSubjects(formData.academic.subjectPreferences) },
        { label: 'Academic Score', value: formData.academic.lastAcademicScore },
        { label: 'Activities', value: formatActivities(formData.academic.activities) || 'None selected' },
        { label: 'Career Curiosity', value: formData.academic.careerCuriosity || 'Not specified' },
        { label: 'Psychometric Test', value: formData.academic.psychometricCompleted ? 'Completed' : 'Not taken' }
      ]
    },
    {
      icon: <Home className="h-6 w-6 text-purple-500" />,
      title: 'Family Context',
      items: [
        { label: 'Parental Occupation', value: formData.familyContext.parentalOccupation },
        { label: 'Financial Stability', value: getStabilityLabel(formData.familyContext.financialStability) },
        { label: 'Parental Aspirations', value: formData.familyContext.parentalAspirations || 'Not specified' }
      ]
    },
    {
      icon: <Globe className="h-6 w-6 text-indigo-500" />,
      title: 'Environment & Society',
      items: [
        { label: 'Peer Influence', value: getPeerInfluenceLabel(formData.environment.peerInfluence) },
        { label: 'Family Expectations', value: formData.environment.familyExpectations || 'Not specified' },
        { label: 'Cultural Norms', value: formData.environment.culturalNorms || 'Not specified' }
      ]
    }
  ];

  return (
    <Background variant="gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card variant="elevated" padding="xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Your Information</h1>
            <p className="text-gray-600">
              Please review all the information you've provided before generating your career report.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-1">
                      <dt className="text-sm font-medium text-gray-600">{item.label}</dt>
                      <dd className="text-sm text-gray-900 break-words">{item.value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {formData.documents.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FileText className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Uploaded Documents</h2>
                </div>
                <div className="space-y-2">
                  {formData.documents.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Privacy and Consent */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Privacy & Data Security</h3>
                <p className="text-blue-800 text-sm mb-4">
                  Your data is encrypted and secure. We use it solely to generate your personalized career report. 
                  All information is processed in compliance with data protection regulations and will never be 
                  shared with third parties without your explicit consent.
                </p>
                
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-blue-800">
                    I agree to the{' '}
                    <a href="#" className="underline hover:text-blue-600">Terms & Conditions</a>
                    {' '}and{' '}
                    <a href="#" className="underline hover:text-blue-600">Privacy Policy</a>. 
                    I consent to the processing of my data for generating a personalized career report.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onBack}
            >
              Back to Edit Information
            </Button>
            
            <Button
              onClick={onConfirm}
              disabled={!agreed}
              size="lg"
              className="px-8"
            >
              Generate My Career Report
            </Button>
          </div>
        </Card>
      </div>
    </Background>
  );
};

export default ReviewScreen;