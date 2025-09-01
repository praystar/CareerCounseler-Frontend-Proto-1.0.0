import React, { useCallback, useState } from 'react';
import { Upload, File, X, CheckCircle } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
}

interface FileUploadProps {
  onFilesUploaded: (files: File[]) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesUploaded,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
  maxSize = 10,
  maxFiles = 5
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const processFiles = useCallback((files: FileList) => {
    const fileArray = Array.from(files).slice(0, maxFiles);
    const validFiles: File[] = [];
    
    fileArray.forEach((file) => {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const fileSizeMB = file.size / (1024 * 1024);
      
      if (acceptedTypes.includes(fileExtension) && fileSizeMB <= maxSize) {
        validFiles.push(file);
        
        const uploadedFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'uploading'
        };
        
        setUploadedFiles(prev => [...prev, uploadedFile]);
        
        // Simulate upload
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => f.id === uploadedFile.id ? { ...f, status: 'completed' } : f)
          );
        }, 1500);
      }
    });

    if (validFiles.length > 0) {
      onFilesUploaded(validFiles);
    }
  }, [acceptedTypes, maxSize, maxFiles, onFilesUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-emerald-500 bg-emerald-50' 
            : 'border-gray-300 hover:border-emerald-400 hover:bg-gray-50'
          }
        `}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drop your documents here, or{' '}
          <label className="text-emerald-600 hover:text-emerald-700 cursor-pointer underline">
            browse files
            <input
              type="file"
              multiple
              className="hidden"
              accept={acceptedTypes.join(',')}
              onChange={handleFileSelect}
            />
          </label>
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: {acceptedTypes.join(', ')} (Max {maxSize}MB each)
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="font-medium text-gray-700">Uploaded Files:</h4>
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <File className="h-8 w-8 text-blue-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
              <div className="flex items-center space-x-2">
                {file.status === 'uploading' && (
                  <div className="h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                )}
                {file.status === 'completed' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;