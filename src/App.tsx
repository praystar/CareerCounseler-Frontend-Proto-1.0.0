import React, { useState } from 'react';
import LandingScreen from './components/screens/LandingScreen';
import FormScreen, { FormData } from './components/screens/FormScreen';
import ReviewScreen from './components/screens/ReviewScreen';
import ProcessingScreen from './components/screens/ProcessingScreen';
import ResultsScreen from './components/screens/ResultsScreen';
import AdminPanel from './components/admin/AdminPanel';

type AppScreen = 'landing' | 'form' | 'review' | 'processing' | 'results' | 'admin';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [formData, setFormData] = useState<FormData | null>(null);

  // Check if admin mode is enabled (in real app, this would be based on authentication)
  const isAdminMode = window.location.hash === '#admin';

  if (isAdminMode) {
    return <AdminPanel />;
  }

  const handleStartJourney = () => {
    setCurrentScreen('form');
  };

  const handleFormComplete = (data: FormData) => {
    setFormData(data);
    setCurrentScreen('review');
  };

  const handleReviewConfirm = () => {
    setCurrentScreen('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentScreen('results');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
    setFormData(null);
  };

  const handleBackToForm = () => {
    setCurrentScreen('form');
  };

  switch (currentScreen) {
    case 'landing':
      return <LandingScreen onStart={handleStartJourney} />;
    
    case 'form':
      return (
        <FormScreen 
          onComplete={handleFormComplete}
          onBack={handleBackToLanding}
        />
      );
    
    case 'review':
      return formData ? (
        <ReviewScreen
          formData={formData}
          onConfirm={handleReviewConfirm}
          onBack={handleBackToForm}
        />
      ) : null;
    
    case 'processing':
      return <ProcessingScreen onComplete={handleProcessingComplete} />;
    
    case 'results':
      return formData ? (
        <ResultsScreen
          formData={formData}
          onBack={handleBackToLanding}
        />
      ) : null;
    
    default:
      return <LandingScreen onStart={handleStartJourney} />;
  }
}

export default App;