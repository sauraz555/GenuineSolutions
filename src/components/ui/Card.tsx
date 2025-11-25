import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card = ({
  children,
  className = '',
  padding = 'md',
  hoverable = false
}: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClass = hoverable
    ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
    : 'transition-all duration-300';

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${paddingClasses[padding]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h3 className={`text-xl font-semibold text-gray-900 ${className}`}>{children}</h3>
);

export const CardContent = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>{children}</div>
);
