import requests

# Ganti dengan session Anda
SESSION_VALUE = "NitM3iIHLOqs74aIROK10q1Jg6VdhrBcmwBGmnNHFs_lyDguVH1kQ9i1Z-BBXKBIfeGA9UMgaOCSUTTbl6eE8lsxNzY2MTI2ODcwLCAxNzY2MDUxNDgxLjczMzQ0NSwgeyJ1c2VyX2lkIjogMjksICJyb2xlIjogImJ1eWVyIn1d"
INQUIRY_ID = 3  # Ganti jika inquiry id berbeda

url = f"http://localhost:6543/api/inquiries/{INQUIRY_ID}/messages"
cookies = {"session": SESSION_VALUE}

response = requests.get(url, cookies=cookies)
print("Status:", response.status_code)
print("Response:", response.text)
