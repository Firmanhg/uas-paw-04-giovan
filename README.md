# Property Listing Platform

Platform listing properti modern untuk jual/sewa dengan sistem inquiry dan favorites. Dikembangkan menggunakan React dan Python Flask dengan PostgreSQL database.

---

## 👥 Tim Pengembang

**Nama Tim:** Propertiku (Kelompok 04 - RB)

| Nama | NIM | Role | 
|------|-----|------|
| Pradana Figo Ariasya | 123140063 | Team Leader & Frontend Developer |
| Elfa Noviana Sari | 123140066 | Frontend & Backend Developer | 
| Giovan Lado | 123140068 | Backend Developer & Database Specialist | 
| Hildyah Maretasya Araffad | 123140151 | Frontend & Backend Developer | 
| Firman H Gultom | 123140171 | Frontend & Backend Developer |

---

## 📋 Deskripsi Proyek

Property Listing Platform adalah aplikasi web yang memungkinkan:
- **Agent**: Mengelola listing properti (tambah, edit, hapus)
- **Buyer**: Mencari dan menyimpan properti favorit, mengirim inquiry ke agent

---

# 💡 Fitur Utama

### Core Features
1. **User Authentication**
   - Register dan Login untuk Buyer dan Agent
   - Role-based access control
   - Session management dengan JWT token

2. **Property Management**
   - Agent: Create, Read, Update, Delete properties
   - Upload multiple photos untuk setiap properti
   - Buyer: Browse semua available properties

3. **Search & Filter**
   - Filter berdasarkan price range
   - Filter berdasarkan property type (house/apartment)
   - Filter berdasarkan location
   - Real-time search results

4. **Property Details**
   - Detailed information dengan multiple photos
   - Specifications: bedrooms, bathrooms, area (sqm)
   - Contact information agent

5. **Inquiry System**
   - Buyer: Kirim inquiry/pesan kepada agent
   - Agent: View dan manage inquiries
   - Email notification (opsional)

6. **Favorites**
   - Buyer: Save/unsave favorite properties
   - View saved properties list
   - Quick access ke favorite properties

### Bonus Features
- Agent profile page dengan property listings
- Property comparison (side by side)
- Property statistics untuk agent
- Advanced search dengan multiple filters

---

## 🛠️ Tech Stack

### Frontend
- **React 18.x** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling dengan Flexbox/Grid
- **React Hook Form** - Form management
- **Lucide React** - Icon library

### Backend
- **Python 3.11+** - Programming language
- **Flask** - Web framework
- **SQLAlchemy** - ORM
- **Alembic** - Database migrations
- **Flask-JWT-Extended** - Authentication
- **Flask-CORS** - Cross-origin resource sharing
- **Werkzeug** - Password hashing
- **Python-dotenv** - Environment variables

### Database
- **PostgreSQL 15+** - Relational database
- **psycopg2** - PostgreSQL adapter

### Development Tools
- **Git & GitHub** - Version control
- **Postman** - API testing
- **VS Code** - Code editor
---

## 📦 Instalasi

### Prasyarat
- Node.js 18+ dan npm
- Python 3.11+
- PostgreSQL 15+
- Docker & Docker Compose (opsional)

### Instalasi Manual

#### 1. Clone Repository
```bash
git clone https://github.com/Firmanhg/uas-paw-04-giovan.git
cd uas-paw-04-giovan
```

#### 2. Setup Database
```bash
# Masuk ke PostgreSQL
psql -U postgres

# Buat database
CREATE DATABASE property_listing;
CREATE USER property_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE property_listing TO property_user;
\q
```

#### 3. Setup Backend
```bash
cd backend

# Buat virtual environment
python -m venv venv

# Aktifkan virtual environment
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env dengan konfigurasi database Anda

# Jalankan migrations
flask db upgrade

# Jalankan seeder (optional)
python seed.py

# Jalankan server
python app.py
```

Backend akan berjalan di `http://localhost:6543`

#### 4. Setup Frontend
```bash
# Buka terminal baru
cd uas-frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env jika perlu

# Jalankan development server
npm start
```

Frontend akan berjalan di `http://localhost:5173`

## 🌐 Deployment Links

- **Link Deployment Frontend:** https://propertyku04.vercel.app/ 
- **Link Deployment Backend:** [propertiku04.web.id](http://propertiku04.web.id/)

--- 

## 🎥 Video Presentasi

📹 **Link Video Presentasi:** https://youtu.be/RLuQ9IcEyLY?si=sVOi93bhKquZobgr 

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "buyer",
  "phone": "081234567890"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer"
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "buyer"
    }
  }
}
```

#### 3. Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer"
  }
}
```

### Property Endpoints

