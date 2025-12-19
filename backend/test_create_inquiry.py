import requests

# Ganti dengan session Anda
SESSION_VALUE = "NitM3iIHLOqs74aIROK10q1Jg6VdhrBcmwBGmnNHFs_lyDguVH1kQ9i1Z-BBXKBIfeGA9UMgaOCSUTTbl6eE8lsxNzY2MTI2ODcwLCAxNzY2MDUxNDgxLjczMzQ0NSwgeyJ1c2VyX2lkIjogMjksICJyb2xlIjogImJ1eWVyIn1d"

url = "http://localhost:6543/api/inquiries"
cookies = {"session": SESSION_VALUE}

# Ganti property_id sesuai yang ada di database
payload = {
    "property_id": 1,
    "message": "Saya tertarik dengan properti ini."
}

response = requests.post(url, json=payload, cookies=cookies)
print("Status:", response.status_code)
print("Response:", response.json())
