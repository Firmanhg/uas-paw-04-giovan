import requests

base_url = "http://localhost:6543/api"

print("=" * 60)
print("TESTING PROPERTY FILTER API")
print("=" * 60)

# Test 1: Get all properties
print("\n1. GET ALL PROPERTIES (No Filter)")
print("-" * 60)
response = requests.get(f"{base_url}/properties")
print(f"Status: {response.status_code}")
data = response.json()
print(f"Total properties: {len(data.get('data', []))}")
if data.get('data'):
    print(f"First property: {data['data'][0]['title']} - {data['data'][0]['location']}")

# Test 2: Filter by location
print("\n2. FILTER BY LOCATION (Jakarta)")
print("-" * 60)
response = requests.get(f"{base_url}/properties?location=Jakarta")
print(f"Status: {response.status_code}")
data = response.json()
print(f"Properties found: {len(data.get('data', []))}")
for prop in data.get('data', []):
    print(f"  - {prop['title']} ({prop['location']})")

# Test 3: Filter by property_type
print("\n3. FILTER BY PROPERTY TYPE (house)")
print("-" * 60)
response = requests.get(f"{base_url}/properties?property_type=house")
print(f"Status: {response.status_code}")
data = response.json()
print(f"Properties found: {len(data.get('data', []))}")
for prop in data.get('data', []):
    print(f"  - {prop['title']} ({prop['property_type']})")

# Test 4: Filter by price range
print("\n4. FILTER BY PRICE RANGE (1M - 3M)")
print("-" * 60)
response = requests.get(f"{base_url}/properties?min_price=1000000&max_price=3000000")
print(f"Status: {response.status_code}")
data = response.json()
print(f"Properties found: {len(data.get('data', []))}")
for prop in data.get('data', []):
    print(f"  - {prop['title']} (Rp {prop['price']:,})")

# Test 5: Filter by bedrooms
print("\n5. FILTER BY BEDROOMS (3+)")
print("-" * 60)
response = requests.get(f"{base_url}/properties?min_bedrooms=3")
print(f"Status: {response.status_code}")
data = response.json()
print(f"Properties found: {len(data.get('data', []))}")
for prop in data.get('data', []):
    print(f"  - {prop['title']} ({prop['bedrooms']} beds)")

# Test 6: Multiple filters
print("\n6. MULTIPLE FILTERS (house + Jakarta + 3+ beds)")
print("-" * 60)
response = requests.get(f"{base_url}/properties?property_type=house&location=Jakarta&min_bedrooms=3")
print(f"Status: {response.status_code}")
data = response.json()
print(f"Properties found: {len(data.get('data', []))}")
for prop in data.get('data', []):
    print(f"  - {prop['title']} ({prop['property_type']}, {prop['location']}, {prop['bedrooms']} beds)")

print("\n" + "=" * 60)
print("TEST COMPLETED")
print("=" * 60)
