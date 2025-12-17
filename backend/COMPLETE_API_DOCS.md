# 🚀 Complete API Documentation - Real Estate Backend

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

**Response Success:**
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
  }
}
```

---

### 3. Logout
**Endpoint:** `POST /api/logout`

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 4. Get Current User
**Endpoint:** `GET /api/me`

**Response:**
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

---

## 📊 Agent Dashboard Endpoints

### 5. Get Agent Statistics
**Endpoint:** `GET /api/agent/stats`

**Auth Required:** Yes (Agent only)

**Response:**
```json
{
  "success": true,
  "stats": {
    "total_properties": 5,
    "active_listings": 5,
    "total_inquiries": 12
  }
}
```

---

### 6. Get Agent Properties
**Endpoint:** `GET /api/agent/properties`

**Auth Required:** Yes (Agent only)

**Response:**
```json
{
  "success": true,
  "properties": [
    {
      "id": 1,
      "title": "Rumah Mewah Jakarta",
      "description": "Rumah 2 lantai dengan kolam renang",
      "price": 2500000000,
      "property_type": "house",
      "location": "Jakarta Selatan",
      "bedrooms": 4,
      "bathrooms": 3,
      "area": 250,
      "created_at": "2025-12-17T10:30:00"
    }
  ]
}
```

---

### 7. Get Agent Inquiries
**Endpoint:** `GET /api/agent/inquiries`

**Auth Required:** Yes (Agent only)

**Response:**
```json
{
  "success": true,
  "inquiries": [
    {
      "id": 1,
      "message": "Apakah masih tersedia?",
      "date": "2025-12-17T10:00:00",
      "property": {
        "id": 1,
        "title": "Rumah Mewah Jakarta",
        "location": "Jakarta Selatan"
      },
      "buyer": {
        "id": 2,
        "name": "Buyer Name",
        "email": "buyer@example.com",
        "phone": "081234567890"
      }
    }
  ]
}
```

---

## 🏠 Property Endpoints

### 8. Get All Properties (with filters)
**Endpoint:** `GET /api/properties`

**Query Parameters:**
- `property_type` - Filter by type (house, apartment, villa, land)
- `min_price` - Minimum price
- `max_price` - Maximum price
- `location` - Filter by location (partial match)
- `bedrooms` - Minimum bedrooms

**Example:**
```
GET /api/properties?property_type=house&min_price=1000000&max_price=5000000&location=Jakarta
```

**Response:**
```json
{
  "success": true,
  "properties": [
    {
      "id": 1,
      "title": "Rumah Mewah Jakarta",
      "description": "Rumah 2 lantai...",
      "price": 2500000000,
      "property_type": "house",
      "location": "Jakarta Selatan",
      "bedrooms": 4,
      "bathrooms": 3,
      "area": 250,
      "thumbnail": "https://example.com/photo1.jpg",
      "agent": {
        "id": 3,
        "name": "Agent Name",
        "email": "agent@example.com",
        "phone": "081234567890"
      }
    }
  ],
  "total": 1
}
```

---

### 9. Get Property Detail
**Endpoint:** `GET /api/properties/{id}`

**Response:**
```json
{
  "success": true,
  "property": {
    "id": 1,
    "title": "Rumah Mewah Jakarta",
    "description": "Rumah 2 lantai dengan kolam renang",
    "price": 2500000000,
    "property_type": "house",
    "location": "Jakarta Selatan",
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 250,
    "created_at": "2025-12-17T10:30:00",
    "photos": [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg"
    ],
    "agent": {
      "id": 3,
      "name": "Agent Name",
      "email": "agent@example.com",
      "phone": "081234567890"
    },
    "inquiry_count": 5
  }
}
```

---

### 10. Create Property
**Endpoint:** `POST /api/properties`

**Auth Required:** Yes (Agent only)

**Request Body:**
```json
{
  "title": "Rumah Mewah Jakarta",
  "description": "Rumah 2 lantai dengan kolam renang",
  "price": 2500000000,
  "property_type": "house",
  "location": "Jakarta Selatan",
  "bedrooms": 4,
  "bathrooms": 3,
  "area": 250
}
```

**Response:**
```json
{
  "success": true,
  "message": "Property created successfully",
  "property": {
    "id": 1,
    "title": "Rumah Mewah Jakarta",
    "price": 2500000000,
    "location": "Jakarta Selatan"
  }
}
```

---

### 11. Update Property
**Endpoint:** `PUT /api/properties/{id}`

**Auth Required:** Yes (Owner only)

**Request Body:** (all fields optional)
```json
{
  "title": "Rumah Mewah Jakarta - Updated",
  "price": 2300000000,
  "location": "Jakarta Selatan"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Property updated successfully",
  "property": {
    "id": 1,
    "title": "Rumah Mewah Jakarta - Updated",
    "price": 2300000000,
    "location": "Jakarta Selatan"
  }
}
```

---

### 12. Delete Property
**Endpoint:** `DELETE /api/properties/{id}`

**Auth Required:** Yes (Owner only)

**Response:**
```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

