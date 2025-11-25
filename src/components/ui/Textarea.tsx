import { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-terracotta ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-eucalyptus/20 focus:border-eucalyptus resize-none bg-white placeholder:text-gray-400 ${
            error
              ? 'border-terracotta focus:ring-terracotta/20 focus:border-terracotta'
              : 'border-gray-200 hover:border-gray-300'
          } disabled:bg-gray-50 disabled:cursor-not-allowed ${className}`}
          rows={4}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-terracotta font-medium">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
