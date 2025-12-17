import sqlite3

conn = sqlite3.connect('real_estate.sqlite')
cursor = conn.cursor()

print("=== USERS ===")
cursor.execute("SELECT id, email, name, role FROM users")
for row in cursor.fetchall():
    print(f"ID: {row[0]}, Email: {row[1]}, Name: {row[2]}, Role: {row[3]}")

print("\n=== PROPERTIES ===")
cursor.execute("SELECT id, title, agent_id, price FROM properties")
for row in cursor.fetchall():
    print(f"ID: {row[0]}, Title: {row[1]}, Agent ID: {row[2]}, Price: {row[3]}")

conn.close()
