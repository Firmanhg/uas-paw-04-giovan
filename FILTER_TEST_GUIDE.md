# Testing Filter Functionality

## Backend Sudah Diperbaiki ✅
- Hapus semua `__pycache__` yang lama (file kompilasi dari modul yang sudah dihapus)
- Backend API filter sudah support semua parameter

## Frontend Listing.jsx Sudah Diperbaiki ✅
Yang telah diperbaiki:
1. **HAPUS dummy data array** - Tidak lagi hardcode properties
2. **Connect ke API** - Menggunakan `getAllProperties()` dengan filter
3. **Filter inputs tersambung** - Semua input field punya `name`, `value`, `onChange`
4. **Tombol Apply & Reset** - Sudah ada `onClick` handler
5. **Loading & Empty state** - Tampilan saat loading dan tidak ada data
6. **Format data backend** - Menggunakan `bedrooms`, `bathrooms`, `price` (number)

## Cara Test Filter:

### 1. Start Backend
```powershell
cd "c:\Users\ASUS\TUBES PAW\uas-paw-04-giovan\backend"
.\venv\Scripts\Activate.ps1
python -m pyramid.scripts.pserve development.ini --reload
```
Backend akan running di: http://localhost:6543

### 2. Start Frontend
```powershell
cd "c:\Users\ASUS\TUBES PAW\uas-paw-04-giovan\uas-frontend"
npm run dev
```
Frontend akan running di: http://localhost:5173

### 3. Test Listing Page
Buka: http://localhost:5173/listing

### 4. Test Filter
Coba filter berikut:

**A. Filter by Location:**
- Ketik "Jakarta" di search location
- Klik "Apply Filters"
- Seharusnya hanya menampilkan properties di Jakarta

**B. Filter by Property Type:**
- Pilih "House" di dropdown
- Klik "Apply Filters"
- Seharusnya hanya menampilkan rumah (house)

**C. Filter by Price Range:**
- Min Price: 1000000 (1 juta)
- Max Price: 3000000 (3 juta)
- Klik "Apply Filters"
- Seharusnya hanya menampilkan properties di range tersebut

**D. Filter by Bedrooms:**
- Pilih "3+" bedrooms
- Klik "Apply Filters"
- Seharusnya hanya menampilkan properties dengan 3+ kamar

**E. Multiple Filters:**
- Location: "Jakarta"
- Property Type: "house"
- Min Bedrooms: "3"
- Klik "Apply Filters"
- Seharusnya menampilkan rumah di Jakarta dengan 3+ kamar

**F. Reset Filters:**
- Klik "Reset Filters"
- Seharusnya menampilkan semua properties lagi

### 5. Check Console
Buka Developer Tools (F12) → Console tab
Seharusnya melihat:
```
Fetched properties: [...]
```

### 6. Check Network
Di Developer Tools → Network tab
- Filter by "XHR"
- Cari request ke "properties"
- Check URL parameters (min_price, location, dll)

## Troubleshooting

### Filter tidak bekerja?
1. Check console untuk error messages
2. Pastikan backend running (buka http://localhost:6543/api/properties di browser)
3. Check Network tab untuk lihat request yang dikirim

### Properties tidak muncul?
1. Check database punya data: `python backend/check_db.py`
2. Test API langsung di browser: http://localhost:6543/api/properties

### CORS error?
- Restart backend server
- CORS sudah dikonfigurasi di backend `__init__.py`

## Filter Parameters yang Supported

Backend API menerima query parameters berikut:
- `location` - Search string (LIKE %term%)
- `property_type` - Exact match (house, apartment, villa, land)
- `min_price` - Minimum price (integer)
- `max_price` - Maximum price (integer)
- `min_bedrooms` - Minimum bedrooms (integer)
- `min_bathrooms` - Minimum bathrooms (integer)
- `agent_id` - Filter by agent (integer)

Example:
```
http://localhost:6543/api/properties?location=Jakarta&property_type=house&min_bedrooms=3
```
