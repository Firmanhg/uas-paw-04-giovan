# Testing UPDATE & DELETE Property API

Server akan otomatis reload karena file berubah. Tunggu sebentar lalu test di Thunder Client.

## 🔄 UPDATE Property (PUT)

**Endpoint:** `PUT /api/properties/{id}`

**Function:** Agent bisa mengupdate properti miliknya

### Thunder Client Setup:
1. **Method:** `PUT`
2. **URL:** `http://localhost:6543/api/properties/3`
3. **Headers:** 
   - `Content-Type: application/json`
4. **Body (JSON):**

```json
{
  "title": "Rumah Mewah Jakarta - UPDATED",
  "description": "Rumah 2 lantai dengan kolam renang dan taman luas - Harga Nego!",
  "price": 2300000000,
  "bedrooms": 5,
  "bathrooms": 4,
  "agent_id": 1
}
```

### Success Response (200):
```json
{
  "status": "success",
  "message": "Property updated successfully",
  "data": {
    "id": 3,
    "title": "Rumah Mewah Jakarta - UPDATED",
    "description": "Rumah 2 lantai dengan kolam renang dan taman luas - Harga Nego!",
    "price": 2300000000,
    "property_type": "house",
    "location": "Jakarta Selatan",
    "bedrooms": 5,
    "bathrooms": 4,
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

### Error Response - Unauthorized (403):
```json
{
  "error": "You are not authorized to update this property"
}
```

### Error Response - Not Found (404):
```json
{
  "error": "Property not found"
}
```

---

## 🗑️ DELETE Property (DELETE)

**Endpoint:** `DELETE /api/properties/{id}?agent_id={agent_id}`

**Function:** Agent bisa menghapus properti miliknya

### Thunder Client Setup:
1. **Method:** `DELETE`
2. **URL:** `http://localhost:6543/api/properties/3?agent_id=1`
   - Property ID: 3
   - Agent ID: 1 (sebagai query parameter)

### Success Response (200):
```json
{
  "status": "success",
  "message": "Property deleted successfully",
  "data": {
    "id": 3,
    "title": "Rumah Mewah Jakarta - UPDATED",
    "agent_id": 1
  }
}
```

### Error Response - Missing Agent ID (400):
```json
{
  "error": "Agent ID is required"
}
```

### Error Response - Unauthorized (403):
```json
{
  "error": "You are not authorized to delete this property"
}
```

### Error Response - Not Found (404):
```json
{
  "error": "Property not found"
}
```

---

## 📝 Test Scenarios

### Scenario 1: Update Property (Success)
1. Buat property baru (POST) atau gunakan property yang sudah ada
2. Update property dengan agent_id yang sama
3. Verify: property berhasil diupdate dengan data baru

### Scenario 2: Update Property (Unauthorized)
1. Coba update property dengan agent_id yang berbeda
2. Verify: mendapat error 403 "Not authorized"

### Scenario 3: Delete Property (Success)
1. Gunakan property yang sudah ada
2. Delete dengan agent_id yang benar
3. Verify: property berhasil dihapus
4. Coba GET property tersebut → harus mendapat 404

### Scenario 4: Delete Property (Unauthorized)
1. Coba delete property dengan agent_id yang salah
2. Verify: mendapat error 403 "Not authorized"

---

## 🎯 Complete API Endpoints Summary

| Method | Endpoint | Function | Auth |
|--------|----------|----------|------|
| POST | `/api/properties` | Create property | Agent only |
| GET | `/api/properties` | List all properties | Public |
| GET | `/api/properties/{id}` | Get property detail | Public |
| PUT | `/api/properties/{id}` | Update property | Agent owner only |
| DELETE | `/api/properties/{id}?agent_id={id}` | Delete property | Agent owner only |

---

## 💡 Notes

- **agent_id saat ini diambil dari request body (PUT) atau query parameter (DELETE)**
- Dalam production, agent_id harus diambil dari session setelah login
- Validasi ownership: agent hanya bisa update/delete property miliknya sendiri
- Semua field di UPDATE bersifat optional (partial update)

---

## 🧪 Testing Order

1. ✅ POST - Create property
2. ✅ GET - List all properties  
3. ✅ GET - Get detail property
4. 🆕 PUT - Update property
5. 🆕 DELETE - Delete property
