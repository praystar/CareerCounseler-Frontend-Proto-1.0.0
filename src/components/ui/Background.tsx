import React from 'react';

interface BackgroundProps {
  variant?: 'default' | 'gradient' | 'pattern';
  children: React.ReactNode;
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({ 
  variant = 'default', 
  children, 
  className = '' 
}) => {
  const getBackgroundClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-50 via-green-50 to-white';
      case 'pattern':
        return 'bg-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-green-50 to-white';
      default:
        return 'bg-gradient-to-b from-gray-50 to-white';
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClasses()} ${className}`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzEwQjk4MSIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPHN2Zz4K')] opacity-30"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background;