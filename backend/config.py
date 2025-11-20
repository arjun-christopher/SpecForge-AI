"""
Configuration management for the AI Requirements Analyzer backend.
Handles environment variables and application settings.
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    """Application settings loaded from environment variables."""
    
    # OpenAI API Configuration
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o")
    
    # API Configuration
    API_TITLE: str = "AI Requirements Analyzer API"
    API_VERSION: str = "1.0.0"
    API_DESCRIPTION: str = "Transform natural language feature descriptions into structured technical specifications"
    
    # CORS Configuration
    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://*.vercel.app",
        "*"  # Allow all origins in development (restrict in production)
    ]
    
    # LLM Configuration
    MAX_TOKENS: int = 4000
    TEMPERATURE: float = 0.7
    
    def validate(self):
        """Validate that required settings are present."""
        if not self.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY environment variable is required")
        return True


# Global settings instance
settings = Settings()
