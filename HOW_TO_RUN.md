# 🚀 Panduan Menjalankan Frontend & Backend

## 📋 Prerequisites

Pastikan sudah terinstall:
- ✅ Python 3.8+ 
- ✅ Node.js & npm
- ✅ Git

---

## 🔧 BACKEND (Python/Pyramid)

### 1️⃣ Setup Backend (Hanya Sekali)

```powershell
# Masuk ke folder backend
cd backend

# Aktifkan virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies (jika belum)
pip install -e .

# Setup database (jika belum)
alembic -c development.ini upgrade head
initialize_real_estate_api_db development.ini
```

### 2️⃣ Jalankan Backend Server

**Option A: Dengan Auto-Reload (Development)**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python -m pyramid.scripts.pserve development.ini --reload
```

**Option B: Tanpa Auto-Reload**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python -m pyramid.scripts.pserve development.ini
```

✅ **Backend running di:** `http://localhost:6543`

### 3️⃣ Test Backend API

Buka Thunder Client atau browser:
- Home: `http://localhost:6543`
- Properties: `http://localhost:6543/api/properties`

---

## 🎨 FRONTEND (React/Vite)

### 1️⃣ Setup Frontend (Hanya Sekali)

```powershell
# Masuk ke folder frontend
cd uas-frontend

# Install dependencies
npm install
```

### 2️⃣ Jalankan Frontend Server

```powershell
cd uas-frontend
npm run dev
```

✅ **Frontend running di:** `http://localhost:5173` (atau port yang ditampilkan di terminal)

### 3️⃣ Build Production (Optional)

```powershell
cd uas-frontend
npm run build
```

---

## 🔄 Menjalankan Keduanya Bersamaan

### **Terminal 1 - Backend:**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python -m pyramid.scripts.pserve development.ini --reload
```
✅ Backend: `http://localhost:6543`

### **Terminal 2 - Frontend:**
```powershell
cd uas-frontend
npm run dev
```
✅ Frontend: `http://localhost:5173`

---

## 🛑 Cara Stop Server

- **Tekan:** `Ctrl + C` di terminal
- Atau tutup terminal

---

## 📝 Quick Start Commands

### Backend (dari root project):
```powershell
cd backend; .\venv\Scripts\Activate.ps1; python -m pyramid.scripts.pserve development.ini --reload
```

### Frontend (dari root project):
```powershell
cd uas-frontend; npm run dev
```

---

## ✅ Checklist

**Backend Ready:**
- [ ] Virtual environment aktif `(venv)`
- [ ] Server running di port 6543
- [ ] Bisa akses `http://localhost:6543`

**Frontend Ready:**
- [ ] npm dependencies terinstall
- [ ] Server running (port biasanya 5173)
- [ ] Bisa akses frontend di browser

---

## 🐛 Troubleshooting

### Backend tidak jalan?
```powershell
# Pastikan di folder backend
cd backend

# Aktifkan venv
.\venv\Scripts\Activate.ps1

# Reinstall
pip install -e .

# Jalankan lagi
python -m pyramid.scripts.pserve development.ini --reload
```

### Frontend tidak jalan?
```powershell
# Pastikan di folder frontend
cd uas-frontend

# Install ulang dependencies
rm -rf node_modules
npm install

# Jalankan lagi
npm run dev
```

### Port sudah digunakan?
```powershell
# Cek port 6543 (backend)
netstat -ano | findstr :6543

# Cek port 5173 (frontend)
netstat -ano | findstr :5173

# Kill process jika perlu (ganti PID)
taskkill /PID <PID> /F
```

---

## 📊 API Endpoints (Backend)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/properties` | List properties (with filters) |
| GET | `/api/properties/{id}` | Get property detail |
| POST | `/api/properties` | Create property |
| PUT | `/api/properties/{id}` | Update property |
| DELETE | `/api/properties/{id}?agent_id=1` | Delete property |

**Filter Parameters:**
- `min_price`, `max_price`
- `property_type`
- `location`
- `min_bedrooms`, `max_bedrooms`
- `min_bathrooms`
- `agent_id`

---

## 💡 Tips

1. **Selalu jalankan backend DULU, baru frontend**
2. **Gunakan 2 terminal terpisah** untuk backend & frontend
3. **Jangan tutup terminal** saat server berjalan
4. **Auto-reload** akan restart server otomatis saat file berubah
5. **Thunder Client** bagus untuk test API

---

## 🎯 Development Workflow

1. Start backend server
2. Start frontend server  
3. Test API di Thunder Client
4. Buka frontend di browser
5. Develop & test
6. Stop servers dengan `Ctrl+C`

---

Happy Coding! 🚀
