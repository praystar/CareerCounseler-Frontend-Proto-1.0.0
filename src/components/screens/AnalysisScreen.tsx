import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../ui/Background'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { 
  Compass, 
  CheckCircle, 
  TrendingUp, 
  MapPin, 
  Route,
  ArrowRight,
  Home
} from 'lucide-react'

const AnalysisScreen: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(true)

  const analysisSteps = [
    {
      id: 1,
      title: 'Analyzing Your Profile',
      description: 'Processing your academic strengths, interests, and personal background...',
      icon: <CheckCircle className="h-8 w-8" />,
      color: 'emerald'
    },
    {
      id: 2,
      title: 'Considering Market Trends',
      description: 'Evaluating current job market data and future career opportunities...',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'blue'
    },
    {
      id: 3,
      title: 'Synthesizing Context',
      description: 'Balancing family expectations with personal aspirations and societal factors...',
      icon: <MapPin className="h-8 w-8" />,
      color: 'purple'
    },
    {
      id: 4,
      title: 'Building Your Roadmap',
      description: 'Creating personalized career recommendations and development pathways...',
      icon: <Route className="h-8 w-8" />,
      color: 'purple'
    }
  ]

  useEffect(() => {
    if (!isProcessing) return

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= analysisSteps.length) {
          setIsProcessing(false)
          return prev
        }
        return prev + 1
      })
    }, 3000) // Change step every 3 seconds

    return () => clearInterval(interval)
  }, [isProcessing, analysisSteps.length])

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed'
    if (stepId === currentStep) return 'active'
    return 'pending'
  }

  const getStepColor = (step: any, status: string) => {
    if (status === 'completed') return 'emerald'
    if (status === 'active') return step.color
    return 'gray'
  }

  const handleViewResults = () => {
    navigate('/results')
  }

  const handleBackToHome = () => {
    navigate('/user')
  }

  return (
    <Background variant="gradient">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Compass className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              NaviRiti is Analyzing Your Profile
            </h1>
            <p className="text-xl text-gray-600">
              Please wait while we generate your personalized career recommendations...
            </p>
          </div>

          {/* Analysis Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {analysisSteps.map((step) => {
              const status = getStepStatus(step.id)
              const color = getStepColor(step, status)
              
              return (
                <Card 
                  key={step.id} 
                  className={`p-8 transition-all duration-500 ${
                    status === 'completed' 
                      ? 'bg-emerald-50 border-emerald-200' 
                      : status === 'active'
                      ? `bg-${color}-50 border-${color}-200`
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      status === 'completed' 
                        ? 'bg-emerald-100' 
                        : status === 'active'
                        ? `bg-${color}-100`
                        : 'bg-gray-100'
                    }`}>
                      {status === 'completed' ? (
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                      ) : status === 'active' ? (
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
                      ) : (
                        <div className={`h-8 w-8 text-${color}-600`}>
                          {step.icon}
                        </div>
                      )}
                    </div>
                    
                    <h3 className={`text-xl font-semibold mb-3 ${
                      status === 'completed' 
                        ? 'text-emerald-900' 
                        : status === 'active'
                        ? `text-${color}-900`
                        : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    
                    <p className={`text-sm ${
                      status === 'completed' 
                        ? 'text-emerald-700' 
                        : status === 'active'
                        ? `text-${color}-700`
                        : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>

                    {status === 'active' && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-${color}-500 h-2 rounded-full animate-pulse`}
                            style={{ width: '60%' }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Progress Indicator */}
          <div className="text-center mb-8">
            <div className="flex justify-center space-x-2 mb-4">
              {analysisSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index < currentStep - 1 
                      ? 'bg-emerald-500' 
                      : index === currentStep - 1
                      ? 'bg-blue-500 animate-pulse'
                      : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {isProcessing ? `Processing step ${currentStep} of ${analysisSteps.length}` : 'Analysis complete!'}
            </p>
          </div>

          {/* Action Buttons */}
          {!isProcessing && (
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={handleBackToHome}
                className="flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <Button
                onClick={handleViewResults}
                className="flex items-center"
              >
                View My Career Report
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Background>
  )
}

export default AnalysisScreen
