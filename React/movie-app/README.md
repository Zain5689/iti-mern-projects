# 🎬 Movie App

A modern movie browsing app built with React, allowing users to explore now-playing movies, search, view details, and manage a wishlist.

## 🚀 Live Demo
[View Live](https://movie-app-5mqm.vercel.app/)

## 📦 Tech Stack
- **React 19** + **Vite**
- **React Router v7** — Routing + Lazy Loading
- **Zustand** — Global State Management
- **Axios** — HTTP Client
- **Tailwind CSS v3** — Styling
- **shadcn/ui** — UI Components
- **Firebase** — Authentication
- **react-i18next** — Internationalization (en, ar, fr, zh)
- **react-hot-toast** — Notifications
- **canvas-confetti** — Animations

## ✨ Features
- 🎥 Browse Now Playing movies
- 🔍 Search with debouncing
- 🎬 Movie Details + Trailer + Recommendations
- ❤️ Wishlist with confetti animation
- 🌙 Dark Mode
- 🌍 Multi-language support (EN, AR, FR, ZH) with RTL
- 🎲 Surprise Me — random movie discovery
- 🎬 Cinematic Spotlight hero section
- 👁️ Floating Movie Preview on hover
- 📄 Pagination + Genre Filtering + Sorting
- 💀 Loading Skeletons
- 🔐 Firebase Authentication

## 👥 The Team

| Teammate | Role | Contributions |
|---|---|---|
| <img src="https://avatars.githubusercontent.com/u/110609863?s=64&v=4" width="50"/> <br> **Safeya** | Data & Auth Lead | Firebase authentication, Login/Register pages, Global state setup (Zustand), Protected routes |
| <img src="https://avatars.githubusercontent.com/u/187319495?s=64&v=4" width="50"/> <br> **Esraa** | Discovery Lead | Home Page, Search functionality, Pagination, Genre Filtering, Movie Sorting |
| <img src="https://avatars.githubusercontent.com/u/111463873?s=64&v=4" width="50"/> <br> **Zainab** | Details Lead | Movie Details page, Recommendations, YouTube Trailer embed, React Router + Lazy Loading |
| <img src="https://avatars.githubusercontent.com/u/147072463?s=64&v=4" width="50"/> <br> **Asalla** | UI/UX Lead | UI components, Responsive Design |
| <img src="https://avatars.githubusercontent.com/u/120438801?s=64&v=4" width="50"/> <br> **Alyaa** | UI/UX Lead | shadcn/ui setup, Dark Mode, i18n + RTL, Loading Skeletons, UI Redesign for all pages, Cinematic Spotlight, Floating Preview, Confetti animation, Surprise Me feature |


## 🛠️ Getting Started

```bash
# Clone the repo
git clone https://github.com/Alyaa-Khalaf/movie-app.git
cd movie-app

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your TMDB API key and Firebase config in .env

# Run the app
npm run dev
```

## 🔑 Environment Variables

```
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

## 📝 API Reference
- [TMDB API Docs](https://developer.themoviedb.org)
- [Firebase Docs](https://firebase.google.com/docs)