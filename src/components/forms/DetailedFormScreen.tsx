import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../ui/Background'
import Button from '../ui/Button'
import Card from '../ui/Card'
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  User, 
  GraduationCap, 
  Users, 
  Globe, 
  Upload,
  FileText,
  Award,
  Briefcase,
  BookOpen,
  CheckCircle,
  Building,
  Heart,
  TrendingUp,
  X,
  File,
  AlertCircle
} from 'lucide-react'

interface FormData {
  // Personal Information
  fullName: string
  dateOfBirth: string
  birthTime: string
  birthPlace: string
  
  // Academic & Interests
  subjectPreferences: string
  academicScore: string
  activities: string
  careerCuriosity: string
  psychometricTest: string
  
  // Family Context
  parentalOccupation: string
  financialStability: string
  parentalAspirations: string
  
  // Environment & Society
  peerInfluence: string
  familyExpectations: string
  culturalNorms: string
  
  // Documents
  documents: File[]
}

interface FormErrors {
  [key: string]: string
}

const DetailedFormScreen: React.FC = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isDragOver, setIsDragOver] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    dateOfBirth: '',
    birthTime: '',
    birthPlace: '',
    subjectPreferences: '',
    academicScore: '',
    activities: '',
    careerCuriosity: '',
    psychometricTest: 'Not taken',
    parentalOccupation: '',
    financialStability: '',
    parentalAspirations: '',
    peerInfluence: '',
    familyExpectations: '',
    culturalNorms: '',
    documents: []
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => {
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Maximum size is 10MB.`)
          return false
        }
        return true
      })
      setFormData(prev => ({ ...prev, documents: [...prev.documents, ...newFiles] }))
    }
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
        if (!formData.birthPlace.trim()) newErrors.birthPlace = 'Birth place is required'
        break
      
      case 2:
        if (!formData.subjectPreferences.trim()) newErrors.subjectPreferences = 'Subject preferences are required'
        if (!formData.academicScore.trim()) newErrors.academicScore = 'Academic score is required'
        if (!formData.activities.trim()) newErrors.activities = 'Extracurricular activities are required'
        if (!formData.careerCuriosity.trim()) newErrors.careerCuriosity = 'Career curiosity is required'
        break
      
      case 3:
        if (!formData.parentalOccupation.trim()) newErrors.parentalOccupation = 'Parental occupation is required'
        if (!formData.financialStability) newErrors.financialStability = 'Financial stability is required'
        break
      
      case 4:
        if (!formData.peerInfluence) newErrors.peerInfluence = 'Peer influence level is required'
        if (!formData.familyExpectations.trim()) newErrors.familyExpectations = 'Family expectations are required'
        break
      
      case 5:
        // Documents are optional, but we can add validation if needed
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <User className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Personal Information</h2>
        <p className="text-lg text-gray-600">Let's start with some basic information about you</p>
        <p className="text-sm text-red-600 mt-2">* All fields marked with asterisk are required</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.fullName}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dateOfBirth && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.dateOfBirth}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Time (Optional)
          </label>
          <input
            type="time"
            value={formData.birthTime}
            onChange={(e) => handleInputChange('birthTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Place <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.birthPlace}
            onChange={(e) => handleInputChange('birthPlace', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.birthPlace ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="City, Country"
          />
          {errors.birthPlace && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.birthPlace}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic & Interests</h2>
        <p className="text-lg text-gray-600">Tell us about your academic background and interests</p>
        <p className="text-sm text-red-600 mt-2">* All fields marked with asterisk are required</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject Preferences <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.subjectPreferences}
            onChange={(e) => handleInputChange('subjectPreferences', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.subjectPreferences ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Computer Science, Mathematics, Physics"
          />
          {errors.subjectPreferences && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.subjectPreferences}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Academic Score/GPA <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.academicScore}
            onChange={(e) => handleInputChange('academicScore', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.academicScore ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., 85%, 3.5 GPA"
          />
          {errors.academicScore && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.academicScore}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Extracurricular Activities <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.activities}
            onChange={(e) => handleInputChange('activities', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.activities ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Debate, Sports, Music, Art"
          />
          {errors.activities && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.activities}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Career Curiosity <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.careerCuriosity}
            onChange={(e) => handleInputChange('careerCuriosity', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.careerCuriosity ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="What careers interest you? What questions do you have about different professions?"
          />
          {errors.careerCuriosity && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.careerCuriosity}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Psychometric Test</label>
          <select
            value={formData.psychometricTest}
            onChange={(e) => handleInputChange('psychometricTest', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="Not taken">Not taken</option>
            <option value="Taken - Results available">Taken - Results available</option>
            <option value="Taken - No results">Taken - No results</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Users className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Family Context</h2>
        <p className="text-lg text-gray-600">Understanding your family background helps us provide more relevant career guidance</p>
        <p className="text-sm text-red-600 mt-2">* All fields marked with asterisk are required</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Parental Occupation <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={formData.parentalOccupation}
              onChange={(e) => handleInputChange('parentalOccupation', e.target.value)}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                errors.parentalOccupation ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Teacher, Engineer, Business Owner, Doctor, etc."
            />
          </div>
          {errors.parentalOccupation && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.parentalOccupation}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Family Financial Stability <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.financialStability}
            onChange={(e) => handleInputChange('financialStability', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.financialStability ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select financial situation...</option>
            <option value="Struggling">Struggling</option>
            <option value="Basic">Basic</option>
            <option value="Comfortable">Comfortable</option>
            <option value="Well-off">Well-off</option>
            <option value="Wealthy">Wealthy</option>
          </select>
          {errors.financialStability && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.financialStability}
            </div>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Privacy Note:</strong> This information helps us recommend feasible educational paths and career options within your budget range. All data is kept confidential.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Heart className="inline h-4 w-4 mr-1" />
            Parental Career Aspirations
          </label>
          <textarea
            value={formData.parentalAspirations}
            onChange={(e) => handleInputChange('parentalAspirations', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={3}
            placeholder="What careers do your parents suggest for you? What are their expectations or hopes for your future? (Optional)"
          />
          <p className="text-xs text-gray-500 mt-1">Understanding parental expectations helps us balance your interests with family aspirations.</p>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Globe className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Environment</h2>
        <p className="text-lg text-gray-600">Social and cultural factors that influence your career decision-making process</p>
        <p className="text-sm text-red-600 mt-2">* All fields marked with asterisk are required</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Peer Influence on Career Choices <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.peerInfluence}
            onChange={(e) => handleInputChange('peerInfluence', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.peerInfluence ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select influence level...</option>
            <option value="None - I make my own decisions">None - I make my own decisions</option>
            <option value="A little - I consider their opinions sometimes">A little - I consider their opinions sometimes</option>
            <option value="Moderate - Their opinions matter to me">Moderate - Their opinions matter to me</option>
            <option value="High - I often follow their suggestions">High - I often follow their suggestions</option>
          </select>
          {errors.peerInfluence && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.peerInfluence}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Home className="inline h-4 w-4 mr-1" />
            Extended Family Expectations <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.familyExpectations}
            onChange={(e) => handleInputChange('familyExpectations', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
              errors.familyExpectations ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="What careers are your extended family, relatives, or family friends suggesting? What are the common expectations in your family circle?"
          />
          {errors.familyExpectations && (
            <div className="flex items-center mt-1 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.familyExpectations}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="inline h-4 w-4 mr-1" />
            Cultural & Regional Expectations (Optional)
          </label>
          <textarea
            value={formData.culturalNorms}
            onChange={(e) => handleInputChange('culturalNorms', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            rows={3}
            placeholder="Are there any specific cultural, religious, or regional expectations for your career? What career paths are traditionally preferred in your community?"
          />
          <p className="text-xs text-gray-500 mt-1">Understanding cultural context helps us provide culturally sensitive career guidance.</p>
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <Upload className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell us more, effortlessly</h2>
        <p className="text-lg text-gray-600">Upload any documents that showcase your achievements, projects, and experiences. Our AI will automatically extract relevant information to enhance your career profile.</p>
        <p className="text-sm text-blue-600 mt-2">📄 Document upload is optional but recommended for better analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6 text-center">
          <Award className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Certificates & Awards</h3>
          <p className="text-sm text-gray-600">Achievement certificates, competition awards, recognition letters</p>
        </Card>

        <Card className="p-6 text-center">
          <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Records</h3>
          <p className="text-sm text-gray-600">Report cards, transcripts, grade sheets, academic evaluations</p>
        </Card>

        <Card className="p-6 text-center">
          <FileText className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Documents</h3>
          <p className="text-sm text-gray-600">Project reports, research papers, portfolio documents</p>
        </Card>

        <Card className="p-6 text-center">
          <Briefcase className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience Letters</h3>
          <p className="text-sm text-gray-600">Internship certificates, volunteer work letters, leadership roles</p>
        </Card>
      </div>

      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
          isDragOver 
            ? 'border-emerald-500 bg-emerald-50' 
            : 'border-gray-300 hover:border-emerald-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <Upload className={`h-16 w-16 mx-auto mb-4 ${isDragOver ? 'text-emerald-500' : 'text-gray-400'}`} />
        <p className="text-lg text-gray-600 mb-2">
          Drop your documents here, or <span className="text-emerald-600 font-medium">browse files</span>
        </p>
        <p className="text-sm text-gray-500">Supported formats: .pdf, .doc, .docx, .txt, .jpg, .jpeg, .png (Max 10MB each)</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />
        <div className="mt-4">
          <Button variant="outline" onClick={(e) => { e.stopPropagation(); openFileDialog(); }}>
            Choose Files
          </Button>
        </div>
      </div>

      {formData.documents.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Uploaded Files ({formData.documents.length}):</h4>
          <div className="space-y-2">
            {formData.documents.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center">
                  <File className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">How Document Auto-fill Works:</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Our AI scans uploaded documents for skills, achievements, and experiences</li>
          <li>• Relevant information is automatically added to your profile</li>
          <li>• This saves you time and ensures nothing important is missed</li>
          <li>• All data is processed securely and remains confidential</li>
        </ul>
      </div>
    </div>
  )

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-10 w-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Review Your Information</h2>
        <p className="text-lg text-gray-600">Please review all the information you've provided before generating your career report.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 text-emerald-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Full Name:</span>
              <span className="font-medium">{formData.fullName || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date of Birth:</span>
              <span className="font-medium">{formData.dateOfBirth || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Birth Time:</span>
              <span className="font-medium">{formData.birthTime || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Birth Place:</span>
              <span className="font-medium">{formData.birthPlace || 'Not provided'}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <GraduationCap className="h-6 w-6 text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Academic & Interests</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subject Preferences:</span>
              <span className="font-medium">{formData.subjectPreferences || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Academic Score:</span>
              <span className="font-medium">{formData.academicScore || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Activities:</span>
              <span className="font-medium">{formData.activities || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Career Curiosity:</span>
              <span className="font-medium">{formData.careerCuriosity || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Psychometric Test:</span>
              <span className="font-medium">{formData.psychometricTest}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Family Context</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Parental Occupation:</span>
              <span className="font-medium">{formData.parentalOccupation || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Financial Stability:</span>
              <span className="font-medium">{formData.financialStability || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Parental Aspirations:</span>
              <span className="font-medium">{formData.parentalAspirations || 'Not specified'}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Globe className="h-6 w-6 text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Environment & Society</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Peer Influence:</span>
              <span className="font-medium">{formData.peerInfluence || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Family Expectations:</span>
              <span className="font-medium">{formData.familyExpectations || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cultural Norms:</span>
              <span className="font-medium">{formData.culturalNorms || 'Not specified'}</span>
            </div>
          </div>
        </Card>
      </div>

      {formData.documents.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Upload className="h-6 w-6 text-emerald-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Uploaded Documents ({formData.documents.length})</h3>
          </div>
          <div className="space-y-2">
            {formData.documents.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <File className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <CheckCircle className="h-6 w-6 text-emerald-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Privacy & Data Security</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Your data is encrypted and secure. We use it solely to generate your personalized career report. All information is processed in compliance with data protection regulations and will never be shared with third parties without your explicit consent.
        </p>
        <div className="flex items-center">
          <input type="checkbox" id="privacy-consent" className="mr-2" defaultChecked />
          <label htmlFor="privacy-consent" className="text-sm text-gray-600">
            I agree to the <span className="text-blue-600 underline cursor-pointer">Terms & Conditions</span> and <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>. I consent to the processing of my data for generating a personalized career report.
          </label>
        </div>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      case 6: return renderReview()
      default: return renderStep1()
    }
  }

  const handleNext = () => {
    if (currentStep < 6) {
      // Validate current step before proceeding
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1)
      } else {
        // Scroll to top to show errors
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      // Navigate to analysis screen
      navigate('/analysis')
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Background variant="gradient">
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <button
                onClick={() => navigate('/user')}
                className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </button>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">
                  {currentStep <= 5 ? `Step ${currentStep} of ${totalSteps}` : 'Review'}
                </p>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round(progress)}% Complete
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8">
            {renderContent()}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                {currentStep <= 5 ? `Step ${currentStep} of ${totalSteps}` : 'Review Complete'}
              </p>
              {Object.keys(errors).length > 0 && (
                <p className="text-xs text-red-600 mt-1">
                  Please fill in all required fields to continue
                </p>
              )}
            </div>

            <Button
              onClick={handleNext}
              className="flex items-center"
            >
              {currentStep === 6 ? 'Generate My Career Report' : 'Next'}
              {currentStep < 6 && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </Background>
  )
}

export default DetailedFormScreen
