import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outline';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md'
}) => {
  const baseClasses = 'bg-white rounded-xl';
  
  const variantClasses = {
    default: 'shadow-md hover:shadow-lg transition-shadow duration-300',
    elevated: 'shadow-xl hover:shadow-2xl transition-shadow duration-300',
    outline: 'border-2 border-gray-200 hover:border-emerald-200 transition-colors duration-300'
  };

  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;