#### 4. Get All Properties (with filters)
```http
GET /api/properties?type=house&min_price=100000&max_price=500000&location=Jakarta

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Modern House in Jakarta",
      "description": "Beautiful 3-bedroom house...",
      "price": 350000,
      "type": "house",
      "location": "Jakarta",
      "bedrooms": 3,
      "bathrooms": 2,
      "area": 120.5,
      "photos": [
        {
          "id": 1,
          "photo_url": "/uploads/house1.jpg",
          "is_primary": true
        }
      ],
      "agent": {
        "id": 2,
        "name": "Jane Agent",
        "phone": "081234567890"
      },
      "created_at": "2024-01-15T10:30:00"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 1,
    "pages": 1
  }
}
```

#### 5. Get Property by ID
```http
GET /api/properties/{id}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Modern House in Jakarta",
    "description": "Beautiful 3-bedroom house with modern design...",
    "price": 350000,
    "type": "house",
    "location": "Jakarta",
    "bedrooms": 3,
    "bathrooms": 2,
    "area": 120.5,
    "status": "available",
    "photos": [...],
    "agent": {...}
  }
}
```

#### 6. Create Property (Agent only)
```http
POST /api/properties
Authorization: Bearer {token}
Content-Type: multipart/form-data

title: Modern House in Jakarta
description: Beautiful 3-bedroom house...
price: 350000
type: house
location: Jakarta
bedrooms: 3
bathrooms: 2
area: 120.5
photos[]: (file)
photos[]: (file)

Response: 201 Created
{
  "success": true,
  "message": "Property created successfully",
  "data": {...}
}
```

#### 7. Update Property (Agent only)
```http
PUT /api/properties/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Modern House",
  "price": 375000
}

Response: 200 OK
{
  "success": true,
  "message": "Property updated successfully",
  "data": {...}
}
```

#### 8. Delete Property (Agent only)
```http
DELETE /api/properties/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Property deleted successfully"
}
```

### Favorites Endpoints

#### 9. Get User Favorites
```http
GET /api/favorites
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "property": {...},
      "created_at": "2024-01-15T10:30:00"
    }
  ]
}
```

#### 10. Add to Favorites
```http
POST /api/favorites
Authorization: Bearer {token}
Content-Type: application/json

{
  "property_id": 1
}

Response: 201 Created
{
  "success": true,
  "message": "Property added to favorites"
}
```

#### 11. Remove from Favorites
```http
DELETE /api/favorites/{property_id}
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "message": "Property removed from favorites"
}
```

### Inquiry Endpoints

#### 12. Create Inquiry (Buyer only)
```http
POST /api/inquiries
Authorization: Bearer {token}
Content-Type: application/json

{
  "property_id": 1,
  "message": "I'm interested in this property. Can we schedule a viewing?"
}

Response: 201 Created
{
  "success": true,
  "message": "Inquiry sent successfully",
  "data": {
    "id": 1,
    "property_id": 1,
    "message": "I'm interested...",
    "status": "pending",
    "created_at": "2024-01-15T10:30:00"
  }
}
```

#### 13. Get Inquiries
```http
# For Buyers: Get their sent inquiries
# For Agents: Get inquiries for their properties
GET /api/inquiries
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "property": {...},
      "buyer": {...},
      "message": "I'm interested...",
      "status": "pending",
      "created_at": "2024-01-15T10:30:00"
    }
  ]
}
```

#### 14. Update Inquiry Status (Agent only)
```http
PUT /api/inquiries/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "contacted"
}

Response: 200 OK
{
  "success": true,
  "message": "Inquiry updated successfully"
}
```

### Error Responses

Semua endpoint dapat mengembalikan error responses berikut:

```http
400 Bad Request
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "field": ["Error message"]
  }
}

401 Unauthorized
{
  "success": false,
  "message": "Authentication required"
}

403 Forbidden
{
  "success": false,
  "message": "You don't have permission to access this resource"
}

404 Not Found
{
  "success": false,
  "message": "Resource not found"
}

500 Internal Server Error
{
  "success": false,
  "message": "An error occurred on the server"
}
```

---

## 📸 Screenshots

### 1. Landing Page

<img width="1920" height="1080" alt="Screenshot (1014)" src="https://github.com/user-attachments/assets/298279ff-d248-4241-9920-d3cf2ee940ac" />

### 2. Chat Agent/Buyer

<img width="1920" height="1080" alt="Screenshot (1008)" src="https://github.com/user-attachments/assets/430290f9-b229-4265-87b6-452feb6792d3" />
<img width="1920" height="1080" alt="Screenshot (1009)" src="https://github.com/user-attachments/assets/282651a2-724f-4884-9242-34acee6b689a" />

### 3. Property Details

