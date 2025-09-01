import React, { useState, useEffect } from 'react';
import Background from '../ui/Background';
import Card from '../ui/Card';
import { Compass, Brain, TrendingUp, MapPin, CheckCircle } from 'lucide-react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Brain className="h-12 w-12 text-emerald-500" />,
      title: 'Analyzing Your Profile',
      description: 'Processing your academic strengths, interests, and personal background...',
      duration: 3000
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-500" />,
      title: 'Considering Market Trends',
      description: 'Evaluating current job market data and future career opportunities...',
      duration: 2500
    },
    {
      icon: <MapPin className="h-12 w-12 text-purple-500" />,
      title: 'Synthesizing Context',
      description: 'Balancing family expectations with personal aspirations and societal factors...',
      duration: 2000
    },
    {
      icon: <Compass className="h-12 w-12 text-indigo-500" />,
      title: 'Building Your Roadmap',
      description: 'Creating personalized career recommendations and development pathways...',
      duration: 3500
    }
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, steps[currentStep].duration);

      return () => clearTimeout(timer);
    } else {
      // All steps completed, proceed to results
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, onComplete]);

  return (
    <Background variant="gradient">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card variant="elevated" padding="xl" className="text-center">
          <div className="mb-12">
            <div className="relative mx-auto w-32 h-32 mb-8">
              {/* Spinning compass animation */}
              <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
              <div className="absolute inset-2 border-4 border-t-emerald-500 border-r-blue-500 border-b-purple-500 border-l-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Compass className="h-16 w-16 text-emerald-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              NaviRiti is Analyzing Your Profile
            </h1>
            <p className="text-gray-600 text-lg">
              Please wait while we generate your personalized career recommendations...
            </p>
          </div>

          {/* Processing Steps */}
          <div className="space-y-8 max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-500 ${
                  index < currentStep
                    ? 'bg-green-50 border-2 border-green-200'
                    : index === currentStep
                    ? 'bg-blue-50 border-2 border-blue-200 scale-105'
                    : 'bg-gray-50 border-2 border-gray-100 opacity-60'
                }`}
              >
                <div className="flex-shrink-0">
                  {index < currentStep ? (
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  ) : (
                    <div className={index === currentStep ? 'animate-pulse' : ''}>
                      {step.icon}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                  {index === currentStep && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress indicator */}
          <div className="mt-12">
            <div className="flex justify-center items-center space-x-2">
              {Array.from({ length: steps.length }).map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep ? 'bg-emerald-500' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Processing step {Math.min(currentStep + 1, steps.length)} of {steps.length}
            </p>
          </div>

          {currentStep >= steps.length && (
            <div className="mt-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                <CheckCircle className="h-5 w-5 mr-2" />
                Analysis Complete! Preparing your results...
              </div>
            </div>
          )}
        </Card>
      </div>
    </Background>
  );
};

export default ProcessingScreen;