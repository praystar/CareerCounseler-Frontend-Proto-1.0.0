import React, { useState } from 'react';
import Background from '../ui/Background';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import AcademicForm from '../forms/AcademicForm';
import FamilyContextForm from '../forms/FamilyContextForm';
import EnvironmentForm from '../forms/EnvironmentForm';
import DocumentUploadForm from '../forms/DocumentUploadForm';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface FormData {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    birthTime: string;
    birthPlace: string;
  };
  academic: {
    subjectPreferences: string[];
    lastAcademicScore: string;
    activities: string[];
    careerCuriosity: string;
    psychometricCompleted: boolean;
  };
  familyContext: {
    parentalOccupation: string;
    financialStability: string;
    parentalAspirations: string;
  };
  environment: {
    peerInfluence: string;
    familyExpectations: string;
    culturalNorms: string;
  };
  documents: File[];
}

interface FormScreenProps {
  onComplete: (data: FormData) => void;
  onBack: () => void;
}

const FormScreen: React.FC<FormScreenProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      birthTime: '',
      birthPlace: ''
    },
    academic: {
      subjectPreferences: [],
      lastAcademicScore: '',
      activities: [],
      careerCuriosity: '',
      psychometricCompleted: false
    },
    familyContext: {
      parentalOccupation: '',
      financialStability: '',
      parentalAspirations: ''
    },
    environment: {
      peerInfluence: '',
      familyExpectations: '',
      culturalNorms: ''
    },
    documents: []
  });

  const [errors, setErrors] = useState<any>({});

  const totalSteps = 5;

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
    // Clear errors for the updated fields
    if (errors[section]) {
      setErrors((prev: any) => ({
        ...prev,
        [section]: {}
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: any = {};

    switch (step) {
      case 1:
        if (!formData.personalInfo.fullName.trim()) {
          newErrors.personalInfo = { ...newErrors.personalInfo, fullName: 'Full name is required' };
        }
        if (!formData.personalInfo.dateOfBirth) {
          newErrors.personalInfo = { ...newErrors.personalInfo, dateOfBirth: 'Date of birth is required' };
        }
        if (!formData.personalInfo.birthPlace.trim()) {
          newErrors.personalInfo = { ...newErrors.personalInfo, birthPlace: 'Birth place is required' };
        }
        break;
      case 2:
        if (formData.academic.subjectPreferences.length === 0) {
          newErrors.academic = { ...newErrors.academic, subjectPreferences: 'Please select at least one subject preference' };
        }
        if (!formData.academic.lastAcademicScore.trim()) {
          newErrors.academic = { ...newErrors.academic, lastAcademicScore: 'Academic score is required' };
        }
        break;
      case 3:
        if (!formData.familyContext.parentalOccupation.trim()) {
          newErrors.familyContext = { ...newErrors.familyContext, parentalOccupation: 'Parental occupation is required' };
        }
        if (!formData.familyContext.financialStability) {
          newErrors.familyContext = { ...newErrors.familyContext, financialStability: 'Financial stability information is required' };
        }
        break;
      case 4:
        if (!formData.environment.peerInfluence) {
          newErrors.environment = { ...newErrors.environment, peerInfluence: 'Please select peer influence level' };
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (validateStep(currentStep)) {
      onComplete(formData);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onUpdate={(data) => updateFormData('personalInfo', data)}
            errors={errors.personalInfo || {}}
          />
        );
      case 2:
        return (
          <AcademicForm
            data={formData.academic}
            onUpdate={(data) => updateFormData('academic', data)}
            errors={errors.academic || {}}
          />
        );
      case 3:
        return (
          <FamilyContextForm
            data={formData.familyContext}
            onUpdate={(data) => updateFormData('familyContext', data)}
            errors={errors.familyContext || {}}
          />
        );
      case 4:
        return (
          <EnvironmentForm
            data={formData.environment}
            onUpdate={(data) => updateFormData('environment', data)}
            errors={errors.environment || {}}
          />
        );
      case 5:
        return (
          <DocumentUploadForm
            onFilesUploaded={(files) => updateFormData('documents', files)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Background variant="pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <ProgressBar
            currentStep={currentStep}
            totalSteps={totalSteps}
            className="mb-6"
          />
        </div>

        {/* Form Content */}
        <Card variant="elevated" padding="xl">
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                variant="primary"
              >
                Complete Profile
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </Background>
  );
};

export default FormScreen;