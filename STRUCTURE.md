# Project Structure

Complete folder structure for the AI Requirements Analyzer application.

```
SpecForge-AI/
│
├── backend/                          # Python FastAPI Backend
│   ├── models/                       # Data models
│   │   ├── __init__.py
│   │   └── schemas.py               # Pydantic models for validation
│   │
│   ├── services/                     # Business logic
│   │   ├── __init__.py
│   │   └── llm_service.py           # OpenAI integration service
│   │
│   ├── main.py                       # FastAPI application entry point
│   ├── config.py                     # Configuration management
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Environment variable template
│   └── .gitignore                    # Git ignore rules
│
├── frontend/                         # React Frontend
│   ├── public/                       # Static assets
│   │   └── vite.svg
│   │
│   ├── src/                          # Source code
│   │   ├── components/               # React components
│   │   │   ├── InputSection.jsx     # Feature input component
│   │   │   └── ResultsDisplay.jsx   # Results display component
│   │   │
│   │   ├── services/                 # API services
│   │   │   └── api.js               # Backend API client
│   │   │
│   │   ├── App.jsx                   # Main application component
│   │   ├── main.jsx                  # Application entry point
│   │   └── index.css                 # TailwindCSS styles
│   │
│   ├── index.html                    # HTML template
│   ├── package.json                  # Node dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # TailwindCSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   ├── vercel.json                  # Vercel deployment config
│   ├── .env.example                 # Environment variable template
│   └── .gitignore                   # Git ignore rules
│
├── README.md                         # Main documentation
├── EXAMPLES.md                       # Example prompts
└── STRUCTURE.md                      # This file
```

## File Descriptions

### Backend Files

| File                      | Purpose                                                         |
| ------------------------- | --------------------------------------------------------------- |
| `main.py`                 | FastAPI application with routes, middleware, and error handling |
| `config.py`               | Environment variable management and application settings        |
| `models/schemas.py`       | Pydantic models for request/response validation                 |
| `services/llm_service.py` | OpenAI API integration and prompt engineering                   |
| `requirements.txt`        | Python package dependencies                                     |
| `.env.example`            | Template for environment variables                              |

### Frontend Files

| File                                | Purpose                                          |
| ----------------------------------- | ------------------------------------------------ |
| `src/App.jsx`                       | Main application component with state management |
| `src/components/InputSection.jsx`   | Feature description input form                   |
| `src/components/ResultsDisplay.jsx` | Results visualization with expandable sections   |
| `src/services/api.js`               | API client for backend communication             |
| `src/index.css`                     | TailwindCSS configuration and custom styles      |
| `vite.config.js`                    | Vite build configuration                         |
| `tailwind.config.js`                | TailwindCSS theme customization                  |
| `vercel.json`                       | Vercel deployment configuration                  |

## Key Technologies

### Backend Stack

- **FastAPI**: Modern Python web framework
- **Pydantic**: Data validation using Python type hints
- **OpenAI API**: GPT-4 integration
- **Uvicorn**: ASGI server for FastAPI
- **python-dotenv**: Environment variable management

### Frontend Stack

- **React 18**: Component-based UI library
- **Vite**: Next-generation frontend build tool
- **TailwindCSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Native Fetch API**: HTTP client for API calls

## Design Patterns

### Backend Architecture

- **Service Layer Pattern**: Business logic separated in services
- **Repository Pattern**: Data models in dedicated modules
- **Configuration Management**: Centralized config with validation
- **Error Handling**: Global exception handlers and custom errors

### Frontend Architecture

- **Component-Based**: Reusable React components
- **Service Layer**: API calls abstracted in service modules
- **State Management**: React hooks for local state
- **Responsive Design**: Mobile-first approach with TailwindCSS

## Environment Variables

### Backend (.env)

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

## Development Workflow

1. **Start Backend**: `cd backend && uvicorn main:app --reload`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Access Application**: `http://localhost:5173`
4. **API Documentation**: `http://localhost:8000/api/docs`

## Production Build

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run build
# Output in dist/ directory
```

## Deployment Structure

```
Production Environment
│
├── Frontend (Vercel)
│   ├── Static files served via CDN
│   └── Environment: VITE_API_URL → Backend URL
│
└── Backend (Railway/Render/AWS)
    ├── FastAPI application
    └── Environment: OPENAI_API_KEY, OPENAI_MODEL
```
