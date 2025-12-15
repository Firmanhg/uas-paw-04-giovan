# 🗄️ Panduan Setup Database Real Estate API

## Struktur Database

### Tabel yang Dibuat:
1. **users** - Menyimpan data buyer dan agent
2. **properties** - Menyimpan data properti
3. **property_photos** - Menyimpan foto-foto properti
4. **favorites** - Menyimpan properti favorit user
5. **inquiries** - Menyimpan pesan/inquiry dari buyer ke agent

---

## 📝 Langkah-langkah Setup

### **Step 1: Install PostgreSQL**
Pastikan PostgreSQL sudah terinstall di komputer Anda.
- Download dari: https://www.postgresql.org/download/
- Install dan catat username & password

### **Step 2: Buat Database**
Buka PostgreSQL (pgAdmin atau terminal) dan jalankan:

```sql
CREATE DATABASE real_estate_db;
```

### **Step 3: Setup Python Virtual Environment**

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
```

### **Step 4: Install Dependencies**

```bash
# Install semua package yang dibutuhkan
pip install -e .

# Install additional packages
pip install psycopg2-binary bcrypt pyramid-cors
```

### **Step 5: Konfigurasi Database Connection**

Edit file `development.ini` dan sesuaikan connection string:

```ini
sqlalchemy.url = postgresql://USERNAME:PASSWORD@localhost/real_estate_db
```

Ganti:
- `USERNAME` dengan username PostgreSQL Anda
- `PASSWORD` dengan password PostgreSQL Anda

### **Step 6: Initialize Database Schema**

```bash
# Generate migration script
alembic revision --autogenerate -m "Initial tables"

# Apply migrations ke database
alembic upgrade head
```

### **Step 7: (Opsional) Seed Data Awal**

Anda bisa menambahkan data dummy untuk testing:

```bash
# Jalankan script initialize database
initialize_real_estate_api_db development.ini
```

### **Step 8: Jalankan Server**

```bash
pserve development.ini --reload
```

Server akan berjalan di: **http://localhost:6543**

---

## 🔧 Troubleshooting

### Error: "Cannot connect to database"
- Pastikan PostgreSQL service sudah running
- Cek username, password, dan nama database di `development.ini`

### Error: "Module not found"
- Pastikan virtual environment sudah diaktifkan
- Jalankan `pip install -e .` lagi

### Error: "Alembic command not found"
- Install ulang: `pip install alembic`

---

## 📊 Schema Database Detail

### **users**
```
id (PK)         : Integer
name            : String(100)
email           : String(100) - Unique
password_hash   : String(255)
role            : Enum('buyer', 'agent')
phone           : String(20)
```

### **properties**
```
id (PK)         : Integer
agent_id (FK)   : Integer → users.id
title           : String(200)
description     : Text
price           : Integer
property_type   : Enum('house', 'apartment', 'villa', 'land')
location        : String(200)
bedrooms        : Integer
bathrooms       : Integer
area            : Integer (m²)
created_at      : DateTime
```

### **property_photos**
```
id (PK)         : Integer
property_id (FK): Integer → properties.id
photo_url       : String(500)
```

### **favorites**
```
id (PK)         : Integer
user_id (FK)    : Integer → users.id
property_id (FK): Integer → properties.id
created_at      : DateTime
```

### **inquiries**
```
id (PK)         : Integer
property_id (FK): Integer → properties.id
buyer_id (FK)   : Integer → users.id
message         : Text
date            : DateTime
```

---

## 🔐 Password Hashing

Untuk hash password, gunakan bcrypt:

```python
import bcrypt

# Hash password
password = "mypassword"
hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

# Verify password
is_valid = bcrypt.checkpw(password.encode('utf-8'), hashed)
```

---

## 📌 Next Steps

1. ✅ Setup database selesai
2. 🔨 Buat API endpoints untuk CRUD operations
3. 🔐 Implement authentication & authorization
4. 🌐 Connect dengan frontend React

