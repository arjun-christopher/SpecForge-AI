import React, { useState } from 'react';
import InputSection from './components/InputSection';
import ResultsDisplay from './components/ResultsDisplay';
import { analyzeFeature } from './services/api';
import { AlertCircle, Github, ExternalLink } from 'lucide-react';

/**
 * Main App Component
 * Orchestrates the AI Requirements Analyzer application.
 */
function App() {
  const [featureDescription, setFeatureDescription] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFeatureDescription(e.target.value);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (featureDescription.trim().length < 10) {
      setError('Please provide a more detailed feature description (minimum 10 characters).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await analyzeFeature(featureDescription);
      setResults(data);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-12">
          <InputSection
            value={featureDescription}
            onChange={handleInputChange}
            onSubmit={handleAnalyze}
            isLoading={isLoading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-5xl mx-auto mb-8 animate-fade-in">
            <div className="card bg-red-900/20 border-red-500/50">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-300 mb-1">Error</h3>
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-5xl mx-auto mb-8 animate-fade-in">
            <div className="card">
              <div className="flex items-center justify-center space-x-3 py-8">
                <div className="loading-shimmer w-full h-2 rounded-full"></div>
              </div>
              <p className="text-center text-dark-300 mt-4">
                Analyzing your feature description with AI...
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {results && !isLoading && (
          <div id="results-section" className="scroll-mt-8">
            <ResultsDisplay results={results} />
          </div>
        )}

        {/* Footer */}
        <footer className="max-w-5xl mx-auto mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-dark-400 text-sm">
                Powered by AI • Built with React & FastAPI
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-dark-400 hover:text-primary-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="/api/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-dark-400 hover:text-primary-400 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="text-sm">API Docs</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
