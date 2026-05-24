# 🐾 PawsHome — Pet Adoption Platform (Client)

![PawsHome Banner](https://capsule-render.vercel.app/api?type=waving&color=f97316&height=200&section=header&text=PawsHome&fontSize=60&fontColor=ffffff&fontAlignY=35&desc=Find+Your+Forever+Friend&descAlignY=55&descSize=20)

## 📌 Project Overview

**PawsHome** is a full-stack pet adoption platform where users can browse pets available for adoption, view detailed profiles, and submit adoption requests — while pet owners can manage listings and handle incoming requests.

## 🌐 Live URL

> **[https://pawshome.vercel.app](https://pawshome.vercel.app)**

## ✨ Features

- 🔐 **Firebase Authentication** — Email/password + Google login with JWT (HTTPOnly cookies)
- 🐕 **Browse All Pets** — Search by name, filter by species, sort by price/name/newest
- 📋 **Adoption Requests** — Submit, track, approve, and reject adoption requests
- 🏠 **Owner Dashboard** — Add, edit, delete pet listings; manage incoming requests
- 🌙 **Dark / Light Theme** — Persistent theme toggle across sessions
- 🎞️ **Framer Motion Animations** — Smooth page transitions and micro-interactions
- 📱 **Fully Responsive** — Mobile, tablet, and desktop optimized
- 🔒 **Protected Routes** — Private routes with JWT + cookie-based auth persistence
- 🚫 **Adoption Control** — Owners cannot adopt own pets; one approval locks the pet
- 🍞 **Toast Notifications** — No default alert(); all feedback via react-hot-toast

## 📦 NPM Packages Used

| Package | Purpose |
|---|---|
| `react-router-dom` | Client-side routing |
| `@tanstack/react-query` | Server state & data fetching |
| `axios` | HTTP client with credentials |
| `firebase` | Authentication (Email + Google) |
| `framer-motion` | Animations and transitions |
| `react-hot-toast` | Toast notifications |
| `react-icons` | Icon library |
| `tailwindcss` | Utility-first CSS framework |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Safin313-stack/pawshome-client

# Install dependencies
cd pawshome-client
npm install

# Setup environment variables
cp .env.example .env
# Fill in your Firebase and API values

# Start development server
npm run dev
```

## 🗂️ Project Structure

```
src/
├── components/
│   ├── shared/         # Navbar, Footer, Layouts, LoadingSpinner
│   └── pets/           # PetCard
├── context/            # AuthContext, ThemeContext
├── pages/
│   ├── main/           # Home, AllPets, PetDetails, Login, Register, MyRequests, NotFound
│   └── dashboard/      # AddPet, MyListings, UpdatePet
├── routes/             # PrivateRoute
└── utils/              # axios instance
```

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| State | TanStack Query v5 |
| Auth | Firebase v10 |
| Animation | Framer Motion v11 |
| HTTP | Axios |

---

> Built with ❤️ by [Safin](https://www.linkedin.com/in/saharia-hassan-safin/) · Inspired by TCW - AI & Coding Resources
