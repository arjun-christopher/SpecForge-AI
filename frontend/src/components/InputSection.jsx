import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * InputSection Component
 * Handles user input for feature descriptions with a premium UI design.
 * 
 * @param {Object} props - Component props
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Input change handler
 * @param {Function} props.onSubmit - Form submission handler
 * @param {boolean} props.isLoading - Loading state
 */
export default function InputSection({ value, onChange, onSubmit, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit();
    }
  };

  const examplePrompts = [
    "Build a login system with JWT, role-based access, email verification, and forgot password.",
    "Create a real-time chat application with WebSocket support, message history, and file sharing.",
    "Develop an e-commerce product catalog with search, filters, pagination, and shopping cart.",
  ];

  const handleExampleClick = (example) => {
    onChange({ target: { value: example } });
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 mb-4 shadow-lg shadow-primary-500/50">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="section-title mb-3">
          AI Requirements Analyzer
        </h1>
        <p className="text-dark-300 text-lg max-w-2xl mx-auto">
          Transform your feature ideas into comprehensive technical specifications with AI-powered analysis
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label htmlFor="feature-input" className="block text-sm font-semibold text-dark-200 mb-2">
            Feature Description
          </label>
          <textarea
            id="feature-input"
            value={value}
            onChange={onChange}
            placeholder="Describe your feature in natural language... (e.g., 'Build a user authentication system with OAuth, 2FA, and session management')"
            rows={6}
            className="textarea-field custom-scrollbar"
            disabled={isLoading}
          />
          <p className="text-xs text-dark-400 mt-2">
            Minimum 10 characters • Be as detailed as possible for better results
          </p>
        </div>

        {/* Example Prompts */}
        <div>
          <p className="text-sm font-semibold text-dark-200 mb-3">Try an example:</p>
          <div className="grid grid-cols-1 gap-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="text-left px-4 py-2 glass-hover rounded-lg text-sm text-dark-300 hover:text-primary-300 transition-colors duration-200"
                disabled={isLoading}
              >
                <span className="text-primary-400 mr-2">→</span>
                {example}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || value.trim().length < 10}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Requirements
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
