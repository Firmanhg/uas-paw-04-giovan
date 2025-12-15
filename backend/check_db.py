import psycopg2

# Connect to database
conn = psycopg2.connect('postgresql://postgres:admin123@localhost/real_estate_db')
cur = conn.cursor()

# Get all tables
cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
tables = cur.fetchall()

print('\n✅ DATABASE SETUP SUCCESS!\n')
print('Tables created in real_estate_db:')
for table in tables:
    print(f'  ✓ {table[0]}')

# Get column info for users table
print('\n📋 Users Table Columns:')
cur.execute("""
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name='users'
    ORDER BY ordinal_position
""")
columns = cur.fetchall()
for col in columns:
    print(f'  - {col[0]}: {col[1]}')

conn.close()
print('\n🎉 Database is ready to use!')
