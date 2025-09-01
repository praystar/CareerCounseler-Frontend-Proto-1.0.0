import React, { useState } from 'react';
import Background from '../ui/Background';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FormData } from './FormScreen';
import { 
  Target, 
  TrendingUp, 
  BarChart3, 
  MapPin, 
  Download, 
  Star,
  DollarSign,
  Calendar,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ResultsScreenProps {
  formData: FormData;
  onBack: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ formData, onBack }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Mock AI-generated results based on form data
  const generateMockResults = () => {
    const subjects = formData.academic.subjectPreferences;
    const hasSTEM = subjects.some(s => ['mathematics', 'physics', 'chemistry', 'computer-science'].includes(s));
    const hasBusiness = subjects.some(s => ['commerce', 'economics'].includes(s));
    const hasCreative = subjects.some(s => ['art', 'music', 'english'].includes(s));

    if (hasSTEM) {
      return {
        primaryCareer: {
          title: 'Data Scientist',
          match: 92,
          salary: '$85,000 - $130,000',
          growth: '+22% by 2030',
          description: 'Perfect alignment with your mathematics and analytical skills. High demand in AI and machine learning sectors.'
        },
        alternativeCareers: [
          { title: 'Software Engineer', match: 88, reason: 'Strong technical foundation and problem-solving skills' },
          { title: 'Product Manager', match: 82, reason: 'Combines technical knowledge with business strategy' },
          { title: 'Research Analyst', match: 79, reason: 'Leverages analytical thinking and data interpretation' }
        ]
      };
    } else if (hasBusiness) {
      return {
        primaryCareer: {
          title: 'Business Analyst',
          match: 89,
          salary: '$70,000 - $105,000',
          growth: '+18% by 2030',
          description: 'Excellent fit for your commerce background and analytical mindset. Growing demand in digital transformation.'
        },
        alternativeCareers: [
          { title: 'Management Consultant', match: 85, reason: 'Strategic thinking and business acumen' },
          { title: 'Financial Advisor', match: 80, reason: 'Strong understanding of financial markets' },
          { title: 'Operations Manager', match: 77, reason: 'Leadership potential and process optimization skills' }
        ]
      };
    } else if (hasCreative) {
      return {
        primaryCareer: {
          title: 'UX/UI Designer',
          match: 87,
          salary: '$65,000 - $95,000',
          growth: '+13% by 2030',
          description: 'Great combination of creativity and user-focused thinking. High demand in tech and digital products.'
        },
        alternativeCareers: [
          { title: 'Content Strategist', match: 83, reason: 'Strong communication and creative skills' },
          { title: 'Digital Marketing Manager', match: 79, reason: 'Creative approach to brand communication' },
          { title: 'Graphic Designer', match: 75, reason: 'Visual design skills and artistic sensibility' }
        ]
      };
    } else {
      return {
        primaryCareer: {
          title: 'Project Coordinator',
          match: 84,
          salary: '$55,000 - $75,000',
          growth: '+11% by 2030',
          description: 'Great organizational skills and ability to work across different domains. Versatile career path.'
        },
        alternativeCareers: [
          { title: 'Human Resources Specialist', match: 80, reason: 'People-focused approach and communication skills' },
          { title: 'Operations Assistant', match: 76, reason: 'Detail-oriented and process-focused mindset' },
          { title: 'Administrative Manager', match: 72, reason: 'Organizational abilities and multi-tasking skills' }
        ]
      };
    }
  };

  const results = generateMockResults();

  const skillsData = [
    { skill: 'Technical Skills', current: 70, required: 85, gap: 15 },
    { skill: 'Communication', current: 80, required: 90, gap: 10 },
    { skill: 'Problem Solving', current: 85, required: 88, gap: 3 },
    { skill: 'Leadership', current: 60, required: 75, gap: 15 },
    { skill: 'Industry Knowledge', current: 55, required: 80, gap: 25 }
  ];

  const roadmapData = {
    shortTerm: [
      'Complete online Python programming course',
      'Learn SQL and database fundamentals',
      'Build 2-3 personal data analysis projects',
      'Join data science communities and forums'
    ],
    mediumTerm: [
      'Pursue Bachelor\'s in Computer Science or Statistics',
      'Seek internship at tech company or research lab',
      'Develop expertise in machine learning frameworks',
      'Create a strong GitHub portfolio'
    ],
    longTerm: [
      'Graduate with relevant degree and certifications',
      'Land entry-level data scientist position',
      'Specialize in specific domain (healthcare, finance, etc.)',
      'Progress to senior data scientist or team lead role'
    ]
  };

  const tabs = [
    { id: 0, label: 'Primary Recommendation', icon: <Target className="h-4 w-4" /> },
    { id: 1, label: 'Alternative Careers', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 2, label: 'Skill Analysis', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 3, label: 'Career Roadmap', icon: <MapPin className="h-4 w-4" /> }
  ];

  const handleDownloadReport = () => {
    // Simulate PDF generation
    alert('Career report downloaded! (This is a demo - in production, a PDF would be generated)');
  };

  return (
    <Background variant="gradient">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Personalized Career Report
          </h1>
          <p className="text-gray-600 text-lg">
            AI-powered insights based on your profile and current market trends
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={handleDownloadReport} variant="primary">
              <Download className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
            <Button onClick={onBack} variant="outline">
              Start New Analysis
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 0 && (
            <Card variant="elevated" padding="xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{results.primaryCareer.title}</h2>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{results.primaryCareer.match}% Match</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span>{results.primaryCareer.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span>{results.primaryCareer.growth}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                  {results.primaryCareer.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 rounded-lg p-6 text-center">
                  <TrendingUp className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Market Demand</h3>
                  <p className="text-sm text-gray-600">High demand with excellent growth prospects in AI and data analytics sectors.</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Skills Match</h3>
                  <p className="text-sm text-gray-600">Strong alignment with your mathematical and analytical abilities.</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Career Growth</h3>
                  <p className="text-sm text-gray-600">Clear progression path from analyst to senior data scientist roles.</p>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 1 && (
            <div className="space-y-6">
              <Card variant="elevated" padding="lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Alternative Career Options</h2>
                <div className="space-y-4">
                  {results.alternativeCareers.map((career, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{career.title}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-600">{career.match}% Match</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{career.reason}</p>
                      <Button variant="ghost" size="sm" className="mt-3">
                        Learn More <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 2 && (
            <Card variant="elevated" padding="xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Gap Analysis</h2>
              <div className="space-y-6">
                {skillsData.map((skill, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{skill.skill}</h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">Current: {skill.current}%</span>
                        <span className="text-gray-600">Required: {skill.required}%</span>
                        {skill.gap > 0 ? (
                          <span className="flex items-center text-orange-600">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Gap: {skill.gap}%
                          </span>
                        ) : (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            On track
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-emerald-500 h-3 rounded-full" 
                          style={{ width: `${skill.current}%` }}
                        ></div>
                        <div 
                          className="absolute top-0 bg-blue-300 h-3 rounded-full opacity-50" 
                          style={{ width: `${skill.required}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Key Skills to Develop:</h3>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Python programming and data manipulation libraries</li>
                  <li>• Statistical analysis and machine learning techniques</li>
                  <li>• Leadership and team collaboration skills</li>
                  <li>• Domain-specific knowledge in your chosen industry</li>
                </ul>
              </div>
            </Card>
          )}

          {activeTab === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="elevated" padding="lg">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Short-Term (1 Year)</h3>
                  </div>
                  <ul className="space-y-3">
                    {roadmapData.shortTerm.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card variant="elevated" padding="lg">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Medium-Term (1-3 Years)</h3>
                  </div>
                  <ul className="space-y-3">
                    {roadmapData.mediumTerm.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card variant="elevated" padding="lg">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Long-Term (5+ Years)</h3>
                  </div>
                  <ul className="space-y-3">
                    {roadmapData.longTerm.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Card variant="elevated" padding="lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Learning Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Online Courses</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Coursera: Data Science Specialization</li>
                      <li>• edX: MIT Introduction to Computer Science</li>
                      <li>• Udacity: Data Scientist Nanodegree</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Certifications</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• AWS Certified Data Analytics</li>
                      <li>• Google Data Analytics Certificate</li>
                      <li>• Microsoft Azure Data Scientist Associate</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Background>
  );
};

export default ResultsScreen;