"""
Test script for Property API endpoints
"""
import requests
import json

BASE_URL = "http://localhost:6543"

def test_home():
    """Test home endpoint"""
    print("\n=== Test Home Endpoint ===")
    response = requests.get(f"{BASE_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_list_properties():
    """Test list properties endpoint"""
    print("\n=== Test List Properties ===")
    response = requests.get(f"{BASE_URL}/api/properties")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_create_property():
    """Test create property endpoint"""
    print("\n=== Test Create Property ===")
    
    # Data properti baru
    new_property = {
        "title": "Rumah Mewah Jakarta",
        "description": "Rumah 2 lantai dengan kolam renang pribadi",
        "price": 2500000000,
        "property_type": "house",
        "location": "Jakarta Selatan",
        "bedrooms": 4,
        "bathrooms": 3,
        "area": 250,
        "agent_id": 1  # ID agent dari database (Agus Agent)
    }
    
    response = requests.post(
        f"{BASE_URL}/api/properties",
        json=new_property,
        headers={"Content-Type": "application/json"}
    )
    
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    # Return property_id untuk test lainnya
    if response.status_code == 200:
        return response.json().get('data', {}).get('id')
    return None

def test_get_property_detail(property_id):
    """Test get property detail endpoint"""
    print(f"\n=== Test Get Property Detail (ID: {property_id}) ===")
    response = requests.get(f"{BASE_URL}/api/properties/{property_id}")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_create_property_validation():
    """Test create property with missing fields"""
    print("\n=== Test Create Property (Missing Fields) ===")
    
    # Data tidak lengkap
    incomplete_property = {
        "title": "Rumah Tanpa Deskripsi",
        "price": 500000000
    }
    
    response = requests.post(
        f"{BASE_URL}/api/properties",
        json=incomplete_property,
        headers={"Content-Type": "application/json"}
    )
    
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_create_property_non_agent():
    """Test create property with non-agent user"""
    print("\n=== Test Create Property (Non-Agent User) ===")
    
    new_property = {
        "title": "Test Property",
        "description": "Test description",
        "price": 1000000000,
        "property_type": "apartment",
        "location": "Jakarta",
        "agent_id": 2  # ID buyer dari database (Budi Buyer)
    }
    
    response = requests.post(
        f"{BASE_URL}/api/properties",
        json=new_property,
        headers={"Content-Type": "application/json"}
    )
    
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    print("=" * 50)
    print("Testing Property API Endpoints")
    print("=" * 50)
    
    try:
        # Test 1: Home endpoint
        test_home()
        
        # Test 2: List properties
        test_list_properties()
        
        # Test 3: Create new property (success)
        property_id = test_create_property()
        
        # Test 4: Get property detail
        if property_id:
            test_get_property_detail(property_id)
        
        # Test 5: Create property with validation error
        test_create_property_validation()
        
        # Test 6: Create property with non-agent user
        test_create_property_non_agent()
        
        print("\n" + "=" * 50)
        print("All tests completed!")
        print("=" * 50)
        
    except requests.exceptions.ConnectionError:
        print("\nError: Cannot connect to server. Make sure the backend is running on http://localhost:6543")
    except Exception as e:
        print(f"\nError: {e}")
