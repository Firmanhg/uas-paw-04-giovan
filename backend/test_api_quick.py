import requests

try:
    response = requests.get('http://localhost:6543/api/properties/1')
    print("Status:", response.status_code)
    print("Response JSON:")
    import json
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print("Error:", e)
