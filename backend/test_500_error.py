import requests

print("Testing endpoints...")

# Test 1: Get properties by agent
print("\n1. GET /api/properties?agent_id=25")
try:
    r = requests.get("http://localhost:6543/api/properties?agent_id=25", cookies={})
    print(f"Status: {r.status_code}")
    if r.status_code == 500:
        print(f"Error: {r.text[:500]}")
    else:
        print(f"Response: {r.json()}")
except Exception as e:
    print(f"Error: {e}")

# Test 2: Get agent profile
print("\n2. GET /api/agents/25")
try:
    r = requests.get("http://localhost:6543/api/agents/25", cookies={})
    print(f"Status: {r.status_code}")
    if r.status_code == 500:
        print(f"Error: {r.text[:500]}")
    else:
        print(f"Response: {r.json()}")
except Exception as e:
    print(f"Error: {e}")