<img width="1920" height="1080" alt="Screenshot (1018)" src="https://github.com/user-attachments/assets/981f2b9b-e579-4075-b48d-387723edfc36" />

### 4. Property Listings & Search/Filter

<img width="1920" height="1080" alt="Screenshot (1016)" src="https://github.com/user-attachments/assets/8dc98fb3-10ec-4689-8c0e-f362c7beaf5f" />
<img width="1920" height="1080" alt="Screenshot (1017)" src="https://github.com/user-attachments/assets/5828bcf6-2c67-4614-be78-22f92d16ffd5" />

### 5. Favorites Page (Buyer)

<img width="1920" height="1080" alt="Screenshot (1026) (1)" src="https://github.com/user-attachments/assets/27297c98-fbd1-4496-993e-cf50760ba241" />

### 6. Agent Dashboard & Setting

<img width="1920" height="1080" alt="Copy of Screenshot (1029)" src="https://github.com/user-attachments/assets/1d63d936-f9e8-4ee3-89e5-bf2d50a94c35" />
<img width="1920" height="1080" alt="Screenshot (1011)" src="https://github.com/user-attachments/assets/f01cec1f-c9d4-4be6-8313-4abb53849303" />
<img width="1920" height="1080" alt="Screenshot (1025)" src="https://github.com/user-attachments/assets/262fbcf7-1388-4808-a58c-8af7ab309f8b" />

### 7. Property Form (Create/Edit)

<img width="1920" height="1080" alt="Copy of Screenshot (1024)" src="https://github.com/user-attachments/assets/e1debcb8-bb25-4476-b910-4ae86d4a6e2c" />
<img width="1920" height="1080" alt="Screenshot (1022)" src="https://github.com/user-attachments/assets/0a20312e-63ad-4cfc-ad22-22e6c3bb751d" />

### 8. Login & Register

<img width="1920" height="1080" alt="Screenshot (1032)" src="https://github.com/user-attachments/assets/138dee5d-9013-48ee-86b1-78c41c21e32b" />
<img width="1920" height="1080" alt="Screenshot (1033)" src="https://github.com/user-attachments/assets/502c96b1-98f0-431c-acd1-a8d5533240c9" />

### 9. Property comparison

<img width="1920" height="1080" alt="Screenshot (1028) (1)" src="https://github.com/user-attachments/assets/d5e6bb1b-17a6-42a0-ad21-df43675f1e37" />

---

## 🧪 Testing

### Manual Testing Flow

1. **Register sebagai Agent**
   - POST `/api/auth/register` dengan role "agent"
   
2. **Login sebagai Agent**
   - POST `/api/auth/login`
   - Simpan token

3. **Create Property**
   - POST `/api/properties` dengan token agent

4. **Register sebagai Buyer**
   - POST `/api/auth/register` dengan role "buyer"

5. **Login sebagai Buyer**
   - POST `/api/auth/login`
   - Simpan token

6. **Browse Properties**
   - GET `/api/properties`

7. **Add to Favorites**
   - POST `/api/favorites` dengan token buyer

8. **Send Inquiry**
   - POST `/api/inquiries` dengan token buyer

---

## 🔐 Keamanan

- **Password Hashing**: Menggunakan bcrypt
- **JWT Authentication**: Secure token-based auth
- **Role-Based Access Control**: Agent dan Buyer memiliki akses berbeda
- **Input Validation**: Validasi di frontend dan backend
- **SQL Injection Prevention**: Menggunakan SQLAlchemy ORM
- **XSS Protection**: Input sanitization
- **CORS Configuration**: Restrict origin access

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Check database exists
psql -U postgres -l

# Reset database
flask db downgrade
flask db upgrade
```

### CORS Error
- Pastikan CORS_ORIGINS di backend .env sesuai dengan frontend URL
- Check Flask-CORS configuration

### JWT Token Expired
- Token expires setelah 1 jam (default)
- Implement token refresh atau re-login

### Upload File Error
- Check UPLOAD_FOLDER permissions
- Verify MAX_FILE_SIZE setting
- Ensure multer middleware configured correctly

---

## 🎬 User Flow Diagrams

### Buyer Journey
```
Landing Page
    ↓
Browse Properties
    ↓
Apply Filters/Search
    ↓
View Property Details
    ↓
[Not Logged In] → Login/Register
    ↓
Add to Favorites OR Send Inquiry
    ↓
View Dashboard (Favorites & Inquiries)
```

### Agent Journey
```
Landing Page
    ↓
Register as Agent
    ↓
Login
    ↓
Agent Dashboard
    ↓
Add New Property
    ↓
Upload Photos & Fill Details
    ↓
Publish Property
    ↓
View Inquiries
    ↓
Respond to Buyers
```
