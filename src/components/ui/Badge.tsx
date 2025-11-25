import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'sponsorship';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}: BadgeProps) => {
  const variants = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    sponsorship: 'bg-eucalyptus/10 text-eucalyptus-dark border-eucalyptus'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export const SponsorshipBadge = ({ available }: { available: 'yes' | 'no' | 'preferred' }) => {
  const config = {
    yes: { text: 'Sponsorship Available', variant: 'sponsorship' as const },
    preferred: { text: 'Sponsorship Preferred', variant: 'info' as const },
    no: { text: 'General Employment', variant: 'neutral' as const }
  };

  const { text, variant } = config[available];

  return <Badge variant={variant}>{text}</Badge>;
};
