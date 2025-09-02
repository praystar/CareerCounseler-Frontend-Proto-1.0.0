import React from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../components/ui/Background'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { Compass, TrendingUp, Users, Award, ArrowRight, CheckCircle, LogIn } from 'lucide-react'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Compass className="h-8 w-8 text-emerald-500" />,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI analyzes your profile with current market trends for personalized recommendations.'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: 'Market-Aligned Guidance',
      description: 'Get career suggestions based on real-time job market data and future growth prospects.'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: 'Holistic Approach',
      description: 'Considers your interests, family context, and societal factors for balanced career guidance.'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: 'Comprehensive Report',
      description: 'Detailed career roadmap with skill gaps, learning paths, and actionable next steps.'
    }
  ]

  const benefits = [
    'Personalized career recommendations based on your unique profile',
    'Skill gap analysis with specific learning recommendations',
    'Career roadmap with short, medium, and long-term goals',
    'Market insights and salary expectations for recommended careers',
    'Downloadable PDF report for future reference'
  ]

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <Background variant="gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-2xl">
              <Compass className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              NaviRiti
            </span>
          </h1>
          <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your AI-Powered Career Compass
          </p>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto">
            Get personalized career guidance that considers your academic strengths, personal interests, 
            family context, and current market trends. Make informed decisions about your future with 
            AI-powered insights and comprehensive career planning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleLogin}
              className="text-xl px-12 py-4 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <LogIn className="mr-3 h-6 w-6" />
              Login to Continue
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleLogin}
              className="text-xl px-12 py-4 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} variant="elevated" className="text-center hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              What You'll Get From Your Career Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Overview */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Simple 4-Step Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Login & Choose Role</h3>
              <p className="text-gray-600">Sign in as Admin or User to access your personalized dashboard</p>
            </div>
            <div className="relative">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fill Your Profile</h3>
              <p className="text-gray-600">Complete comprehensive forms about your interests, academics, and background</p>
            </div>
            <div className="relative">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">View Visualization</h3>
              <p className="text-gray-600">See your data visualized in interactive charts and flow diagrams</p>
            </div>
            <div className="relative">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get AI Insights</h3>
              <p className="text-gray-600">Receive detailed career recommendations and personalized roadmap</p>
            </div>
          </div>
        </div>
      </div>
    </Background>
  )
}

export default LandingPage
