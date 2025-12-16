# Real Estate API Backend

Backend API untuk aplikasi Real Estate menggunakan **Python Pyramid Framework** dengan **PostgreSQL** database (Neon Cloud).

## 🚀 Tech Stack

- **Framework**: Python Pyramid 2.0.2
- **Database**: PostgreSQL (Neon Cloud - Singapore)
- **ORM**: SQLAlchemy
- **Authentication**: Session-based with bcrypt
- **Migration**: Alembic

## 📋 Prerequisites

- Python 3.8+
- PostgreSQL database (menggunakan Neon Cloud)
- Virtual environment

## ⚙️ Setup & Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv

# Windows PowerShell
.\venv\Scripts\Activate.ps1

# Windows CMD
.\venv\Scripts\activate.bat
```

### 3. Install Dependencies
```bash
pip install -e .
```

### 4. Database Configuration
Database connection sudah dikonfigurasi di `development.ini` menggunakan Neon Cloud PostgreSQL.

### 5. Run Database Migrations
```bash
alembic upgrade head
```

### 6. Start Development Server
```bash
python -m pyramid.scripts.pserve development.ini --reload
```

Server akan berjalan di: `http://localhost:6543`

## 📁 Project Structure

```
backend/
├── real_estate_api/
│   ├── models/          # Database models (User, Property, etc.)
│   ├── views/           # API endpoints
│   │   ├── auth.py      # Authentication endpoints
│   │   ├── agent.py     # Agent dashboard endpoints
│   │   └── default.py   # Default/health check
│   ├── alembic/         # Database migrations
│   ├── routes.py        # Route definitions
│   └── __init__.py      # App configuration
├── development.ini      # Development configuration
└── setup.py            # Package setup
```

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user info

### Agent Dashboard
- `GET /api/agent/stats` - Get agent statistics
- `GET /api/agent/properties` - Get agent's properties
- `GET /api/agent/inquiries` - Get agent's inquiries

## 📖 Documentation

Lihat [API_DOCUMENTATION.md](API_DOCUMENTATION.md) untuk detail lengkap API endpoints.

## 👥 Team Collaboration

Backend ini menggunakan **Neon Cloud Database** sehingga semua developer dapat mengakses database yang sama. Lihat [TEAM_SETUP.md](../TEAM_SETUP.md) untuk panduan kolaborasi tim.

## 🧪 Testing

Test users sudah tersedia:
- Agent: `agent@test.com` / `password123`
- Buyer: `buyer@test.com` / `password123`
- Admin: `admin@test.com` / `password123`
