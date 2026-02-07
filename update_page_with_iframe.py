"""
Update Page with Iframe (Strip Emojis)
=====================================
Attempts to update the tool page with the iframe but without emojis, 
to verify if emojis were the cause of the 500 error.
"""

import requests
import base64
import re
# from credentials import WP_CONFIG

WP_URL = 'https://poliinternational.com'
WP_USER = 'admin@poli-international.com'
WP_PASS = 'tYis iOef tZgr hj7w 1EE0 ym5G'

WP_CONFIG = {
    'username': WP_USER,
    'password': WP_PASS,
    'api_base': f'{WP_URL}/wp-json/wp/v2'
}

PAGE_ID = 4858 # Need to get the ID, but better to look up by slug
SLUG = 'tattoo-font-previewer'

def get_page_by_slug(slug):
    auth_string = f"{WP_CONFIG['username']}:{WP_CONFIG['password']}"
    auth_base64 = base64.b64encode(auth_string.encode('ascii')).decode('ascii')
    headers = {'Authorization': f'Basic {auth_base64}'}
    try:
        response = requests.get(f"{WP_CONFIG['api_base']}/pages?slug={slug}", headers=headers)
        if response.status_code == 200 and len(response.json()) > 0:
            return response.json()[0]['id']
    except:
        pass
    return None

def update_page():
    auth_string = f"{WP_CONFIG['username']}:{WP_CONFIG['password']}"
    auth_base64 = base64.b64encode(auth_string.encode('ascii')).decode('ascii')
    headers = {
        'Authorization': f'Basic {auth_base64}',
        'Content-Type': 'application/json'
    }

    # Get Page ID
    page_id = get_page_by_slug(SLUG)
    if not page_id:
        print("Page not found!")
        return

    print(f"Updating Page ID: {page_id}")

    # Read content
    with open('tattoo-font-previewer-page.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # STRATEGIC CLEANUP
    # 1. Remove Emojis
    clean_content = re.sub(r'[^\u0000-\uFFFF]', '', content)
    
    # 2. Keep Iframe? YES.
    # 3. Remove Script? YES, just to be safe for now.
    clean_content = re.sub(r'<script>.*?</script>', '', clean_content, flags=re.DOTALL)

    # Update
    page_data = {'content': clean_content}
    url = f"{WP_CONFIG['api_base']}/pages/{page_id}"
    
    print("Sending update with Iframe but NO Emojis...")
    response = requests.post(url, headers=headers, json=page_data)
    
    if response.status_code == 200:
        print("SUCCESS! Page updated with Iframe.")
    else:
        print(f"FAILED: {response.status_code}")
        print(response.text)

if __name__ == '__main__':
    update_page()
