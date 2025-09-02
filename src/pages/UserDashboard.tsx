import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/auth/AuthContext'
import Background from '../components/ui/Background'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { 
  Compass, 
  Upload, 
  FileText, 
  BarChart3, 
  Brain, 
  LogOut, 
  User,
  ArrowRight,
  CheckCircle,
  ClipboardList,
  Zap,
  X,
  File
} from 'lucide-react'

const UserDashboard: React.FC = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [currentStep, setCurrentStep] = useState<'about' | 'upload' | 'forms' | 'detailed-forms' | 'visualization' | 'llm'>('about')
  
  // File upload states
  const [academicFiles, setAcademicFiles] = useState<File[]>([])
  const [transcriptFiles, setTranscriptFiles] = useState<File[]>([])
  
  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    location: '',
    education: '',
    fieldOfStudy: '',
    gpa: ''
  })
  
  // Psychometric test states
  const [selectedTest, setSelectedTest] = useState<string | null>(null)
  const [isLoadingTest, setIsLoadingTest] = useState(false)
  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  const handleFileUpload = (files: FileList | null, type: 'academic' | 'transcript') => {
    if (!files) return
    
    const newFiles = Array.from(files)
    
    if (type === 'academic') {
      setAcademicFiles(prev => [...prev, ...newFiles])
    } else {
      setTranscriptFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number, type: 'academic' | 'transcript') => {
    if (type === 'academic') {
      setAcademicFiles(prev => prev.filter((_, i) => i !== index))
    } else {
      setTranscriptFiles(prev => prev.filter((_, i) => i !== index))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePsychometricTest = (testType: string, testUrl: string) => {
    setSelectedTest(testType)
    setIsLoadingTest(true)
    
    // Simulate loading time
    setTimeout(() => {
      // Open external test in new tab
      window.open(testUrl, '_blank')
      setIsLoadingTest(false)
    }, 2000)
  }

  const steps = [
    { id: 'about', title: 'About the Product', icon: <Compass className="h-5 w-5" />, completed: true },
    { id: 'upload', title: 'Upload Documents', icon: <Upload className="h-5 w-5" />, completed: academicFiles.length > 0 || transcriptFiles.length > 0 },
    { id: 'forms', title: 'Quick Forms', icon: <FileText className="h-5 w-5" />, completed: false },
    { id: 'detailed-forms', title: 'Detailed Assessment', icon: <ClipboardList className="h-5 w-5" />, completed: false },
    { id: 'visualization', title: 'View Visualization', icon: <BarChart3 className="h-5 w-5" />, completed: false },
    { id: 'llm', title: 'AI Generated Content', icon: <Brain className="h-5 w-5" />, completed: false },
  ]

  const renderFileList = (files: File[], type: 'academic' | 'transcript') => {
    if (files.length === 0) return null

    return (
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <File className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>
            <button
              onClick={() => removeFile(index, type)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'about':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Compass className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to NaviRiti</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your AI-powered career guidance platform. We'll help you discover the perfect career path 
                based on your interests, skills, and market trends.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What We Do</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Analyze your academic background
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Assess your interests and skills
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Consider family and social factors
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                    Provide market-aligned recommendations
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Journey</h3>
                <p className="text-gray-600 mb-4">
                  Choose your preferred assessment method:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Quick Assessment</p>
                      <p className="text-sm text-gray-600">Fast 5-minute evaluation</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-emerald-50 rounded-lg">
                    <ClipboardList className="h-5 w-5 text-emerald-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Detailed Assessment</p>
                      <p className="text-sm text-gray-600">Comprehensive 15-minute evaluation</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={() => setCurrentStep('forms')}
                  size="lg"
                  className="px-8 py-3"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Quick Assessment
                </Button>
                <Button 
                  onClick={() => navigate('/detailed-forms')}
                  size="lg"
                  className="px-8 py-3"
                >
                  <ClipboardList className="mr-2 h-5 w-5" />
                  Detailed Assessment
                </Button>
              </div>
            </div>
          </div>
        )

      case 'upload':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Documents</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload your academic certificates, transcripts, and any other relevant documents 
                to help us understand your background better.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-dashed border-gray-300 hover:border-emerald-500 transition-colors">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Certificates</h3>
                  <p className="text-gray-600 mb-4">Upload your degree certificates, diplomas, etc.</p>
                  <div>
                    <input
                      type="file"
                      id="academic-files"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files, 'academic')}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('academic-files')?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                  {renderFileList(academicFiles, 'academic')}
                </div>
              </Card>
              
              <Card className="p-6 border-2 border-dashed border-gray-300 hover:border-emerald-500 transition-colors">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Transcripts</h3>
                  <p className="text-gray-600 mb-4">Upload your academic transcripts and mark sheets.</p>
                  <div>
                    <input
                      type="file"
                      id="transcript-files"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files, 'transcript')}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => document.getElementById('transcript-files')?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>
                  {renderFileList(transcriptFiles, 'transcript')}
                </div>
              </Card>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep('about')}
              >
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('forms')}
              >
                Continue to Forms
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 'forms':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Assessment</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete these quick forms to help us understand your interests, 
                skills, and career preferences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input 
                      type="number" 
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      placeholder="Your age"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Academic Background</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Highest Education</label>
                    <select 
                      value={formData.education}
                      onChange={(e) => handleInputChange('education', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select education level</option>
                      <option value="high-school">High School</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                    <input 
                      type="text" 
                      value={formData.fieldOfStudy}
                      onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GPA/Percentage</label>
                    <input 
                      type="text" 
                      value={formData.gpa}
                      onChange={(e) => handleInputChange('gpa', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      placeholder="e.g., 3.8 or 85%"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Psychometric Assessment</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Take a professional psychometric test to better understand your personality and career preferences.
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handlePsychometricTest('16personalities', 'https://www.16personalities.com/free-personality-test')}
                    disabled={isLoadingTest}
                    className={`w-full p-3 rounded-lg border-2 transition-all ${
                      selectedTest === '16personalities' && isLoadingTest
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">16Personalities Test</h4>
                        <p className="text-xs text-gray-600">Myers-Briggs based assessment</p>
                      </div>
                      {selectedTest === '16personalities' && isLoadingTest ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                      ) : (
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => handlePsychometricTest('bigfive', 'https://www.truity.com/test/big-five-personality-test')}
                    disabled={isLoadingTest}
                    className={`w-full p-3 rounded-lg border-2 transition-all ${
                      selectedTest === 'bigfive' && isLoadingTest
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">Big Five Test</h4>
                        <p className="text-xs text-gray-600">Scientific personality model</p>
                      </div>
                      {selectedTest === 'bigfive' && isLoadingTest ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-500 border-t-transparent"></div>
                      ) : (
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => handlePsychometricTest('strengthsfinder', 'https://www.gallup.com/cliftonstrengths/en/strengthsfinder.aspx')}
                    disabled={isLoadingTest}
                    className={`w-full p-3 rounded-lg border-2 transition-all ${
                      selectedTest === 'strengthsfinder' && isLoadingTest
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">StrengthsFinder</h4>
                        <p className="text-xs text-gray-600">Identify your top strengths</p>
                      </div>
                      {selectedTest === 'strengthsfinder' && isLoadingTest ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-500 border-t-transparent"></div>
                      ) : (
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </button>
                </div>

                {isLoadingTest && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent mr-2"></div>
                      <span className="text-sm text-blue-700">Opening test in new tab...</span>
                    </div>
                  </div>
                )}
              </Card>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep('upload')}
              >
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('visualization')}
              >
                Continue to Visualization
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 'visualization':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Visualization</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore your data through interactive charts and flow diagrams. 
                See how your profile connects to different career paths.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Lifecycle Tree</h3>
                <div className="bg-gradient-to-b from-blue-50 to-emerald-50 p-6 rounded-lg overflow-hidden">
                  {/* Tree Crown - Career Goals */}
                  <div className="text-center mb-4">
                    <div className="inline-flex space-x-4 mb-2">
                      <div className="bg-purple-200 p-2 rounded-full">
                        <Brain className="h-4 w-4 text-purple-700" />
                      </div>
                      <div className="bg-blue-200 p-2 rounded-full">
                        <BarChart3 className="h-4 w-4 text-blue-700" />
                      </div>
                      <div className="bg-emerald-200 p-2 rounded-full">
                        <CheckCircle className="h-4 w-4 text-emerald-700" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 font-medium">Career Success</p>
                  </div>

                  {/* Main Branches - Career Paths */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      {/* Central trunk connection */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-8 bg-amber-800"></div>
                      
                      {/* Branch structure */}
                      <div className="flex items-center justify-center space-x-8 mt-8">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-1 bg-amber-700 mb-2"></div>
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <p className="text-xs text-center text-gray-600 mt-1 max-w-16">Tech Path</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-1 bg-amber-700 mb-2"></div>
                          <div className="bg-emerald-100 p-3 rounded-lg">
                            <User className="h-5 w-5 text-emerald-600" />
                          </div>
                          <p className="text-xs text-center text-gray-600 mt-1 max-w-16">Business</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-1 bg-amber-700 mb-2"></div>
                          <div className="bg-purple-100 p-3 rounded-lg">
                            <Brain className="h-5 w-5 text-purple-600" />
                          </div>
                          <p className="text-xs text-center text-gray-600 mt-1 max-w-16">Creative</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tree Trunk - Current Skills & Education */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-amber-800 w-12 h-16 rounded-lg flex flex-col items-center justify-center">
                      <div className="bg-amber-200 p-2 rounded-full mb-1">
                        <Upload className="h-4 w-4 text-amber-800" />
                      </div>
                      <p className="text-xs text-amber-100 font-medium text-center">Skills</p>
                    </div>
                  </div>

                  {/* Tree Roots - Foundation */}
                  <div className="flex justify-center">
                    <div className="relative">
                      {/* Root structure */}
                      <div className="flex items-end justify-center space-x-6">
                        <div className="flex flex-col items-center">
                          <div className="bg-emerald-700 w-8 h-1 mb-2"></div>
                          <div className="bg-emerald-100 p-2 rounded-full">
                            <User className="h-4 w-4 text-emerald-600" />
                          </div>
                          <p className="text-xs text-center text-gray-600 mt-1">Personality</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="bg-emerald-700 w-8 h-1 mb-2"></div>
                          <div className="bg-blue-100 p-2 rounded-full">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <p className="text-xs text-center text-gray-600 mt-1">Education</p>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="bg-emerald-700 w-8 h-1 mb-2"></div>
                          <div className="bg-purple-100 p-2 rounded-full">
                            <Compass className="h-4 w-4 text-purple-600" />
                          </div>
                          <p className="text-xs text-center text-gray-600 mt-1">Interests</p>
                        </div>
                      </div>
                      
                      {/* Central root connection */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-1 h-4 bg-emerald-700"></div>
                    </div>
                  </div>
                  
                  <p className="text-center text-xs text-gray-500 mt-4 font-medium">Your Foundation → Growth → Success</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Development Timeline</h3>
                <div className="space-y-6">
                  {/* Timeline stages */}
                  <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500"></div>
                    
                    {/* Stage 1: Foundation (Current) */}
                    <div className="relative flex items-center mb-6">
                      <div className="bg-emerald-500 p-2 rounded-full z-10">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-semibold text-gray-900">Foundation Phase</h4>
                        <p className="text-sm text-gray-600">Self-assessment & skill building</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-emerald-500 h-2 rounded-full animate-pulse" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-xs text-emerald-600 font-medium">85% Complete</span>
                      </div>
                    </div>
                    
                    {/* Stage 2: Exploration */}
                    <div className="relative flex items-center mb-6">
                      <div className="bg-blue-500 p-2 rounded-full z-10">
                        <Compass className="h-4 w-4 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-semibold text-gray-900">Exploration Phase</h4>
                        <p className="text-sm text-gray-600">Research opportunities & network</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <span className="text-xs text-blue-600 font-medium">45% Complete</span>
                      </div>
                    </div>
                    
                    {/* Stage 3: Specialization */}
                    <div className="relative flex items-center mb-6">
                      <div className="bg-purple-500 p-2 rounded-full z-10">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-semibold text-gray-900">Specialization Phase</h4>
                        <p className="text-sm text-gray-600">Deep expertise & leadership</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '15%'}}></div>
                        </div>
                        <span className="text-xs text-purple-600 font-medium">15% Complete</span>
                      </div>
                    </div>
                    
                    {/* Stage 4: Mastery */}
                    <div className="relative flex items-center">
                      <div className="bg-yellow-500 p-2 rounded-full z-10">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-semibold text-gray-900">Mastery Phase</h4>
                        <p className="text-sm text-gray-600">Industry influence & mentorship</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '5%'}}></div>
                        </div>
                        <span className="text-xs text-yellow-600 font-medium">5% Complete</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Next milestone */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">Next Milestone</h5>
                    <p className="text-sm text-blue-700">Complete technical skills assessment and identify 3 target career paths</p>
                    <div className="flex items-center mt-2">
                      <ArrowRight className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-xs text-blue-600 font-medium">Estimated: 2 weeks</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep('forms')}
              >
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('llm')}
              >
                Get AI Recommendations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 'llm':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Generated Career Insights</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Based on your profile and market analysis, here are your personalized career recommendations.
              </p>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Top Career Recommendations</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Software Engineer</h4>
                    <p className="text-gray-600">High demand, good salary prospects, matches your technical skills</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-emerald-600 font-medium">Match: 85%</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Data Analyst</h4>
                    <p className="text-gray-600">Growing field, analytical skills required, good work-life balance</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-blue-600 font-medium">Match: 78%</span>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-gray-900">Product Manager</h4>
                    <p className="text-gray-600">Leadership role, strategic thinking, high earning potential</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-purple-600 font-medium">Match: 72%</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Skill Development Plan</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <span className="text-gray-700">Learn Python Programming</span>
                    <span className="text-sm text-emerald-600 font-medium">3 months</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Complete Data Science Course</span>
                    <span className="text-sm text-blue-600 font-medium">6 months</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Develop Leadership Skills</span>
                    <span className="text-sm text-purple-600 font-medium">Ongoing</span>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setCurrentStep('visualization')}
              >
                Back
              </Button>
              <Button 
                onClick={() => setCurrentStep('about')}
              >
                Start Over
              </Button>
            </div>
          </div>
        )

      default:
        return null
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
                <h1 className="text-2xl font-bold text-gray-900">NaviRiti</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{user?.email}</span>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4 overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
                  <button
                    onClick={() => {
                      if (step.id === 'detailed-forms') {
                        navigate('/detailed-forms')
                      } else {
                        setCurrentStep(step.id as any)
                      }
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentStep === step.id
                        ? 'bg-emerald-100 text-emerald-700'
                        : step.completed
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step.icon
                    )}
                    <span className="font-medium whitespace-nowrap">{step.title}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-300 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderStepContent()}
        </div>
      </div>
    </Background>
  )
}

export default UserDashboard