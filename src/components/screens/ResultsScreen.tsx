import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../ui/Background'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { 
  Compass, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Award, 
  Download,
  ArrowRight,
  Home,
  Star,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  BarChart3,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight
} from 'lucide-react'

const ResultsScreen: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('primary')

  const primaryRecommendation = {
    title: 'Data Scientist',
    match: 92,
    description: 'Perfect alignment with your mathematics and analytical skills. High demand in AI and machine learning sectors.',
    salary: '$85,000 - $130,000',
    growth: '+22%',
    icon: Target,
    sections: [
      {
        title: 'Market Demand',
        description: 'High demand with excellent growth prospects in AI and data analytics sectors.',
        icon: TrendingUp,
        color: 'emerald'
      },
      {
        title: 'Skills Match',
        description: 'Strong alignment with your mathematical and analytical abilities.',
        icon: BookOpen,
        color: 'blue'
      },
      {
        title: 'Career Growth',
        description: 'Clear progression path from analyst to senior data scientist roles.',
        icon: Award,
        color: 'purple'
      }
    ]
  }

  const alternativeCareers = [
    {
      title: 'Software Engineer',
      match: 88,
      description: 'Strong technical foundation and problem-solving skills',
      link: 'Learn More →'
    },
    {
      title: 'Product Manager',
      match: 82,
      description: 'Combines technical knowledge with business strategy',
      link: 'Learn More →'
    },
    {
      title: 'Research Analyst',
      match: 79,
      description: 'Leverages analytical thinking and data interpretation',
      link: 'Learn More →'
    }
  ]

  const skillAnalysis = [
    {
      skill: 'Technical Skills',
      current: 70,
      required: 85,
      gap: 15
    },
    {
      skill: 'Communication',
      current: 80,
      required: 90,
      gap: 10
    },
    {
      skill: 'Problem Solving',
      current: 85,
      required: 88,
      gap: 3
    },
    {
      skill: 'Leadership',
      current: 60,
      required: 75,
      gap: 15
    },
    {
      skill: 'Industry Knowledge',
      current: 55,
      required: 80,
      gap: 25
    }
  ]

  const careerRoadmap = [
    {
      phase: 'Short-Term (1 Year)',
      icon: Calendar,
      color: 'emerald',
      goals: [
        'Complete online Python programming course',
        'Learn SQL and database fundamentals',
        'Build 2-3 personal data analysis projects',
        'Join data science communities and forums'
      ]
    },
    {
      phase: 'Medium-Term (1-3 Years)',
      icon: TrendingUp,
      color: 'blue',
      goals: [
        'Pursue Bachelor\'s in Computer Science or Statistics',
        'Seek internship at tech company or research lab',
        'Develop expertise in machine learning frameworks',
        'Create a strong GitHub portfolio'
      ]
    },
    {
      phase: 'Long-Term (5+ Years)',
      icon: Award,
      color: 'purple',
      goals: [
        'Graduate with relevant degree and certifications',
        'Land entry-level data scientist position',
        'Specialize in specific domain (healthcare, finance, etc.)',
        'Progress to senior data scientist or team lead role'
      ]
    }
  ]

  const learningResources = {
    courses: [
      'Coursera: Data Science Specialization',
      'edX: MIT Introduction to Computer Science',
      'Udacity: Data Scientist Nanodegree'
    ],
    certifications: [
      'AWS Certified Data Analytics',
      'Google Data Analytics Certificate',
      'Microsoft Azure Data Scientist Associate'
    ]
  }

  const tabs = [
    { id: 'primary', label: 'Primary Recommendation', icon: Target },
    { id: 'alternatives', label: 'Alternative Careers', icon: TrendingUp },
    { id: 'skills', label: 'Skill Analysis', icon: BarChart3 },
    { id: 'roadmap', label: 'Career Roadmap', icon: MapPin }
  ]

  const handleDownloadReport = () => {
    // Simulate PDF download
    alert('Career report PDF download started!')
  }

  const handleBackToHome = () => {
    navigate('/user')
  }

  const renderPrimaryRecommendation = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Target className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{primaryRecommendation.title}</h2>
        <p className="text-lg text-gray-600">{primaryRecommendation.description}</p>
      </div>

      <Card className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="bg-emerald-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Star className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{primaryRecommendation.match}% Match</p>
            <p className="text-sm text-gray-600">Compatibility Score</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{primaryRecommendation.salary}</p>
            <p className="text-sm text-gray-600">Salary Range</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{primaryRecommendation.growth}</p>
            <p className="text-sm text-gray-600">Growth by 2030</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {primaryRecommendation.sections.map((section, index) => (
            <div key={index} className={`bg-${section.color}-50 border border-${section.color}-200 rounded-lg p-6`}>
              <div className="flex items-center mb-3">
                <div className={`bg-${section.color}-100 p-2 rounded-lg mr-3`}>
                  <section.icon className={`h-5 w-5 text-${section.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{section.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderAlternativeCareers = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Alternative Career Options</h2>
        <p className="text-lg text-gray-600">Other career paths that align with your profile and interests</p>
      </div>

      <div className="space-y-4">
        {alternativeCareers.map((career, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 mr-4">{career.title}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-gray-700">{career.match}% Match</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{career.description}</p>
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                  {career.link}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderSkillAnalysis = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Skill Gap Analysis</h2>
        <p className="text-lg text-gray-600">Current skills vs. requirements for your target career</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          {skillAnalysis.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">{skill.skill}</h3>
                <div className="text-sm text-gray-600">
                  Current: {skill.current}% | Required: {skill.required}% | Gap: {skill.gap}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${skill.current}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Key Skills to Develop:</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• Python Programming and Data Analysis</li>
            <li>• Machine Learning and AI Fundamentals</li>
            <li>• Statistical Analysis and Visualization</li>
            <li>• Communication and Presentation Skills</li>
            <li>• Industry-specific Domain Knowledge</li>
          </ul>
        </div>
      </Card>
    </div>
  )

  const renderCareerRoadmap = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Roadmap</h2>
        <p className="text-lg text-gray-600">Your personalized path to success in data science</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {careerRoadmap.map((phase, index) => (
          <Card key={index} className="p-6">
            <div className="text-center mb-6">
              <div className={`bg-${phase.color}-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3`}>
                <phase.icon className={`h-8 w-8 text-${phase.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
            </div>
            <div className="space-y-3">
              {phase.goals.map((goal, goalIndex) => (
                <div key={goalIndex} className="flex items-start">
                  <CheckCircle className={`h-5 w-5 text-${phase.color}-500 mr-3 mt-0.5 flex-shrink-0`} />
                  <span className="text-sm text-gray-700">{goal}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Learning Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-emerald-600" />
              Online Courses
            </h4>
            <ul className="space-y-2">
              {learningResources.courses.map((course, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                  {course}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-600" />
              Certifications
            </h4>
            <ul className="space-y-2">
              {learningResources.certifications.map((cert, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'primary': return renderPrimaryRecommendation()
      case 'alternatives': return renderAlternativeCareers()
      case 'skills': return renderSkillAnalysis()
      case 'roadmap': return renderCareerRoadmap()
      default: return renderPrimaryRecommendation()
    }
  }

  return (
    <Background variant="gradient">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-2 rounded-lg">
                  <Compass className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">NAVIRITI</h1>
              </div>
              <Button variant="outline" onClick={handleBackToHome}>
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personalized Career Report</h1>
            <p className="text-xl text-gray-600 mb-8">AI-powered insights based on your profile and current market trends</p>
            
            <div className="flex justify-center space-x-4">
              <Button onClick={handleDownloadReport} className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download Full Report
              </Button>
              <Button variant="outline" onClick={() => navigate('/user/detailed-assessment')}>
                Start New Analysis
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <Card className="p-8">
            {renderContent()}
          </Card>
        </div>
      </div>
    </Background>
  )
}

export default ResultsScreen
