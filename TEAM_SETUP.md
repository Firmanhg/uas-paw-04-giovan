# 🚀 Panduan Setup untuk Tim Development

## ✅ Database Setup (SUDAH SELESAI)

Project ini sudah menggunakan **Neon Cloud PostgreSQL** (Singapore region), sehingga semua developer dapat mengakses database yang sama tanpa setup tambahan.

**Connection String:** Sudah dikonfigurasi di `backend/development.ini`
```
postgresql://neondb_owner:npg_R4DbEZ9xCMFq@ep-weathered-fog-a12akjml-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

---

## 👥 Cara Teman Bergabung untuk Coding Backend

### **Step 1: Clone Repository**

Teman Anda clone repository ke komputer mereka:

```bash
# Clone repository (ganti dengan URL repo Anda)
git clone <URL_REPOSITORY>
cd uas-paw-04-giovan
```

---

### **Step 2: Setup Backend Environment**

```bash
# Masuk ke folder backend
cd backend

# Buat virtual environment
python -m venv venv

# Aktifkan virtual environment
# Untuk Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Untuk Windows CMD:
.\venv\Scripts\activate.bat

# Untuk Mac/Linux:
source venv/bin/activate
```

---

### **Step 3: Install Dependencies**

```bash
# Install semua package yang dibutuhkan
pip install -e .

# Verify installation
pip list | findstr pyramid  # Windows
pip list | grep pyramid     # Mac/Linux
```

---

### **Step 4: Verify Database Connection**

Database connection string sudah ada di `development.ini`, teman Anda TIDAK perlu mengubah apapun.

Test koneksi:

```bash
# Test koneksi ke Neon database
python -c "from sqlalchemy import create_engine; engine = create_engine('postgresql://neondb_owner:npg_R4DbEZ9xCMFq@ep-weathered-fog-a12akjml-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'); conn = engine.connect(); print('✅ Connected to database!'); conn.close()"
```

---

### **Step 5: Start Backend Server**

```bash
# Jalankan development server
python -m pyramid.scripts.pserve development.ini --reload

# Server akan berjalan di: http://localhost:6543
```

**Output yang diharapkan:**
```
Starting subprocess with file monitor
Starting server in PID 12345.
Serving on http://localhost:6543
```

---

### **Step 6: Test API Endpoint**

Buka browser atau gunakan curl/Postman untuk test:

```bash
# Test health check
curl http://localhost:6543/

# Test login (gunakan test account)
curl -X POST http://localhost:6543/api/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"agent@test.com\",\"password\":\"password123\"}"
```

---

## 🔄 Workflow Kolaborasi

### **Sebelum Mulai Coding:**

```bash
# Pull perubahan terbaru dari Git
git pull origin main

# Pastikan virtual environment aktif
# (venv) akan muncul di terminal

# Start backend server
python -m pyramid.scripts.pserve development.ini --reload
```

### **Saat Coding:**

1. **Database Otomatis Sync** ✅
   - Semua developer connect ke Neon Cloud yang sama
   - Data yang di-register/login langsung tersimpan dan terlihat semua developer
   - TIDAK perlu sync database manual

2. **Backend Code Changes** 📝
   - Edit file di `backend/real_estate_api/`
   - Server auto-reload dengan flag `--reload`
   - Changes langsung terlihat

3. **Database Schema Changes** 🗄️
   - Jika mengubah model (database structure):
   ```bash
   # Buat migration baru
   alembic revision --autogenerate -m "Deskripsi perubahan"
   
   # Apply migration
   alembic upgrade head
   
   # Commit migration file ke Git
   git add real_estate_api/alembic/versions/*
   git commit -m "Add migration: deskripsi"
   git push
   ```

### **Setelah Selesai Coding:**

```bash
# Add changes ke Git
git add .

# Commit dengan pesan yang jelas
git commit -m "Deskripsi perubahan yang dibuat"

# Push ke repository
git push origin main

# (Optional) Beritahu teman untuk pull
```

---

## 📊 Test Accounts (Shared Database)

Semua developer bisa login dengan account berikut:

| Role  | Email              | Password      | Keterangan              |
|-------|-------------------|---------------|------------------------|
| Agent | agent@test.com    | password123   | Test agent account     |
| Buyer | buyer@test.com    | password123   | Test buyer account     |
| Admin | admin@test.com    | password123   | Test admin account     |

**Note:** Data registration/login yang dibuat oleh siapapun akan langsung terlihat oleh semua developer!

---

## 🛠️ Troubleshooting

### **Problem: "No module named 'pyramid'"**
```bash
# Pastikan virtual environment aktif
.\venv\Scripts\Activate.ps1  # Windows PowerShell

# Install ulang dependencies
pip install -e .
```

### **Problem: "Connection refused" atau database error**
```bash
# Check internet connection (Neon database di cloud)
ping ep-weathered-fog-a12akjml-pooler.ap-southeast-1.aws.neon.tech

# Verify connection string di development.ini
# JANGAN ubah apapun, harus sama persis
```

### **Problem: "Port 6543 already in use"**
```bash
# Cek process yang pakai port
netstat -ano | findstr :6543  # Windows

# Kill process atau ganti port di development.ini:
[server:main]
listen = localhost:6544  # Ganti port
```

### **Problem: Git Merge Conflicts**
```bash
# Pull dengan rebase
git pull --rebase origin main

# Resolve conflicts di editor
# Kemudian:
git add .
git rebase --continue
```

---

## ⚠️ Important Notes

1. **JANGAN Ubah `development.ini`** - Connection string sudah benar
2. **SELALU Pull Sebelum Coding** - Hindari merge conflicts
3. **Commit Sering** - Lebih mudah track changes
4. **Test Sebelum Push** - Pastikan code tidak error
5. **Komunikasi Tim** - Beritahu jika ada breaking changes

---

### Setup .env:

1. **Install python-dotenv**
   ```bash
   pip install python-dotenv
   ```

2. **Buat file `.env`** (di folder backend):
   ```
   DATABASE_URL=postgresql://postgres:admin123@localhost/real_estate_db
   SECRET_KEY=your-secret-key-change-this
   ```

3. **Update `development.ini`** atau load dari .env:
   ```python
   import os
   from dotenv import load_dotenv
   
   load_dotenv()
   DATABASE_URL = os.getenv('DATABASE_URL')
   ```

4. **Add `.env` ke `.gitignore`**
   ```
   .env
   __pycache__/
   *.pyc
   ```

5. **Buat `.env.example`** untuk tim:
   ```
   DATABASE_URL=postgresql://postgres:password@localhost/real_estate_db
   SECRET_KEY=change-this-secret-key
   ```

---

## 📝 Workflow Tim

### Initial Setup (Sekali Saja):

1. Clone repository
   ```bash
   git clone <repo-url>
   cd uas-paw-04-giovan
   ```

2. Setup backend
   ```bash
   cd backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1  # Windows
   pip install -e .
   ```

3. Setup database (pilih salah satu option di atas)

4. Run migrations
   ```bash
   alembic -c development.ini upgrade head
   ```

5. Setup frontend
   ```bash
   cd ../uas-frontend
   npm install
   ```

### Daily Development:

```bash
# Terminal 1 - Backend
cd backend
.\venv\Scripts\Activate.ps1
python -m pyramid.scripts.pserve development.ini --reload

# Terminal 2 - Frontend
cd uas-frontend
npm run dev
```

---

## 🎯 Rekomendasi untuk Tim

### Untuk Development (Coding Bersama):
**Option 2 (Database Cloud)** - Paling mudah dan praktis
- ✅ Semua developer share 1 database
- ✅ Data sinkron otomatis
- ✅ Tidak perlu setup kompleks
- ⚠️ Hati-hati data bisa berubah oleh orang lain

### Untuk Development Individual:
**Option 3 (Docker)** - Best practice
- ✅ Setiap developer punya database sendiri
- ✅ Tidak bentrok antar developer
- ✅ Environment konsisten

### Untuk Production:
Pakai database cloud yang proper (bukan free tier).

---

## 🔄 Sync Database Structure

Jika ada perubahan schema/models:

1. Developer yang ubah model:
   ```bash
   alembic -c development.ini revision --autogenerate -m "Add new column"
   alembic -c development.ini upgrade head
   git add .
   git commit -m "Add migration: new column"
   git push
   ```

2. Developer lain:
   ```bash
   git pull
   alembic -c development.ini upgrade head
   ```

---

## 📞 Support

Jika ada masalah setup:
1. Check connection string di `development.ini`
2. Test koneksi: `python check_db.py`
3. Check PostgreSQL service running
4. Check firewall/port 5432

---

Pilih solusi yang paling cocok untuk tim Anda! 🚀
