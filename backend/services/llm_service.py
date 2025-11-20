"""
LLM Service for generating structured requirements analysis.
Integrates with OpenAI API to transform natural language into technical specifications.
"""

import json
import logging
from typing import Dict, Any
from openai import OpenAI
from config import settings

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class LLMService:
    """Service for interacting with Large Language Models."""
    
    def __init__(self):
        """Initialize the LLM service with OpenAI client."""
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.OPENAI_MODEL
        
    def _build_system_prompt(self) -> str:
        """
        Build the system prompt that instructs the LLM on output format.
        
        Returns:
            str: Comprehensive system prompt for structured output generation
        """
        return """You are an expert software architect and technical analyst. Your task is to analyze natural language feature descriptions and generate comprehensive, structured technical specifications.

You must respond with ONLY a valid JSON object (no markdown, no code blocks, just raw JSON) following this exact structure:

{
  "requirements": [
    {
      "id": "REQ-001",
      "category": "Functional|Non-functional|Security|Performance",
      "description": "Clear, specific requirement description",
      "priority": "High|Medium|Low"
    }
  ],
  "api_design": [
    {
      "method": "GET|POST|PUT|DELETE|PATCH",
      "path": "/api/resource/endpoint",
      "description": "What this endpoint does",
      "request_body": {"field": "type description"},
      "response": {"field": "type description"},
      "authentication": true|false
    }
  ],
  "database_schema": [
    {
      "table_name": "table_name",
      "columns": [
        {
          "name": "column_name",
          "type": "SQL_TYPE",
          "constraints": "PRIMARY KEY|NOT NULL|UNIQUE|etc"
        }
      ],
      "indexes": ["idx_table_column"],
      "relationships": ["FOREIGN KEY references"]
    }
  ],
  "database_schema_sql": "Complete SQL CREATE TABLE statements with all constraints, indexes, and relationships",
  "sprint_tasks": [
    {
      "task_id": "TASK-001",
      "title": "Task title",
      "description": "Detailed task description",
      "story_points": 1-13,
      "dependencies": ["TASK-XXX"],
      "sprint": 1|2|3
    }
  ]
}

Guidelines:
1. Generate comprehensive requirements covering functional, non-functional, security, and performance aspects
2. Design RESTful API endpoints following best practices
3. Create normalized database schemas with proper relationships and constraints
4. Generate production-ready SQL with appropriate data types, indexes, and foreign keys
5. Break down work into logical sprint tasks (typically 2-3 sprints)
6. Ensure task dependencies are properly identified
7. Use realistic story point estimates (Fibonacci: 1, 2, 3, 5, 8, 13)
8. Be thorough and production-ready in your analysis

Remember: Output ONLY the JSON object, nothing else."""

    def _build_user_prompt(self, feature_description: str) -> str:
        """
        Build the user prompt with the feature description.
        
        Args:
            feature_description: Natural language feature description
            
        Returns:
            str: Formatted user prompt
        """
        return f"""Analyze this feature and generate comprehensive technical specifications:

Feature Description:
{feature_description}

Provide a complete analysis including requirements, API design, database schema with SQL, and sprint tasks."""

    def analyze_feature(self, feature_description: str) -> Dict[str, Any]:
        """
        Analyze a feature description and generate structured specifications.
        
        Args:
            feature_description: Natural language description of the feature
            
        Returns:
            Dict containing requirements, API design, database schema, and sprint tasks
            
        Raises:
            ValueError: If the LLM response cannot be parsed
            Exception: If the API call fails
        """
        try:
            logger.info(f"Analyzing feature: {feature_description[:100]}...")
            
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": self._build_system_prompt()},
                    {"role": "user", "content": self._build_user_prompt(feature_description)}
                ],
                temperature=settings.TEMPERATURE,
                max_tokens=settings.MAX_TOKENS,
                response_format={"type": "json_object"}  # Ensure JSON response
            )
            
            # Extract and parse the response
            content = response.choices[0].message.content
            logger.info("Successfully received LLM response")
            
            # Parse JSON response
            try:
                result = json.loads(content)
                logger.info("Successfully parsed JSON response")
                return result
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON response: {e}")
                logger.error(f"Response content: {content}")
                raise ValueError(f"Invalid JSON response from LLM: {str(e)}")
                
        except Exception as e:
            logger.error(f"Error calling LLM API: {str(e)}")
            raise Exception(f"Failed to analyze feature: {str(e)}")
    
    def validate_response(self, response: Dict[str, Any]) -> bool:
        """
        Validate that the LLM response contains all required fields.
        
        Args:
            response: Parsed JSON response from LLM
            
        Returns:
            bool: True if valid, raises ValueError otherwise
        """
        required_fields = ["requirements", "api_design", "database_schema", 
                          "database_schema_sql", "sprint_tasks"]
        
        for field in required_fields:
            if field not in response:
                raise ValueError(f"Missing required field: {field}")
        
        # Validate that lists are not empty
        if not response["requirements"]:
            raise ValueError("Requirements list cannot be empty")
        if not response["api_design"]:
            raise ValueError("API design list cannot be empty")
        if not response["sprint_tasks"]:
            raise ValueError("Sprint tasks list cannot be empty")
            
        return True


# Global service instance
llm_service = LLMService()
