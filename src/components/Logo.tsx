interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Logo = ({ size = 'md', className = '', showText = true }: LogoProps) => {
  const sizes = {
    sm: { svg: 'h-8 w-8', text: 'text-xl' },
    md: { svg: 'h-10 w-10', text: 'text-2xl' },
    lg: { svg: 'h-14 w-14', text: 'text-3xl' }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        className={sizes[size].svg}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 10 L80 30 L80 70 L50 90 L20 70 L20 30 Z"
          fill="rgb(46, 139, 87)"
          opacity="0.9"
        />
        <path
          d="M50 25 L68 38 L68 62 L50 75 L32 62 L32 38 Z"
          fill="rgb(255, 215, 0)"
          opacity="0.8"
        />
        <circle cx="50" cy="50" r="12" fill="rgb(0, 119, 190)" />
        <path
          d="M45 45 L55 50 L45 55 Z"
          fill="white"
        />
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-eucalyptus-dark leading-none ${sizes[size].text}`}>
            Genuine Solutions
          </span>
          <span className="text-xs text-gray-600 font-medium">Australian Employment & Visa Services</span>
        </div>
      )}
    </div>
  );
};
