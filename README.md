# Simple Multiplayer Jack-En-Poy (Rock-Paper-Scissors)

A modern, AI-powered Rock-Paper-Scissors game built with React, TensorFlow.js (MediaPipe), and Node.js (Express) with Supabase integration.

## 🚀 Features

*   **AI Hand Gesture Detection**: Uses TensorFlow.js and MediaPipe to detect Rock, Paper, or Scissors gestures in real-time via your webcam.
*   **Multiplayer Mechanics**: "Play" against an opponent (whose moves are stored in a database) by choosing a team (Red vs. Blue).
*   **Mobile Responsive**: Optimized UI for both desktop and mobile devices, featuring a seamless stacking layout and hiding unnecessary elements on smaller screens.
*   **Dark Mode UI**: Sleek, modern interface using TailwindCSS.
*   **Backend Integration**: Express.js backend connected to Supabase for persistent game state and result validation.

## 🛠️ Tech Stack

### Frontend (`apps/game`)
*   **Framework**: React (Vite)
*   **Styling**: TailwindCSS
*   **AI/ML**: TensorFlow.js, `@tensorflow-models/hand-pose-detection`, `fingerpose`
*   **Language**: TypeScript

### Backend (`apps/backendexpress`)
*   **Runtime**: Node.js (Express)
*   **Database**: Supabase (PostgreSQL)
*   **Language**: TypeScript

### Monorepo
*   **Tools**: Turborepo, npm workspaces

## 📦 Project Structure

```
├── apps/
│   ├── game/               # Frontend application
│   └── backendexpress/     # Backend API
├── packages/               # Shared packages (if any)
└── turbo.json              # Turborepo configuration
```

## ⚡ Getting Started

### Prerequisites
*   Node.js (v18+ recommended)
*   npm

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Setup

1.  **Backend**: Create `apps/backendexpress/.env`:
    ```env
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_anon_key
    ```

2.  **Frontend** (Optional for local dev, needed for prod): Create `apps/game/.env` or `.env.production`:
    ```env
    VITE_API_URL=http://localhost:3500 # or your deployed backend URL
    ```

### Running Locally

To run both the frontend and backend simultaneously:

```bash
npm run dev
# OR with Turbo
npx turbo dev
```

*   Frontend: `http://localhost:5173`
*   Backend: `http://localhost:3500`

## 🚢 Deployment

Detailed deployment instructions for Vercel are available in `.agent/workflows/deploy_to_vercel.md`.

Generally:
1.  Deploy `apps/backendexpress` to Vercel (add Supabase env vars).
2.  Deploy `apps/game` to Vercel (add `VITE_API_URL` env var pointing to backend).

## 📄 License

ISC
