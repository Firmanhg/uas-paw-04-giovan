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
    
    print("Adding 'land_size' and 'building_size' columns to properties table...")
    
    # Add land_size column
    cursor.execute("""
        ALTER TABLE properties 
        ADD COLUMN IF NOT EXISTS land_size INTEGER DEFAULT 0
    """)
    
    # Add building_size column
    cursor.execute("""
        ALTER TABLE properties 
        ADD COLUMN IF NOT EXISTS building_size INTEGER DEFAULT 0
    """)
    
    # Copy data from 'area' to 'land_size' if area exists
    cursor.execute("""
        DO $$ 
        BEGIN
            IF EXISTS (SELECT 1 FROM information_schema.columns 
                      WHERE table_name='properties' AND column_name='area') THEN
                UPDATE properties SET land_size = area WHERE land_size = 0 OR land_size IS NULL;
            END IF;
        END $$;
    """)
    
    conn.commit()
    
    print("✅ Columns added successfully!")
    print("\nVerifying columns...")
    
    cursor.execute("""
        SELECT column_name, data_type, column_default 
        FROM information_schema.columns 
        WHERE table_name = 'properties' AND column_name IN ('land_size', 'building_size')
        ORDER BY column_name
    """)
    results = cursor.fetchall()
    
    for row in results:
        print(f"✅ Column: {row[0]} ({row[1]}) DEFAULT {row[2]}")
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
