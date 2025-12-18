from sqlalchemy import create_engine, text

engine = create_engine('sqlite:///real_estate.db')
conn = engine.connect()

try:
    conn.execute(text("ALTER TABLE properties ADD COLUMN listing_type VARCHAR(20) DEFAULT 'sale'"))
    conn.commit()
    print("Column listing_type added successfully!")
except Exception as e:
    print(f"Error: {e}")
    print("Column might already exist, which is fine!")
finally:
    conn.close()
