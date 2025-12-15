"""
Test script untuk API Register dan Login
"""
import requests
import json

BASE_URL = "http://localhost:6543"

def test_register():
    """Test registrasi user baru"""
    print("\n🔵 Testing REGISTER endpoint...")
    
    # Test register buyer
    buyer_data = {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123",
        "role": "buyer",
        "phone": "081234567890"
    }
    
    response = requests.post(f"{BASE_URL}/api/register", json=buyer_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    # Test register agent
    agent_data = {
        "name": "Agent Smith",
        "email": "agent@example.com",
        "password": "agent123",
        "role": "agent",
        "phone": "081234567891"
    }
    
    response = requests.post(f"{BASE_URL}/api/register", json=agent_data)
    print(f"\nAgent Registration:")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")


def test_login():
    """Test login user"""
    print("\n🔵 Testing LOGIN endpoint...")
    
    login_data = {
        "email": "john@example.com",
        "password": "password123"
    }
    
    response = requests.post(f"{BASE_URL}/api/login", json=login_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 200:
        return response.cookies
    return None


def test_current_user(cookies):
    """Test get current user"""
    print("\n🔵 Testing GET CURRENT USER endpoint...")
    
    response = requests.get(f"{BASE_URL}/api/me", cookies=cookies)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")


def test_logout(cookies):
    """Test logout"""
    print("\n🔵 Testing LOGOUT endpoint...")
    
    response = requests.post(f"{BASE_URL}/api/logout", cookies=cookies)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")


if __name__ == "__main__":
    print("=" * 60)
    print("🧪 TESTING AUTHENTICATION API ENDPOINTS")
    print("=" * 60)
    
    try:
        # Test register
        test_register()
        
        # Test login
        cookies = test_login()
        
        if cookies:
            # Test get current user
            test_current_user(cookies)
            
            # Test logout
            test_logout(cookies)
        
        print("\n" + "=" * 60)
        print("✅ ALL TESTS COMPLETED")
        print("=" * 60)
        
    except requests.exceptions.ConnectionError:
        print("\n❌ ERROR: Cannot connect to server!")
        print("Make sure the server is running: pserve development.ini")
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
