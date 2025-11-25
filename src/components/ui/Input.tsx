import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-terracotta ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-eucalyptus/20 focus:border-eucalyptus bg-white ${
            error
              ? 'border-terracotta focus:ring-terracotta/20 focus:border-terracotta'
              : 'border-gray-200 hover:border-gray-300 focus:bg-white'
          } disabled:bg-gray-50 disabled:cursor-not-allowed placeholder:text-gray-400 ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-terracotta flex items-center gap-1">
            <span className="font-medium">{error}</span>
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
