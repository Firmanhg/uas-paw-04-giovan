# ⚡ Quick Start untuk Teman (Backend)

## 📋 Prerequisites
- Python 3.8+
- Git

## 🚀 Setup (5 menit)

### 1️⃣ Clone Repository
```bash
git clone <URL_REPOSITORY>
cd uas-paw-04-giovan/backend
```

### 2️⃣ Setup Virtual Environment
```bash
# Buat venv
python -m venv venv

# Aktifkan (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Aktifkan (Windows CMD)
.\venv\Scripts\activate.bat
```

### 3️⃣ Install Dependencies
```bash
pip install -e .
```

### 4️⃣ Start Server
```bash
python -m pyramid.scripts.pserve development.ini --reload
```

✅ **Server running di:** `http://localhost:6543`

---

## 🎯 Test API

### Browser:
```
http://localhost:6543/
```

### PowerShell:
```powershell
# Test health check
Invoke-RestMethod -Uri http://localhost:6543/ -Method GET

# Test login
$body = @{email="agent@test.com"; password="password123"} | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:6543/api/login -Method POST -Body $body -ContentType "application/json"
```

---

## 📊 Test Accounts

| Email              | Password      | Role  |
|-------------------|---------------|-------|
| agent@test.com    | password123   | Agent |
| buyer@test.com    | password123   | Buyer |

---

## 🔧 Development Workflow

```bash
# Setiap kali mulai coding:
git pull origin main
.\venv\Scripts\Activate.ps1
python -m pyramid.scripts.pserve development.ini --reload

# Setelah selesai:
git add .
git commit -m "Deskripsi perubahan"
git push origin main
```

---

## 📁 File Locations

- **API Routes:** `real_estate_api/routes.py`
- **API Views:** `real_estate_api/views/`
- **Database Models:** `real_estate_api/models/`
- **Configuration:** `development.ini`

---

## ❓ Troubleshooting

**"No module named 'pyramid'"**
```bash
pip install -e .
```

**"Port already in use"**
```bash
# Cek process
netstat -ano | findstr :6543

# Atau ganti port di development.ini
```

**Database connection error**
- Connection string sudah benar di `development.ini`
- JANGAN diubah!
- Check internet connection (database di cloud)

---

## 💡 Tips

- ✅ Database sudah shared via Neon Cloud - data sync otomatis!
- ✅ Server auto-reload saat file berubah (flag `--reload`)
- ✅ Commit sering untuk hindari conflicts
- ✅ Pull sebelum mulai coding
- ✅ Test endpoint sebelum push

---

## 📚 More Info

- Full setup guide: [TEAM_SETUP.md](TEAM_SETUP.md)
- API documentation: [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)
- Frontend setup: [uas-frontend/README.md](uas-frontend/README.md)
