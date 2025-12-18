import psycopg2

try:
    conn = psycopg2.connect(
        dbname="real_estate_db",
        user="postgres",
        password="admin123",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    
    # Get all users
    cursor.execute("SELECT id, email, name, role FROM users ORDER BY id")
    users = cursor.fetchall()
    
    print("=" * 80)
    print("USERS IN DATABASE:")
    print("=" * 80)
    for user in users:
        print(f"ID: {user[0]:3d} | Email: {user[1]:30s} | Name: {user[2]:20s} | Role: {user[3]}")
    
    print("\n" + "=" * 80)
    print("AGENTS ONLY:")
    print("=" * 80)
    cursor.execute("SELECT id, email, name FROM users WHERE role = 'agent' ORDER BY id")
    agents = cursor.fetchall()
    for agent in agents:
        print(f"ID: {agent[0]:3d} | Email: {agent[1]:30s} | Name: {agent[2]}")
    
    print("\n" + "=" * 80)
    print("PROPERTIES WITH AGENT INFO:")
    print("=" * 80)
    cursor.execute("""
        SELECT p.id, p.title, p.agent_id, u.name as agent_name, u.email as agent_email
        FROM properties p
        LEFT JOIN users u ON p.agent_id = u.id
        ORDER BY p.id
    """)
    properties = cursor.fetchall()
    for prop in properties:
        print(f"Property ID: {prop[0]:3d} | {prop[1]:40s} | Agent: {prop[2] or 'None':3s} | {prop[3] or 'N/A':20s} ({prop[4] or 'N/A'})")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")
