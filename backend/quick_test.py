import requests

print("Testing API endpoint...")
try:
    response = requests.get("http://localhost:6543/api/properties")
    print(f"Status Code: {response.status_code}")
    print(f"Response JSON:")
    data = response.json()
    print(f"  status: {data.get('status')}")
    print(f"  data length: {len(data.get('data', []))}")
    if data.get('data'):
        print(f"\nFirst property:")
        prop = data['data'][0]
        for key, value in prop.items():
            print(f"    {key}: {value}")
except Exception as e:
    print(f"ERROR: {e}")
