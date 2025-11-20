"""
FastAPI backend for AI Requirements Analyzer.
Main application entry point with API routes and middleware configuration.
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from config import settings
from models.schemas import AnalyzeRequest, AnalyzeResponse, ErrorResponse
from services.llm_service import llm_service

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI application
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description=settings.API_DESCRIPTION,
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Validate configuration on startup."""
    try:
        settings.validate()
        logger.info("Application started successfully")
        logger.info(f"Using OpenAI model: {settings.OPENAI_MODEL}")
    except ValueError as e:
        logger.error(f"Configuration error: {str(e)}")
        raise


@app.get("/", tags=["Health"])
async def root():
    """
    Root endpoint - API health check.
    
    Returns:
        dict: API status and version information
    """
    return {
        "status": "healthy",
        "service": settings.API_TITLE,
        "version": settings.API_VERSION,
        "docs": "/api/docs"
    }


@app.get("/api/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for monitoring.
    
    Returns:
        dict: Detailed health status
    """
    return {
        "status": "healthy",
        "model": settings.OPENAI_MODEL,
        "api_configured": bool(settings.OPENAI_API_KEY)
    }


@app.post(
    "/api/analyze",
    response_model=AnalyzeResponse,
    responses={
        200: {"description": "Successful analysis"},
        400: {"model": ErrorResponse, "description": "Invalid request"},
        500: {"model": ErrorResponse, "description": "Server error"}
    },
    tags=["Analysis"]
)
async def analyze_feature(request: AnalyzeRequest):
    """
    Analyze a feature description and generate structured technical specifications.
    
    This endpoint takes a natural language feature description and uses AI to generate:
    - Detailed requirements breakdown
    - RESTful API design
    - Database schema with SQL
    - Sprint tasks with estimates
    
    Args:
        request: AnalyzeRequest containing the feature description
        
    Returns:
        AnalyzeResponse: Structured analysis results
        
    Raises:
        HTTPException: If analysis fails or validation errors occur
    """
    try:
        logger.info(f"Received analysis request for feature: {request.feature_description[:100]}...")
        
        # Call LLM service to analyze the feature
        result = llm_service.analyze_feature(request.feature_description)
        
        # Validate the response structure
        llm_service.validate_response(result)
        
        logger.info("Analysis completed successfully")
        
        # Return structured response
        return AnalyzeResponse(**result)
        
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Analysis error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze feature: {str(e)}"
        )


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """
    Global exception handler for unhandled errors.
    
    Args:
        request: The request that caused the error
        exc: The exception that was raised
        
    Returns:
        JSONResponse: Error response
    """
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"error": "Internal server error", "detail": str(exc)}
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
