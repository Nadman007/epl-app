# EPL Dashboard

A full-stack Premier League dashboard with live scores, standings, top scorers, team fixtures, and player search.

Built with **React + MUI** (frontend) and **Node.js + Express** (backend).

---

## 🚀 How to Run

You need **Node.js** installed (v16+). Download it at https://nodejs.org if you don't have it.

### Step 1 — Install & start the backend

```bash
cd server
npm install
npm start
```

The server will start at **http://localhost:5000**

> ℹ️ By default it runs with **mock data** so everything works without an API key.

### Step 2 — Install & start the frontend (new terminal)

```bash
cd client
npm install
npm start
```

The app will open at **http://localhost:3000**

---

## 🔑 Switching to Live Data (optional)

1. Get a free API key at https://www.football-data.org/client/register
2. In the `server/` folder, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and replace `your_api_key_here` with your real key
4. Restart the server (`npm start`)

---

## 📁 Project Structure

```
epl-app/
├── client/               ← React frontend
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── constants/
│       │   └── teams.js  ← shared team data
│       └── components/
│           ├── Navbar.jsx
│           ├── LeagueTable.jsx
│           ├── LiveMatches.jsx
│           ├── TopScorers.jsx
│           ├── TeamProfile.jsx
│           └── PlayerSearch.jsx
└── server/               ← Express backend
    ├── index.js          ← API routes
    ├── mockData.js       ← mock data (used without API key)
    └── .env.example      ← copy to .env and add your key
```

## 🛠 Tech Stack

- **Frontend**: React 18, MUI v5, Axios
- **Backend**: Node.js, Express, Axios, dotenv, cors
- **API**: football-data.org (free tier)
