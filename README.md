# AI Requirements Analyzer

Transform natural language feature descriptions into comprehensive technical specifications using AI-powered analysis.

![AI Requirements Analyzer](https://img.shields.io/badge/AI-Powered-blue) ![React](https://img.shields.io/badge/React-18.3-61dafb) ![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

## Features

- **AI-Powered Analysis**: Leverages GPT-4 to analyze feature descriptions
- **Comprehensive Output**: Generates requirements, API design, database schema, and sprint tasks
- **Premium UI**: Modern, responsive interface with glassmorphism and smooth animations
- **Structured JSON**: All outputs in well-defined, parseable JSON format
- **Production Ready**: Clean architecture, error handling, and comprehensive validation

## What It Generates

1. **Requirements Breakdown**: Categorized requirements with priorities
2. **API Design**: RESTful endpoint specifications with request/response schemas
3. **Database Schema**: Table definitions with SQL creation scripts
4. **Sprint Tasks**: Organized development tasks with story points and dependencies

## Architecture

```
SpecForge-AI/
├── backend/                 # Python FastAPI backend
│   ├── main.py             # FastAPI application
│   ├── config.py           # Configuration management
│   ├── models/
│   │   └── schemas.py      # Pydantic models
│   └── services/
│       └── llm_service.py  # OpenAI integration
│
└── frontend/               # React frontend
    ├── src/
    │   ├── App.jsx         # Main application
    │   ├── components/
    │   │   ├── InputSection.jsx
    │   │   └── ResultsDisplay.jsx
    │   ├── services/
    │   │   └── api.js      # API client
    │   └── index.css       # TailwindCSS styles
    └── package.json
```

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- OpenAI API key

### Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd backend
   ```

2. **Create virtual environment**:

   ```bash
   python -m venv venv

   # Windows
   venv\Scripts\activate

   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:

   ```bash
   # Copy the example file
   copy .env.example .env

   # Edit .env and add your OpenAI API key
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4-turbo-preview
   ```

5. **Run the backend**:

   ```bash
   uvicorn main:app --reload
   ```

   Backend will be available at `http://localhost:8000`

   API documentation: `http://localhost:8000/api/docs`

### Frontend Setup

1. **Navigate to frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment** (optional):

   ```bash
   # Copy the example file
   copy .env.example .env

   # Edit if needed (default points to localhost:8000)
   VITE_API_URL=http://localhost:8000
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   Frontend will be available at `http://localhost:5173`

## Usage

1. **Open the application** in your browser (`http://localhost:5173`)

2. **Enter a feature description** in natural language, for example:

   - "Build a login system with JWT, role-based access, email verification, and forgot password."
   - "Create a real-time chat application with WebSocket support, message history, and file sharing."
   - "Develop an e-commerce product catalog with search, filters, pagination, and shopping cart."

3. **Click "Generate Requirements"** and wait for the AI analysis

4. **Review the results** in expandable sections:

   - Requirements breakdown with priorities
   - API endpoint specifications
   - Database schema with SQL
   - Sprint tasks organized by sprint

5. **Copy SQL schema** using the copy button for immediate use

## Example Prompts

See [EXAMPLES.md](EXAMPLES.md) for a comprehensive list of example prompts you can try.

## API Documentation

### POST `/api/analyze`

Analyze a feature description and generate technical specifications.

**Request Body**:

```json
{
  "feature_description": "Your feature description here"
}
```

**Response**:

```json
{
  "requirements": [...],
  "api_design": [...],
  "database_schema": [...],
  "database_schema_sql": "CREATE TABLE ...",
  "sprint_tasks": [...]
}
```

**Error Responses**:

- `400 Bad Request`: Invalid input or validation error
- `500 Internal Server Error`: Server or LLM API error

### GET `/api/health`

Check backend health status.

**Response**:

```json
{
  "status": "healthy",
  "model": "gpt-4-turbo-preview",
  "api_configured": true
}
```

## Deployment

### Frontend (Vercel)

1. **Push your code to GitHub**

2. **Import project in Vercel**:

   - Connect your GitHub repository
   - Set root directory to `frontend`
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Add environment variable**:

   - `VITE_API_URL`: Your backend URL

4. **Deploy**

### Backend (Railway/Render/AWS)

#### Railway:

1. **Create new project** in Railway
2. **Add Python service**
3. **Set root directory** to `backend`
4. **Add environment variables**:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
5. **Deploy**

#### Render:

1. **Create new Web Service**
2. **Connect repository**
3. **Configure**:
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. **Add environment variables**
5. **Deploy**

## Tech Stack

### Backend

- **FastAPI**: Modern Python web framework
- **OpenAI API**: GPT-4 for AI analysis
- **Pydantic**: Data validation
- **Uvicorn**: ASGI server

### Frontend

- **React 18**: UI library
- **Vite**: Build tool
- **TailwindCSS**: Utility-first CSS
- **Lucide React**: Icon library

## Configuration

### Backend Environment Variables

| Variable         | Description               | Default               |
| ---------------- | ------------------------- | --------------------- |
| `OPENAI_API_KEY` | OpenAI API key (required) | -                     |
| `OPENAI_MODEL`   | OpenAI model to use       | `gpt-4-turbo-preview` |

### Frontend Environment Variables

| Variable       | Description     | Default                 |
| -------------- | --------------- | ----------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:8000` |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with OpenAI's GPT-4
- UI inspired by modern design principles
- Icons by Lucide

## Support

For issues or questions, please open an issue on GitHub.
