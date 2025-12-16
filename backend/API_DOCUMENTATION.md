# 🚀 API Documentation - Real Estate Backend

## Base URL
```
http://localhost:6543
```

---

## 🔐 Authentication Endpoints

### 1. Register New User
**Endpoint:** `POST /api/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "buyer",
  "phone": "081234567890"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer",
    "phone": "081234567890"
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Validasi:**
- `name`: Required, string
- `email`: Required, valid email format
- `password`: Required, string
- `role`: Required, enum ('buyer' atau 'agent')
- `phone`: Optional, string

---

### 2. Login
**Endpoint:** `POST /api/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer",
    "phone": "081234567890"
  },
  "token": "randomtoken123456..."
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. Get Current User
**Endpoint:** `GET /api/me`

**Headers:**
```
Cookie: session=<session_cookie>
```

**Response Success (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "buyer",
    "phone": "081234567890"
  }
}
```

**Response Error:**
```json
{
  "success": false,
  "message": "Not authenticated"
}
```

---

### 4. Logout
**Endpoint:** `POST /api/logout`

**Response Success (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 🏠 Property Endpoints (To Be Implemented)

### Get All Properties
**Endpoint:** `GET /api/properties`

### Get Property Detail
**Endpoint:** `GET /api/properties/{id}`

### Create Property (Agent only)
**Endpoint:** `POST /api/properties`

### Update Property (Agent only)
**Endpoint:** `PUT /api/properties/{id}`

### Delete Property (Agent only)
**Endpoint:** `DELETE /api/properties/{id}`

---

## ❤️ Favorite Endpoints (To Be Implemented)

### Add to Favorites
**Endpoint:** `POST /api/favorites`

### Get User Favorites
**Endpoint:** `GET /api/favorites`

### Remove from Favorites
**Endpoint:** `DELETE /api/favorites/{id}`

---

## 💬 Inquiry Endpoints (To Be Implemented)

### Send Inquiry
**Endpoint:** `POST /api/inquiries`

### Get Inquiries (Agent)
**Endpoint:** `GET /api/inquiries`

---

## 🔧 Running the Server

### 1. Activate Virtual Environment
```bash
cd backend
.\venv\Scripts\Activate.ps1
```

### 2. Run Server
```bash
python -m pyramid.scripts.pserve development.ini --reload
```

Server akan berjalan di: **http://localhost:6543**

---

## 🧪 Testing API

### Using curl:
```bash
# Register
curl -X POST http://localhost:6543/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"buyer","phone":"081234567890"}'

# Login
curl -X POST http://localhost:6543/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Using Python script:
```bash
python test_api.py
```

---

## 🔐 Security Features

- ✅ Password hashing using bcrypt
- ✅ Session-based authentication
- ✅ CORS enabled for frontend (http://localhost:5173)
- ✅ Email validation
- ✅ Role-based access control

---

## 🌐 CORS Configuration

Frontend URL yang diizinkan:
- `http://localhost:5173` (Vite dev server)

Methods yang diizinkan:
- GET, POST, PUT, DELETE, OPTIONS

---

## 📝 Notes

1. **Password Hashing**: Passwords di-hash menggunakan bcrypt sebelum disimpan
2. **Session Management**: Menggunakan signed cookie sessions
3. **Role System**: Ada 2 role - 'buyer' dan 'agent'
4. **Database**: PostgreSQL dengan SQLAlchemy ORM

---

## 🐛 Troubleshooting

### Server tidak bisa start
```bash
# Install dependencies
pip install -e .

# Check PostgreSQL
python -c "import psycopg2; print('OK')"
```

### Cannot connect to database
- Pastikan PostgreSQL service running
- Check connection string di `development.ini`
- Verify database `real_estate_db` sudah dibuat

### CORS errors
- Pastikan frontend berjalan di `http://localhost:5173`
- Check browser console untuk error messages