---

### 13. Search Properties
**Endpoint:** `GET /api/properties/search?q=jakarta`

**Query Parameters:**
- `q` - Search keyword (searches in title, description, location)

**Response:**
```json
{
  "success": true,
  "properties": [
    {
      "id": 1,
      "title": "Rumah Mewah Jakarta",
      "price": 2500000000,
      "location": "Jakarta Selatan",
      "property_type": "house",
      "bedrooms": 4,
      "bathrooms": 3,
      "area": 250,
      "thumbnail": "https://example.com/photo1.jpg"
    }
  ],
  "total": 1
}
```

---

## ⭐ Favorites Endpoints

### 14. Add to Favorites
**Endpoint:** `POST /api/favorites`

**Auth Required:** Yes

**Request Body:**
```json
{
  "property_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Property added to favorites",
  "favorite": {
    "id": 1,
    "property_id": 1
  }
}
```

---

### 15. Get User Favorites
**Endpoint:** `GET /api/favorites`

**Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "favorites": [
    {
      "id": 1,
      "created_at": "2025-12-17T10:00:00",
      "property": {
        "id": 1,
        "title": "Rumah Mewah Jakarta",
        "description": "Rumah 2 lantai...",
        "price": 2500000000,
        "property_type": "house",
        "location": "Jakarta Selatan",
        "bedrooms": 4,
        "bathrooms": 3,
        "area": 250,
        "thumbnail": "https://example.com/photo1.jpg",
        "agent": {
          "id": 3,
          "name": "Agent Name",
          "phone": "081234567890"
        }
      }
    }
  ],
  "total": 1
}
```

---

### 16. Remove from Favorites
**Endpoint:** `DELETE /api/favorites/{id}`

**Auth Required:** Yes (Owner only)

**Response:**
```json
{
  "success": true,
  "message": "Favorite removed successfully"
}
```

---

## 💬 Inquiry Endpoints

### 17. Submit Inquiry
**Endpoint:** `POST /api/inquiries`

**Auth Required:** Yes

**Request Body:**
```json
{
  "property_id": 1,
  "message": "Apakah masih tersedia?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "inquiry": {
    "id": 1,
    "property_id": 1,
    "message": "Apakah masih tersedia?",
    "date": "2025-12-17T10:00:00"
  }
}
```

---

### 18. Get Buyer Inquiries
**Endpoint:** `GET /api/inquiries/buyer`

**Auth Required:** Yes

**Response:**
```json
{
  "success": true,
  "inquiries": [
    {
      "id": 1,
      "message": "Apakah masih tersedia?",
      "date": "2025-12-17T10:00:00",
      "property": {
        "id": 1,
        "title": "Rumah Mewah Jakarta",
        "location": "Jakarta Selatan",
        "price": 2500000000
      },
      "agent": {
        "id": 3,
        "name": "Agent Name",
        "email": "agent@example.com",
        "phone": "081234567890"
      }
    }
  ],
  "total": 1
}
```

---

## 🔒 Authentication & Authorization

All authenticated endpoints require a valid session cookie. Session is created upon successful login.

**Auth Flow:**
1. POST /api/login → Get session cookie
2. Use session cookie for subsequent requests
3. POST /api/logout → Invalidate session

**CORS Configuration:**
- Allowed Origin: http://localhost:5173
- Credentials: true (cookies enabled)

---

## 📝 Response Codes

- `200` - Success
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (no permission)
- `404` - Not found
- `500` - Server error

---

## ✅ Complete API Summary

**Total Endpoints: 18**

- Authentication: 4 endpoints
- Agent Dashboard: 3 endpoints
- Properties: 6 endpoints
- Favorites: 3 endpoints
- Inquiries: 2 endpoints

**All endpoints are COMPLETE and READY to use!** 🎉
