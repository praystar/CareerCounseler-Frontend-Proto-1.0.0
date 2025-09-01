import React from 'react';
import FileUpload from '../ui/FileUpload';
import { FileText, Award, BookOpen, Briefcase } from 'lucide-react';

interface DocumentUploadFormProps {
  onFilesUploaded: (files: File[]) => void;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({ onFilesUploaded }) => {
  const documentTypes = [
    {
      icon: <Award className="h-6 w-6 text-yellow-500" />,
      title: 'Certificates & Awards',
      description: 'Achievement certificates, competition awards, recognition letters'
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      title: 'Academic Records',
      description: 'Report cards, transcripts, grade sheets, academic evaluations'
    },
    {
      icon: <FileText className="h-6 w-6 text-green-500" />,
      title: 'Project Documents',
      description: 'Project reports, research papers, portfolio documents'
    },
    {
      icon: <Briefcase className="h-6 w-6 text-purple-500" />,
      title: 'Experience Letters',
      description: 'Internship certificates, volunteer work letters, leadership roles'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us more, effortlessly</h2>
        <p className="text-gray-600">
          Upload any documents that showcase your achievements, projects, and experiences. 
          Our AI will automatically extract relevant information to enhance your career profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {documentTypes.map((type, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
              {type.icon}
              <div>
                <h3 className="font-medium text-gray-900">{type.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{type.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <FileUpload
        onFilesUploaded={onFilesUploaded}
        acceptedTypes={['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png']}
        maxSize={10}
        maxFiles={8}
      />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">How Document Auto-fill Works:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Our AI scans uploaded documents for skills, achievements, and experiences</li>
          <li>• Relevant information is automatically added to your profile</li>
          <li>• This saves you time and ensures nothing important is missed</li>
          <li>• All data is processed securely and remains confidential</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUploadForm;