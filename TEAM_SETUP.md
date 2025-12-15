# 🚀 Setup Database untuk Tim Development

## Pilihan Setup Database

### Option 1: PostgreSQL Lokal (Setiap Developer)

Setiap anggota tim install PostgreSQL di komputer masing-masing.

#### Langkah Setup:

1. **Install PostgreSQL**
   - Download dari: https://www.postgresql.org/download/
   - Install dengan password: `admin123` (atau sesuai kesepakatan)

2. **Buat Database**
   ```sql
   CREATE DATABASE real_estate_db;
   ```

3. **Update Connection String**
   Edit `backend/development.ini`:
   ```ini
   sqlalchemy.url = postgresql://postgres:admin123@localhost/real_estate_db
   ```

4. **Run Migrations**
   ```bash
   cd backend
   alembic -c development.ini upgrade head
   ```

5. **Test Connection**
   ```bash
   python check_db.py
   ```

---

### Option 2: Database Cloud (Shared - Recommended)

Semua tim pakai database yang sama di cloud.

#### A. ElephantSQL (Free 20MB)

1. Daftar: https://www.elephantsql.com/
2. Buat instance "Tiny Turtle" (Free)
3. Copy URL: `postgres://username:password@host.db.elephantsql.com/database`
4. Update `development.ini`:
   ```ini
   sqlalchemy.url = postgres://username:password@host.db.elephantsql.com/database
   ```

#### B. Neon (Free - Modern)

1. Daftar: https://neon.tech/
2. Buat project baru
3. Copy connection string
4. Update `development.ini`

#### C. Supabase (Free - Full Featured)

1. Daftar: https://supabase.com/
2. Buat project
3. Dapatkan connection string di Settings → Database
4. Update `development.ini`

---

### Option 3: Docker (Best Practice)

Gunakan Docker untuk standardisasi environment.

#### Setup Docker PostgreSQL:

1. **Buat file `docker-compose.yml`** di root project:
   ```yaml
   version: '3.8'
   services:
     postgres:
       image: postgres:15
       environment:
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: admin123
         POSTGRES_DB: real_estate_db
       ports:
         - "5432:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data

   volumes:
     postgres_data:
   ```

2. **Install Docker Desktop**
   - Download: https://www.docker.com/products/docker-desktop/

3. **Jalankan Database**
   ```bash
   docker-compose up -d
   ```

4. **Stop Database**
   ```bash
   docker-compose down
   ```

5. **Connection String tetap sama**
   ```ini
   sqlalchemy.url = postgresql://postgres:admin123@localhost/real_estate_db
   ```

**Keuntungan Docker:**
- ✅ Semua developer pakai versi PostgreSQL yang sama
- ✅ Setup sekali, tinggal `docker-compose up`
- ✅ Tidak bentrok dengan install lokal
- ✅ Bisa share dengan `.env` file

---

### Option 4: Git + Migration Files

Share database structure via migrations, bukan database itu sendiri.

#### Setup:

1. **Commit migration files ke Git**
   ```bash
   git add backend/real_estate_api/alembic/versions/
   git commit -m "Add database migrations"
   git push
   ```

2. **Teman pull dan run migrations**
   ```bash
   git pull
   cd backend
   alembic -c development.ini upgrade head
   ```

3. **(Optional) Seed Data Script**
   Buat script untuk insert data dummy:
   ```bash
   python seed_data.py
   ```

---

## 🔐 Environment Variables (.env)

Untuk keamanan, jangan hardcode connection string di code.

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
