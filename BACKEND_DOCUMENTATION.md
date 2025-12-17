# Property Management API - Documentation

## ✅ Implementasi Selesai

Backend untuk Create Property API sudah berhasil diimplementasikan dengan lengkap!

## 📋 Yang Sudah Dikerjakan

### 1. **Database Models**
- ✅ Model `User` di [models/user.py](backend/real_estate_api/models/user.py)
- ✅ Model `Property` di [models/property.py](backend/real_estate_api/models/property.py)
- ✅ Database migration (SQLite) sudah dibuat dan dijalankan
- ✅ Sample data (2 users, 2 properties) sudah diisi

### 2. **API Endpoints**
- ✅ File [views/property.py](backend/real_estate_api/views/property.py) dibuat
- ✅ `POST /api/properties` - Create property (agent only)
- ✅ `GET /api/properties` - List all properties
- ✅ `GET /api/properties/{id}` - Get property detail

### 3. **Features**
- ✅ Validasi required fields
- ✅ Validasi agent role (hanya agent yang bisa create property)
- ✅ Error handling yang lengkap
- ✅ Response format JSON yang konsisten

---

## 🚀 Cara Menjalankan Backend

### Server sudah berjalan di: **http://localhost:6543**

Jika server belum running, jalankan command:

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python -m pyramid.scripts.pserve development.ini --reload
```

---

## 📖 API Documentation

### 1. Create Property API

**Endpoint:** `POST /api/properties`

**Function:** Agent bisa menambahkan properti baru ke database

**Request Body:**
```json
{
  "title": "Rumah Mewah Jakarta",
  "description": "Rumah 2 lantai dengan kolam renang pribadi",
  "price": 2500000000,
  "property_type": "house",
  "location": "Jakarta Selatan",
  "bedrooms": 4,
  "bathrooms": 3,
  "area": 250,
  "agent_id": 1
}
```

**Required Fields:**
- `title` (string)
- `description` (string)
- `price` (integer)
- `property_type` (string)
- `location` (string)

**Optional Fields:**
- `bedrooms` (integer, default: 1)
- `bathrooms` (integer, default: 1)
- `area` (integer, default: 0)
- `agent_id` (integer, default: 1)

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Property created successfully",
  "data": {
    "id": 3,
    "title": "Rumah Mewah Jakarta",
    "description": "Rumah 2 lantai dengan kolam renang pribadi",
    "price": 2500000000,
    "property_type": "house",
    "location": "Jakarta Selatan",
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 250,
    "agent_id": 1,
    "agent": {
      "id": 1,
      "name": "Agus Agent",
      "email": "agent@test.com"
    }
  }
}
```

**Error Responses:**

**400 - Missing Required Field:**
```json
{
  "error": "Field 'title' is required"
}
```

**403 - Non-Agent User:**
```json
{
  "error": "Only agents can create properties"
}
```

**404 - Agent Not Found:**
```json
{
  "error": "Agent not found"
}
```

---

### 2. List Properties API

**Endpoint:** `GET /api/properties`

**Function:** Mendapatkan list semua properti

**Success Response (200):**
```json
{
  "status": "success",
  "count": 2,
  "data": [
    {
      "id": 1,
      "title": "Rumah Mewah di Bandung",
      "description": "Rumah mewah dengan kolam renang dan taman luas",
      "price": 850000000,
      "property_type": "house",
      "location": "Bandung, Jawa Barat",
      "bedrooms": 4,
      "bathrooms": 3,
      "area": 200,
      "agent": {
        "id": 1,
        "name": "Agus Agent",
        "email": "agent@test.com"
      }
    },
    ...
  ]
}
```

---

### 3. Get Property Detail API

**Endpoint:** `GET /api/properties/{id}`

**Function:** Mendapatkan detail properti berdasarkan ID

**Success Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Rumah Mewah di Bandung",
    "description": "Rumah mewah dengan kolam renang dan taman luas",
    "price": 850000000,
    "property_type": "house",
    "location": "Bandung, Jawa Barat",
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 200,
    "agent": {
      "id": 1,
      "name": "Agus Agent",
      "email": "agent@test.com"
    }
  }
}
```

**Error Response (404):**
```json
{
  "error": "Property not found"
}
```

---

## 🧪 Testing API

### Menggunakan cURL:

**1. Create Property:**
```bash
curl -X POST http://localhost:6543/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Rumah Mewah Jakarta",
    "description": "Rumah 2 lantai",
    "price": 2500000000,
    "property_type": "house",
    "location": "Jakarta Selatan",
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 250,
    "agent_id": 1
  }'
