# Real Estate Frontend

Frontend aplikasi Real Estate menggunakan **React + Vite** dengan **Tailwind CSS**.

## 🚀 Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.0
- **Routing**: React Router 7.10.1
- **HTTP Client**: Axios 2.32.5

## 📋 Prerequisites

- Node.js 18+ / npm 9+
- Backend API running on `http://localhost:6543`

## ⚙️ Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
uas-frontend/
├── src/
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Login.jsx       # Login page
│   │   ├── Register.jsx    # Registration page
│   │   ├── AgentDashboard.jsx  # Agent dashboard
│   │   ├── MyProperties.jsx    # Agent properties management
│   │   ├── AddProperty.jsx     # Add new property
│   │   ├── EditProperty.jsx    # Edit property
│   │   └── Settings.jsx        # Agent settings
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Footer.jsx      # Footer
│   │   ├── PropertyCard.jsx    # Property card
│   │   ├── AgentCard.jsx       # Agent card
│   │   ├── ChatBubble.jsx      # Chat bubble
│   │   └── ProtectedRoute.jsx  # Route protection
│   ├── services/           # API services
│   │   ├── api.js          # Axios instance
│   │   ├── authService.js  # Authentication API
│   │   ├── agentService.js # Agent API
│   │   └── propertyService.js # Property API
│   ├── router/
│   │   └── AppRouter.jsx   # Route definitions
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── tailwind.config.js     # Tailwind configuration
```

## 🔐 Features

### Authentication
- ✅ User registration (Agent/Buyer)
- ✅ User login with session management
- ✅ Protected routes with role-based access
- ✅ Logout functionality

### Agent Features
- ✅ Dashboard with real-time statistics
- ✅ Property management (view properties)
- ✅ Inquiry management (view inquiries)
- ✅ Profile settings
- 🚧 Add/Edit/Delete properties (UI ready, API pending)
- 🚧 Chat with buyers (UI ready, API pending)

### Buyer Features
- 🚧 Browse properties
- 🚧 Property search & filters
- 🚧 Favorites management
- 🚧 Contact agents
- 🚧 Inquiry submission

## 🔌 API Integration

Frontend terhubung dengan backend API di `http://localhost:6543`. Semua request menggunakan Axios dengan `withCredentials: true` untuk session management.

Lihat [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) untuk detail integrasi.

## 👥 Team Collaboration

Pastikan backend sudah running sebelum menjalankan frontend. Lihat [../TEAM_SETUP.md](../TEAM_SETUP.md) untuk panduan kolaborasi tim.

## 🧪 Test Accounts

- Agent: `agent@test.com` / `password123`
- Buyer: `buyer@test.com` / `password123`

## 📝 Development Notes

- Tailwind CSS sudah dikonfigurasi
- Route protection sudah diimplementasi
- API service layer sudah terstruktur
- Error handling sudah ada di semua API calls
