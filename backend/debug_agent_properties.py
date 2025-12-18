import requests

BASE_URL = "http://localhost:6543"

# Test 1: Login as agent
print("=" * 60)
print("1. LOGIN AS AGENT (agent1@gmail.com)")
print("-" * 60)
login_response = requests.post(
    f"{BASE_URL}/api/auth/login",
    json={"email": "agent1@gmail.com", "password": "password123"},
    cookies={}
)
print(f"Status: {login_response.status_code}")
print(f"Response: {login_response.json()}")
cookies = login_response.cookies
print(f"Cookies: {dict(cookies)}")

# Test 2: Check current user
print("\n" + "=" * 60)
print("2. CHECK CURRENT USER (/api/auth/me)")
print("-" * 60)
me_response = requests.get(
    f"{BASE_URL}/api/auth/me",
    cookies=cookies
)
print(f"Status: {me_response.status_code}")
print(f"Response: {me_response.json()}")

# Test 3: Get agent properties
print("\n" + "=" * 60)
print("3. GET AGENT PROPERTIES")
print("-" * 60)
agent_props_response = requests.get(
    f"{BASE_URL}/api/agent/properties",
    cookies=cookies
)
print(f"Status: {agent_props_response.status_code}")
print(f"Response: {agent_props_response.json()}")

# Test 4: Get ALL properties to see what exists
print("\n" + "=" * 60)
print("4. GET ALL PROPERTIES (untuk cek apa yang ada)")
print("-" * 60)
all_props_response = requests.get(
    f"{BASE_URL}/api/properties",
    cookies=cookies
)
print(f"Status: {all_props_response.status_code}")
data = all_props_response.json()
print(f"Total properties: {len(data.get('data', []))}")
for prop in data.get('data', []):
    print(f"  - Property ID {prop['id']}: {prop['title']} (Agent ID: {prop.get('agent_id', 'N/A')})")
