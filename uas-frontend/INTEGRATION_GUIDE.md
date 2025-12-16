# 🔗 Frontend-Backend Integration Guide

## ✅ Yang Sudah Dibuat

### Backend API
- ✅ `POST /api/register` - Register user baru
- ✅ `POST /api/login` - Login user
- ✅ `POST /api/logout` - Logout user
- ✅ `GET /api/me` - Get current user info

### Frontend Integration
- ✅ [authService.js](src/services/authService.js) - API service dengan axios
- ✅ [Login.jsx](src/pages/Login.jsx) - Login page dengan API integration
- ✅ [Register.jsx](src/pages/Register.jsx) - Register page dengan API integration
- ✅ Axios installed untuk HTTP requests
- ✅ Error handling & loading states
- ✅ Success messages & redirects

---

## 🚀 Cara Menjalankan

### 1. Start Backend Server

```bash
# Terminal 1 - Backend
cd backend
python -m pyramid.scripts.pserve development.ini --reload
```

Backend akan berjalan di: **http://localhost:6543**

### 2. Start Frontend Server

```bash
# Terminal 2 - Frontend
cd uas-frontend
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173**

---

## 🧪 Testing Integration

### Test Register:

1. Buka **http://localhost:5173/register**
2. Isi form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Phone: `081234567890`
   - Role: Pilih `Buyer` atau `Agent`
3. Klik **Register**
4. Jika berhasil, akan redirect ke halaman login

### Test Login:

1. Buka **http://localhost:5173/login**
2. Isi form:
   - Email: `test@example.com`
   - Password: `password123`
3. Klik **Login**
4. Jika berhasil:
   - **Buyer** → redirect ke home (`/`)
   - **Agent** → redirect ke dashboard (`/agent/dashboard`)

---

## 🔐 Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. Submit form
       ▼
┌─────────────────────┐
│  Login/Register.jsx │
└──────┬──────────────┘
       │ 2. Call API
       ▼
┌─────────────────┐
│ authService.js  │
└──────┬──────────┘
       │ 3. HTTP Request (axios)
       ▼
┌──────────────────────┐
│  Backend API         │
│  (localhost:6543)    │
└──────┬───────────────┘
       │ 4. Validate & Save to DB
       ▼
┌──────────────────┐
│   PostgreSQL     │
│  real_estate_db  │
└──────┬───────────┘
       │ 5. Return response
       ▼
┌─────────────────┐
│ authService.js  │
│ - Save to       │
│   localStorage  │
└──────┬──────────┘
       │ 6. Update UI
       ▼
┌─────────────┐
│  Redirect   │
└─────────────┘
```

---

## 💾 Data yang Disimpan

### LocalStorage:
```javascript
{
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "role": "buyer",
    "phone": "081234567890"
  },
  "token": "abc123...",
  "userRole": "buyer"
}
```

### Session Cookies:
- Backend menggunakan signed cookie session
- Cookie otomatis dikirim setiap request dengan `axios.defaults.withCredentials = true`

---

## 🛠️ Fitur yang Sudah Implementasi

### ✅ Register Page
- Form validation (required fields)
- Password minimal 6 karakter
- Email format validation
- Loading state saat submit
- Error messages
- Success message & auto redirect ke login
- Disabled inputs saat loading

### ✅ Login Page
- Form validation
- API integration
- Loading state
- Error handling
- Auto redirect sesuai role:
  - Buyer → `/`
  - Agent → `/agent/dashboard`
- Show/hide password toggle

### ✅ Auth Service
- Register function
- Login function
- Logout function
- Get current user
- Check authentication status
- Get user from localStorage
- Error handling
- CORS support (withCredentials)

---

## 🐛 Troubleshooting

### CORS Error
**Problem:** `Access-Control-Allow-Origin` error

**Solution:**
- Pastikan backend running di `localhost:6543`
- Pastikan frontend running di `localhost:5173`
- Check CORS config di `backend/real_estate_api/__init__.py`

### Cannot Connect to API
**Problem:** `Network Error` atau `Cannot connect`

**Solution:**
- Pastikan backend server running
- Check URL di `authService.js` → `http://localhost:6543/api`
- Test dengan: `curl http://localhost:6543/api/me`

### Email Already Registered
**Problem:** Error saat register dengan email yang sama

**Solution:**
- Gunakan email berbeda
- Atau hapus user dari database:
```sql
DELETE FROM users WHERE email = 'test@example.com';
```

### Session Not Working
**Problem:** Logout atau `GET /api/me` tidak berfungsi

**Solution:**
- Pastikan `axios.defaults.withCredentials = true` di authService.js
- Check cookies di browser DevTools → Application → Cookies

---

## 📝 Next Steps

### Features to Implement:
1. **Protected Routes** - Route guard untuk halaman yang butuh auth
2. **Profile Page** - Edit user profile
3. **Property CRUD** - Agent bisa manage properties
4. **Favorites** - Buyer bisa save favorites
5. **Chat/Inquiry** - Komunikasi buyer-agent
6. **Search & Filter** - Search properties by location, price, etc.
7. **Image Upload** - Upload property photos

### Improvements:
1. JWT Token instead of session cookies
2. Remember me functionality
3. Password reset/forgot password
4. Email verification
5. Social login (Google, Facebook)
6. Better error handling
7. Form validation library (Formik, React Hook Form)
8. Toast notifications (react-toastify)

---

## 📚 API Documentation

Full API documentation: [backend/API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md)

---

## 🎉 Ready to Use!

Aplikasi sudah ready untuk digunakan:
- ✅ Database setup complete
- ✅ Backend API working
- ✅ Frontend connected
- ✅ Authentication working
- ✅ Error handling implemented

**Test sekarang dengan:**
1. Register user baru
2. Login dengan user tersebut
3. Check di database apakah user tersimpan

Happy coding! 🚀
