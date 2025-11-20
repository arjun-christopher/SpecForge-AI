/**
 * API Service for communicating with the backend.
 * Handles all HTTP requests and error handling.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Analyze a feature description using the AI backend.
 * 
 * @param {string} featureDescription - Natural language feature description
 * @returns {Promise<Object>} - Structured analysis results
 * @throws {Error} - If the API request fails
 */
export async function analyzeFeature(featureDescription) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feature_description: featureDescription,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Provide user-friendly error messages
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the server. Please ensure the backend is running.');
    }
    
    throw error;
  }
}

/**
 * Check the health status of the backend API.
 * 
 * @returns {Promise<Object>} - Health status information
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
}
