import psycopg2

try:
    # Connect to PostgreSQL
    conn = psycopg2.connect(
        dbname="real_estate_db",
        user="postgres",
        password="admin123",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    
    print("Adding 'listing_type' column to properties table...")
    
    # Add listing_type column (sale or rent)
    cursor.execute("""
        ALTER TABLE properties 
        ADD COLUMN IF NOT EXISTS listing_type VARCHAR(10) DEFAULT 'sale' NOT NULL;
    """)
    
    # Add check constraint
    cursor.execute("""
        ALTER TABLE properties
        DROP CONSTRAINT IF EXISTS listing_type_check;
    """)
    
    cursor.execute("""
        ALTER TABLE properties
        ADD CONSTRAINT listing_type_check CHECK (listing_type IN ('sale', 'rent'));
    """)
    
    conn.commit()
    print("✅ Column 'listing_type' added successfully!")
    
    # Verify
    cursor.execute("""
        SELECT column_name, data_type, column_default
        FROM information_schema.columns
        WHERE table_name = 'properties' AND column_name = 'listing_type';
    """)
    
    result = cursor.fetchone()
    if result:
        print(f"\nVerifying column...")
        print(f"✅ Column exists: {result[0]} ({result[1]}) DEFAULT {result[2]}")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
