"""
Script untuk switch database connection
"""
import os
import sys

def show_current_config():
    """Show current database configuration"""
    try:
        with open('development.ini', 'r', encoding='utf-8') as f:
            for line in f:
                if 'sqlalchemy.url' in line and not line.strip().startswith('#'):
                    print(f"Current database: {line.strip()}")
                    return
    except Exception as e:
        print(f"Error reading config: {e}")

def switch_to_cloud():
    """Switch to cloud database"""
    print("\n🌐 SETUP CLOUD DATABASE\n")
    print("1. Buka: https://www.elephantsql.com/")
    print("2. Sign up (Free)")
    print("3. Create New Instance → Tiny Turtle (Free)")
    print("4. Copy URL dari Details page")
    print("\nContoh URL:")
    print("postgresql://username:password@arjuna.db.elephantsql.com/username\n")
    
    cloud_url = input("Paste connection string ElephantSQL: ").strip()
    
    if not cloud_url or not cloud_url.startswith('postgresql://'):
        print("❌ Invalid connection string!")
        return
    
    # Backup current config
    try:
        with open('development.ini', 'r', encoding='utf-8') as f:
            content = f.read()
        
        with open('development.ini.backup', 'w', encoding='utf-8') as f:
            f.write(content)
        
        # Update connection string
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if 'sqlalchemy.url' in line and not line.strip().startswith('#'):
                lines[i] = f'sqlalchemy.url = {cloud_url}'
                break
        
        with open('development.ini', 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        
        print("\n✅ Configuration updated!")
        print("📋 Backup saved to: development.ini.backup")
        print("\n🔄 Next steps:")
        print("1. Restart backend server")
        print("2. Run: alembic -c development.ini upgrade head")
        print("3. Commit development.ini ke Git")
        print("4. Teman pull dan restart server\n")
        
    except Exception as e:
        print(f"❌ Error: {e}")

def switch_to_docker():
    """Switch back to Docker database"""
    docker_url = "postgresql://postgres:admin123@localhost/real_estate_db"
    
    try:
        with open('development.ini', 'r', encoding='utf-8') as f:
            content = f.read()
        
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if 'sqlalchemy.url' in line and not line.strip().startswith('#'):
                lines[i] = f'sqlalchemy.url = {docker_url}'
                break
        
        with open('development.ini', 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        
        print("\n✅ Switched back to Docker database!")
        print("🔄 Restart backend server\n")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == '__main__':
    print("=" * 60)
    print("DATABASE CONFIGURATION TOOL")
    print("=" * 60)
    
    show_current_config()
    
    print("\nOptions:")
    print("1. Switch to Cloud Database (shared)")
    print("2. Switch to Docker Database (local)")
    print("3. Exit")
    
    choice = input("\nPilih (1-3): ").strip()
    
    if choice == '1':
        switch_to_cloud()
    elif choice == '2':
        switch_to_docker()
    else:
        print("Bye!")
        sys.exit(0)
