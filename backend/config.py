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
    
    # Google Gemini API Configuration
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    
    # API Configuration
    API_TITLE: str = "AI Requirements Analyzer API"
    API_VERSION: str = "1.0.0"
    API_DESCRIPTION: str = "Transform natural language feature descriptions into structured technical specifications"
    
    # CORS Configuration
    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:5173",
    ]
    CORS_ORIGIN_REGEX: str = r"https://.*\.vercel\.app"
    
    # LLM Configuration
    MAX_TOKENS: int = 8192
    TEMPERATURE: float = 0.7
    
    def validate(self):
        """Validate that required settings are present."""
        if not self.GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        return True


# Global settings instance
settings = Settings()
