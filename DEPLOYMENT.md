# Deployment Guide

This guide provides step-by-step instructions for deploying the SpecForge-AI application.

## Architecture Overview

The application consists of two parts that need to be deployed:

1. **Frontend**: A React application (Vite)
2. **Backend**: A Python FastAPI application

You can deploy these components separately or together depending on your preferred hosting provider.

---

## Option 1: Full Stack Deployment on Vercel (Recommended)

Vercel supports deploying both the frontend and the Python backend (as serverless functions) in a single project or as separate projects.

### Prerequisites

- A [Vercel](https://vercel.com) account
- [Vercel CLI](https://vercel.com/docs/cli) installed (optional, but helpful)
- Your project pushed to a GitHub repository

### 1. Prepare the Backend

Ensure the `backend/vercel.json` file exists with the following content (I will create this for you):

```json
{
  "builds": [
    {
      "src": "main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "main.py"
    }
  ]
}
```

### 2. Deploying via Vercel Dashboard

1.  Go to your Vercel Dashboard and click **"Add New..."** -> **"Project"**.
2.  Import your GitHub repository.
3.  **Configure Project**:

    - **Framework Preset**: Vite (it should detect this automatically for the frontend).
    - **Root Directory**: You might need to deploy frontend and backend as separate projects for easiest configuration, OR use a monorepo setup.

    **Easier Approach: Separate Deployments**

    **Frontend Deployment:**

    1.  Import the repo.
    2.  Edit **Root Directory** to `frontend`.
    3.  Add Environment Variables:
        - `VITE_API_URL`: The URL of your deployed backend (you'll get this after deploying the backend, so you might need to redeploy the frontend later).
    4.  Click **Deploy**.

    **Backend Deployment:**

    1.  Import the repo again (create a new project in Vercel).
    2.  Edit **Root Directory** to `backend`.
    3.  Add Environment Variables:
        - `GEMINI_API_KEY`: Your Google Gemini API Key.
        - `GEMINI_MODEL`: `gemini-2.5-flash`
    4.  Click **Deploy**.
    5.  Copy the domain assigned to this deployment (e.g., `https://your-backend.vercel.app`).
    6.  Go back to your **Frontend** project settings -> Environment Variables, and update `VITE_API_URL` with this domain. Redeploy the frontend.

---

## Option 2: Frontend on Vercel, Backend on Railway

This is often more robust for Python backends as it allows for a persistent server rather than serverless functions.

### 1. Deploy Backend to Railway

1.  Sign up at [Railway.app](https://railway.app).
2.  Click **"New Project"** -> **"Deploy from GitHub repo"**.
3.  Select your repository.
4.  Click **"Variables"** and add:
    - `GEMINI_API_KEY`: Your API key.
    - `GEMINI_MODEL`: `gemini-2.5-flash`
    - `PORT`: `8000` (Railway usually handles this, but good to be explicit if needed).
5.  Click **"Settings"** -> **"Generate Domain"** to get your backend URL (e.g., `https://specforge-production.up.railway.app`).
6.  **Root Directory**: Set this to `backend` in the service settings if it didn't detect it automatically.
7.  **Build Command**: `pip install -r requirements.txt`
8.  **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### 2. Deploy Frontend to Vercel

1.  Go to Vercel Dashboard -> **"Add New..."** -> **"Project"**.
2.  Import your repository.
3.  Set **Root Directory** to `frontend`.
4.  Add Environment Variable:
    - `VITE_API_URL`: The Railway URL you generated above (e.g., `https://specforge-production.up.railway.app`).
5.  Click **Deploy**.

---

## Troubleshooting

### CORS Issues

If you see CORS errors in the browser console:

1.  Check your backend `main.py`. Ensure `CORSMiddleware` is configured to allow requests from your frontend domain.
2.  For development, allowing `["*"]` is fine, but for production, you should add your Vercel frontend domain to the `allow_origins` list in `backend/main.py`.

```python
origins = [
    "http://localhost:5173",
    "https://your-frontend-app.vercel.app" # Add your Vercel domain here
]
```

### "API Key not valid"

Ensure you have copied your `GEMINI_API_KEY` correctly into the environment variables of your hosting provider. Do not wrap it in quotes.
