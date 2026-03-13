## Automated Depression Detection System

Full-stack, production-ready depression detection platform using React (Vite), Tailwind CSS, Node.js, Express, MongoDB Atlas, and external Python ML APIs for text, voice, and image analysis.

### Project structure

- `backend` – Node/Express API, MongoDB, JWT auth, ML API integration, production static serving
- `frontend` – React + Vite + Tailwind SPA (auth, dashboard, three tests, history)

### Backend setup

1. Copy `backend/.env.example` to `backend/.env` and fill in real values:
   - **Required**:
     - `PORT=5000`
     - `NODE_ENV=development` (change to `production` on Render)
     - `MONGO_URI` – your MongoDB Atlas URI
     - `JWT_SECRET` – strong random string (or `JWT_SECRET_KEY` if you prefer your existing secret name)
     - `CLIENT_URL` – your frontend URL (`http://localhost:5173` in dev, Vercel/Render URL in prod)
     - `PYTHON_TEXT_API=https://emotion-detection-system-api.onrender.com/emotion_text`
     - `PYTHON_VOICE_API=https://emotion-detection-system-api.onrender.com/emotion_voice`
     - `PYTHON_IMAGE_API=https://emotion-detection-system-api.onrender.com/emotion_image`

2. Install and run backend:

```bash
cd backend
npm install
npm run dev
```

### Frontend setup

1. Create `frontend/.env.development` (optional but recommended):

```bash
VITE_API_URL=http://localhost:5000/api
```

2. Install and run frontend:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

### Deployment (Render + Vercel or single Render)

- **Backend on Render**:
  - Root directory: `backend`
  - Build command: `npm install`
  - Start command: `npm start`
  - Environment:
    - `NODE_ENV=production`
    - Same env as local `.env` (MONGO_URI, JWT_SECRET, CLIENT_URL, PYTHON_*_API)
  - The backend is configured to serve the built React app from `../frontend/dist` when `NODE_ENV=production`, if that folder exists in the deployed environment.

- **Frontend on Vercel**:
  - Root directory: `frontend`
  - Build command: `npm install && npm run build`
  - Output directory: `dist`
  - Environment:
    - `VITE_API_URL=https://your-backend-domain.onrender.com/api`

Alternatively, you can use a single Render service if you ensure the `frontend` build runs before `backend` starts (the backend `postinstall` script already attempts `cd ../frontend && npm install && npm run build`).