```

**2. List Properties:**
```bash
curl http://localhost:6543/api/properties
```

**3. Get Property Detail:**
```bash
curl http://localhost:6543/api/properties/1
```

### Menggunakan PowerShell:

**1. Create Property:**
```powershell
$body = @{
    title = "Rumah Mewah Jakarta"
    description = "Rumah 2 lantai"
    price = 2500000000
    property_type = "house"
    location = "Jakarta Selatan"
    bedrooms = 4
    bathrooms = 3
    area = 250
    agent_id = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:6543/api/properties" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**2. List Properties:**
```powershell
Invoke-RestMethod -Uri "http://localhost:6543/api/properties" -Method GET
```

**3. Get Property Detail:**
```powershell
Invoke-RestMethod -Uri "http://localhost:6543/api/properties/1" -Method GET
```

---

## 📊 Database Information

**Database:** SQLite (real_estate.sqlite)

**Sample Users:**
- ID: 1, Name: "Agus Agent", Email: "agent@test.com", Role: "agent"
- ID: 2, Name: "Budi Buyer", Email: "buyer@test.com", Role: "buyer"

**Sample Properties:**
- ID: 1, Title: "Rumah Mewah di Bandung", Agent: Agus Agent
- ID: 2, Title: "Apartemen Modern Jakarta Pusat", Agent: Agus Agent

---

## 📁 File Structure

```
backend/
├── real_estate_api/
│   ├── models/
│   │   ├── user.py          # User model
│   │   └── property.py      # Property model
│   ├── views/
│   │   ├── default.py       # Default views (home, users)
│   │   └── property.py      # ✨ Property views (NEW)
│   ├── routes.py            # Route configuration
│   └── __init__.py
├── real_estate.sqlite       # ✨ SQLite database (NEW)
├── development.ini          # Configuration (updated)
└── test_api.py             # ✨ Test script (NEW)
```

---

## ✅ Checklist Implementasi

- [x] Buat file property.py untuk views
- [x] Implement create_property() function
- [x] Validasi required fields
- [x] Validasi agent role
- [x] Insert ke database dengan agent_id
- [x] Return success + property data
- [x] Error handling
- [x] Setup database migration
- [x] Initialize sample data
- [x] Test endpoints

---

## 🎯 Next Steps (Optional)

Untuk improvement selanjutnya, Anda bisa menambahkan:

1. **Authentication & Session Management**
   - Implement login/logout
   - JWT token authentication
   - Session-based agent_id (tidak perlu kirim di request body)

2. **Property Image Upload**
   - File upload endpoint
   - Save images to storage
   - Return image URLs in response

3. **Property Update & Delete**
   - `PUT /api/properties/{id}` - Update property
   - `DELETE /api/properties/{id}` - Delete property

4. **Advanced Filtering**
   - Filter by price range
   - Filter by location
   - Filter by property type
   - Search by title

---

## 📝 Notes

- Database menggunakan SQLite untuk development (lebih mudah setup)
- Jika ingin menggunakan PostgreSQL, ubah `sqlalchemy.url` di [development.ini](backend/development.ini)
- Password di sample data masih plain text, di production harus di-hash dengan bcrypt
- Agent_id saat ini diambil dari request body, idealnya dari session setelah login

---

## 🐛 Troubleshooting

**Server tidak bisa diakses:**
1. Pastikan virtual environment sudah aktif: `.\venv\Scripts\Activate.ps1`
2. Pastikan server running: `python -m pyramid.scripts.pserve development.ini`
3. Cek di browser: http://localhost:6543

**Error "Module not found":**
```powershell
.\venv\Scripts\Activate.ps1
pip install -e .
```

**Database error:**
```powershell
alembic -c development.ini upgrade head
initialize_real_estate_api_db development.ini
```

---

## 🎉 Selesai!

Backend Create Property API sudah selesai dan siap digunakan!
Server berjalan di: **http://localhost:6543**
