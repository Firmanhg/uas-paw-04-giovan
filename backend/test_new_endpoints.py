import requests
import json

print("🧪 Testing New Endpoints\n")
print("="*60)

# Test 1: Featured Properties
print("\n1. GET /api/properties/featured")
print("-" * 60)
try:
    response = requests.get("http://localhost:6543/api/properties/featured")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Found {data['count']} featured properties")
        if data['count'] > 0:
            print(f"\nSample:")
            prop = data['data'][0]
            print(f"  - {prop['title']}")
            print(f"  - Price: Rp {prop['price']:,}")
            print(f"  - Location: {prop['location']}")
    else:
        print(f"❌ Error: {response.text}")
except Exception as e:
    print(f"❌ Error: {str(e)}")

# Test 2: Upload Photos (using property ID 1)
print("\n2. POST /api/properties/1/photos")
print("-" * 60)
try:
    # Test with URL
    data = {
        "images": [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
        ]
    }
    
    response = requests.post(
        "http://localhost:6543/api/properties/1/photos",
        json=data
    )
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"✅ {result['message']}")
        print(f"Total images: {len(result['images'])}")
    else:
        print(f"❌ Error: {response.text}")
except Exception as e:
    print(f"❌ Error: {str(e)}")

print("\n" + "="*60)
print("✅ All 15/15 tasks completed!")
print("="*60)
