"""
Script untuk update ke Neon database
"""
import sys

def update_to_neon():
    """Update development.ini to use Neon database"""
    
    print("=" * 70)
    print("UPDATE TO NEON DATABASE")
    print("=" * 70)
    print()
    print("📋 Steps:")
    print("1. Go to: https://neon.tech")
    print("2. Sign up (free) with GitHub/Google")
    print("3. Create project: real-estate-app")
    print("4. Copy connection string from dashboard")
    print()
    print("Connection string format:")
    print("postgresql://user:pass@host.region.neon.tech/neondb?sslmode=require")
    print()
    
    neon_url = input("Paste Neon connection string: ").strip()
    
    if not neon_url:
        print("\n❌ No connection string provided!")
        return
    
    if not neon_url.startswith('postgresql://'):
        print("\n❌ Invalid connection string!")
        print("Must start with: postgresql://")
        return
    
    # Backup original file
    try:
        with open('development.ini', 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Save backup
        with open('development.ini.backup', 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("\n✅ Backup saved: development.ini.backup")
        
        # Update connection string
        lines = content.split('\n')
        updated = False
        
        for i, line in enumerate(lines):
            if 'sqlalchemy.url' in line and not line.strip().startswith('#'):
                old_url = line.strip()
                lines[i] = f'sqlalchemy.url = {neon_url}'
                updated = True
                print(f"\n📝 Updated:")
                print(f"   FROM: {old_url}")
                print(f"   TO:   sqlalchemy.url = {neon_url[:50]}...")
                break
        
        if not updated:
            print("\n❌ Could not find sqlalchemy.url in development.ini")
            return
        
        # Write updated content
        with open('development.ini', 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        
        print("\n✅ development.ini updated!")
        print("\n" + "=" * 70)
        print("NEXT STEPS:")
        print("=" * 70)
        print()
        print("1. Run migrations:")
        print("   alembic -c development.ini upgrade head")
        print()
        print("2. (Optional) Seed test data:")
        print("   python seed_data.py")
        print()
        print("3. Restart backend server:")
        print("   python -m pyramid.scripts.pserve development.ini --reload")
        print()
        print("4. Commit to Git:")
        print("   git add development.ini")
        print('   git commit -m "Switch to Neon database"')
        print("   git push")
        print()
        print("5. Teman pull & restart:")
        print("   git pull")
        print("   (restart backend server)")
        print()
        print("✅ Data akan sync antar developer!")
        print()
        
    except FileNotFoundError:
        print("\n❌ development.ini not found!")
        print("Make sure you run this from backend/ folder")
    except Exception as e:
        print(f"\n❌ Error: {e}")

if __name__ == '__main__':
    update_to_neon()
