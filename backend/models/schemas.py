"""
Pydantic models for request/response validation.
Defines the structure of API inputs and outputs.
"""

from typing import List, Optional
from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    """Request model for feature analysis."""
    
    feature_description: str = Field(
        ...,
        min_length=10,
        max_length=5000,
        description="Natural language description of the feature to analyze",
        example="Build a login system with JWT, role-based access, email verification, and forgot password."
    )


class Requirement(BaseModel):
    """Individual requirement item."""
    
    id: str = Field(..., description="Unique requirement identifier")
    category: str = Field(..., description="Requirement category (e.g., Functional, Non-functional)")
    description: str = Field(..., description="Detailed requirement description")
    priority: str = Field(..., description="Priority level (High, Medium, Low)")


class APIEndpoint(BaseModel):
    """API endpoint specification."""
    
    method: str = Field(..., description="HTTP method (GET, POST, PUT, DELETE, etc.)")
    path: str = Field(..., description="API endpoint path")
    description: str = Field(..., description="Endpoint purpose and functionality")
    request_body: Optional[dict] = Field(None, description="Expected request body structure")
    response: Optional[dict] = Field(None, description="Expected response structure")
    authentication: bool = Field(default=False, description="Whether authentication is required")


class DatabaseTable(BaseModel):
    """Database table specification."""
    
    table_name: str = Field(..., description="Name of the database table")
    columns: List[dict] = Field(..., description="List of column definitions")
    indexes: Optional[List[str]] = Field(None, description="Database indexes")
    relationships: Optional[List[str]] = Field(None, description="Foreign key relationships")


class SprintTask(BaseModel):
    """Sprint task item."""
    
    task_id: str = Field(..., description="Unique task identifier")
    title: str = Field(..., description="Task title")
    description: str = Field(..., description="Detailed task description")
    story_points: int = Field(..., ge=1, le=13, description="Estimated story points (1-13)")
    dependencies: Optional[List[str]] = Field(None, description="Task dependencies")
    sprint: int = Field(..., description="Sprint number")


class AnalyzeResponse(BaseModel):
    """Response model containing structured analysis results."""
    
    requirements: List[Requirement] = Field(..., description="List of identified requirements")
    api_design: List[APIEndpoint] = Field(..., description="API endpoint specifications")
    database_schema: List[DatabaseTable] = Field(..., description="Database table definitions")
    database_schema_sql: str = Field(..., description="Complete SQL schema creation script")
    sprint_tasks: List[SprintTask] = Field(..., description="Organized sprint tasks")
    
    class Config:
        json_schema_extra = {
            "example": {
                "requirements": [
                    {
                        "id": "REQ-001",
                        "category": "Functional",
                        "description": "User must be able to register with email and password",
                        "priority": "High"
                    }
                ],
                "api_design": [
                    {
                        "method": "POST",
                        "path": "/api/auth/register",
                        "description": "Register a new user",
                        "request_body": {"email": "string", "password": "string"},
                        "response": {"user_id": "string", "token": "string"},
                        "authentication": False
                    }
                ],
                "database_schema": [
                    {
                        "table_name": "users",
                        "columns": [
                            {"name": "id", "type": "UUID", "constraints": "PRIMARY KEY"},
                            {"name": "email", "type": "VARCHAR(255)", "constraints": "UNIQUE NOT NULL"}
                        ],
                        "indexes": ["idx_users_email"],
                        "relationships": []
                    }
                ],
                "database_schema_sql": "CREATE TABLE users (...);",
                "sprint_tasks": [
                    {
                        "task_id": "TASK-001",
                        "title": "Set up user authentication database schema",
                        "description": "Create users table with necessary fields",
                        "story_points": 3,
                        "dependencies": [],
                        "sprint": 1
                    }
                ]
            }
        }


class ErrorResponse(BaseModel):
    """Error response model."""
    
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Detailed error information")
