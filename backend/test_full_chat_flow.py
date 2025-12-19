import requests
import time

# === KONFIGURASI ===
BASE_URL = "http://localhost:6543"
EMAIL = "anjay@gmail.com"        # Ganti jika perlu
PASSWORD = "anjay123"           # Ganti jika perlu
PROPERTY_ID = 22                   # Sesuaikan dengan properti yang valid

# === 1. LOGIN ===
print("1. Melakukan login...")
login_url = f"{BASE_URL}/api/auth/login"
login_data = {"email": EMAIL, "password": PASSWORD}

session = requests.Session()
login_resp = session.post(login_url, json=login_data)

if login_resp.status_code != 200:
    print("❌ Gagal login:", login_resp.json())
    exit(1)

user_data = login_resp.json()
user_id = user_data.get("user", {}).get("id")
user_role = user_data.get("user", {}).get("role")
print(f"✅ Login berhasil! User ID: {user_id}, Role: {user_role}")

# === 2. BUAT INQUIRY ===
print("\n2. Membuat inquiry...")
inquiry_url = f"{BASE_URL}/api/inquiries"
inquiry_data = {
    "property_id": PROPERTY_ID,
    "message": "Halo, saya tertarik dengan properti ini. Bisa kirim detail lebih lanjut?"
}

inquiry_resp = session.post(inquiry_url, json=inquiry_data)

# ✅ Terima baik 200 maupun 201 sebagai sukses
if inquiry_resp.status_code not in (200, 201):
    print("❌ Gagal membuat inquiry:", inquiry_resp.status_code, inquiry_resp.text)
    exit(1)

inquiry = inquiry_resp.json()
inquiry_id = inquiry.get("inquiry", {}).get("id")
if not inquiry_id:
    print("❌ Tidak ada inquiry_id ditemukan dalam respons!")
    print("Response:", inquiry)
    exit(1)

print(f"✅ Inquiry berhasil dibuat! Inquiry ID: {inquiry_id}")

# === 3. KIRIM PESAN CHAT ===
print("\n3. Mengirim pesan chat...")
chat_url = f"{BASE_URL}/api/inquiries/{inquiry_id}/messages"
chat_data = {
    "message": "Ini adalah pesan uji coba dari script otomatis!",
    "message_type": "text"
}

chat_resp = session.post(chat_url, json=chat_data)

print("Status:", chat_resp.status_code)
print("Response:", chat_resp.text)

if chat_resp.status_code == 200:
    print("\n✅ SEMUA LANGKAH BERHASIL!")
    print(f"   - User: {user_id} ({user_role})")
    print(f"   - Inquiry ID: {inquiry_id}")
    print(f"   - Pesan terkirim ke endpoint chat.")
else:
    print("\n❌ Gagal mengirim pesan.")