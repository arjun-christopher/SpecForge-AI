# Quick Start Guide - AI Requirements Analyzer

## Get Started in 3 Steps

### Step 1: Setup Backend (5 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env
# Edit .env and add your OpenAI API key:
# OPENAI_API_KEY=sk-your-key-here

# Start backend server
uvicorn main:app --reload
```

Backend running at: `http://localhost:8000`  
API Docs at: `http://localhost:8000/api/docs`

### Step 2: Setup Frontend (3 minutes)

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend running at: `http://localhost:5173`

### Step 3: Test the Application

1. Open `http://localhost:5173` in your browser
2. Try an example prompt:
   ```
   Build a login system with JWT, role-based access, email verification, and forgot password.
   ```
3. Click "Generate Requirements"
4. Review the AI-generated specifications!

## Example Prompts to Try

**E-Commerce:**

```
Create an e-commerce product catalog with search, filters, pagination, and shopping cart.
```

**Real-Time Chat:**

```
Develop a real-time chat application with WebSocket support, message history, and file sharing.
```

**Analytics Dashboard:**

```
Build an analytics dashboard with real-time data visualization, custom reports, and data export.
```

See [EXAMPLES.md](EXAMPLES.md) for 30+ more examples!

## Getting Your OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste into `backend/.env`

## Troubleshooting

**Backend won't start:**

- Ensure Python 3.10+ is installed: `python --version`
- Check if virtual environment is activated
- Verify OpenAI API key is set in `.env`

**Frontend won't start:**

- Ensure Node.js 18+ is installed: `node --version`
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

**API connection error:**

- Ensure backend is running on port 8000
- Check CORS configuration in `backend/config.py`
- Verify `VITE_API_URL` in frontend `.env` (if using custom URL)

## Documentation

- [README.md](README.md) - Complete documentation
- [EXAMPLES.md](EXAMPLES.md) - 30+ example prompts
- [STRUCTURE.md](STRUCTURE.md) - Project structure
- API Docs: `http://localhost:8000/api/docs`

## Ready to Deploy?

See deployment instructions in [README.md](README.md#-deployment)

---

**Need Help?** Check the full [README.md](README.md) or open an issue on GitHub.
