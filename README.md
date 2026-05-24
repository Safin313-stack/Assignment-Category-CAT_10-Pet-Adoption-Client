![header](https://capsule-render.vercel.app/api?type=waving&color=f97316&height=220&section=header&text=PawsHome%20🐾&fontSize=70&fontColor=ffffff&fontAlignY=38&desc=Pet%20Adoption%20Platform%20|%20MERN%20Stack&descAlignY=58&descSize=22&animation=fadeIn)

<div align="center">

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-PawsHome-f97316?style=for-the-badge)](https://assignment-category-cat-10-pet-adop.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)

</div>

---

## 📌 Project Purpose

**PawsHome** is a full-stack Pet Adoption Platform where users can browse pets available for adoption, view detailed profiles, and submit adoption requests — while pet owners can manage listings and handle incoming requests with full CRUD operations.

This project reflects a real-world pet adoption portal built with the **MERN Stack** + Firebase Authentication + JWT security.

---

## 🌐 Live URL

> ### 🔗 [https://assignment-category-cat-10-pet-adop.vercel.app/)

---

## ✨ Features

- 🔐 **Firebase Authentication** — Email/password + Google login with JWT (HTTPOnly cookies)
- 🐕 **Browse All Pets** — Search by name, filter by species using MongoDB `$regex` & `$in`
- 📋 **Adoption Request System** — Submit, track, approve, and reject adoption requests
- 🏠 **Owner Dashboard** — Add, edit, delete pet listings; manage incoming requests with modal
- 🌙 **Dark / Light Theme** — Persistent theme toggle using localStorage
- 🎞️ **Framer Motion Animations** — Smooth page transitions and floating animations
- 📱 **Fully Responsive** — Mobile, tablet, and desktop optimized layout
- 🔒 **Protected Routes** — Private routes with JWT + cookie-based auth persistence on reload
- 🚫 **Adoption Control** — Owners cannot adopt own pets; one approval auto-rejects others & locks pet
- 🍞 **Toast Notifications** — No default `alert()`; all feedback via `react-hot-toast`

---

## 📦 NPM Packages Used

| Package | Purpose |
|---|---|
| `react-router-dom` | Client-side routing & navigation |
| `@tanstack/react-query` | Server state management & data fetching |
| `axios` | HTTP client with credentials support |
| `firebase` | Authentication (Email/Password + Google) |
| `framer-motion` | Animations and page transitions |
| `react-hot-toast` | Beautiful toast notifications |
| `react-icons` | Icon library (Fi, Fa icons) |
| `tailwindcss` | Utility-first CSS framework |

---

## 🗂️ Project Structure

```
src/
├── components/
│   ├── shared/
│   │   ├── Navbar.jsx          # Sticky navbar with theme toggle & dropdown
│   │   ├── Footer.jsx          # Footer with links & contact info
│   │   ├── MainLayout.jsx      # Main layout wrapper
│   │   ├── DashboardLayout.jsx # Dashboard sidebar layout
│   │   └── LoadingSpinner.jsx  # Loading spinner component
│   └── pets/
│       └── PetCard.jsx         # Reusable pet card component
├── context/
│   ├── AuthContext.jsx         # Firebase auth context & JWT
│   └── ThemeContext.jsx        # Dark/light theme context
├── pages/
│   ├── main/
│   │   ├── Home.jsx            # Hero + Featured Pets + Sections
│   │   ├── AllPets.jsx         # All pets with search/filter/sort
│   │   ├── PetDetails.jsx      # Pet info + adoption form
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Register with validation
│   │   ├── MyRequests.jsx      # User's adoption requests
│   │   └── NotFound.jsx        # Custom 404 page
│   └── dashboard/
│       ├── AddPet.jsx          # Add new pet form
│       ├── MyListings.jsx      # Owner's listings + requests modal
│       └── UpdatePet.jsx       # Edit pet listing
├── routes/
│   └── PrivateRoute.jsx        # JWT protected route wrapper
└── utils/
    └── axios.js                # Axios instance with credentials
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Server State | TanStack Query v5 |
| Authentication | Firebase v10 |
| Animation | Framer Motion v11 |
| HTTP Client | Axios |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Auth Security | JWT + HTTPOnly Cookies |

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/Safin313-stack/Assignment-Category-CAT_10-Pet-Adoption-Platform-.git

# Go into the folder
cd Assignment-Category-CAT_10-Pet-Adoption-Platform-

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your Firebase config and API URL

# Start development server
npm run dev
```

---

## 🔐 Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

<div align="center">

## 👨‍💻 Developer

**Saharia Hassan Safin**
CSE Student | Daffodil International University
Associate Member — DIU Competitive Programming Club

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/saharia-hassan-safin/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/Safin313-stack)

---

*Built with ❤️ | Inspired by TCW — AI & Coding Resources*

</div>

![footer](https://capsule-render.vercel.app/api?type=waving&color=f97316&height=120&section=footer&animation=fadeIn)
