#!/usr/bin/env python3
"""WordPress Page Creator for Tattoo Font Previewer"""

import requests
import base64
import json
import re

WP_URL = 'https://poliinternational.com'
WP_USER = 'admin@poli-international.com'
WP_PASS = 'tYis iOef tZgr hj7w 1EE0 ym5G'

def get_page_by_slug(slug):
    """Check if page exists by slug."""
    auth_string = f'{WP_USER}:{WP_PASS}'
    auth = base64.b64encode(auth_string.encode()).decode('ascii')
    headers = {'Authorization': f'Basic {auth}'}
    
    try:
        response = requests.get(
            f'{WP_URL}/wp-json/wp/v2/pages?slug={slug}',
            headers=headers
        )
        if response.status_code == 200:
            data = response.json()
            if data and len(data) > 0:
                print(f"Found existing page: {data[0]['id']}")
                return data[0]['id']
    except Exception as e:
        print(f"Error checking slug: {e}")
    return None

def create_or_update_page(title, slug, content, meta_desc):
    auth_string = f'{WP_USER}:{WP_PASS}'
    auth = base64.b64encode(auth_string.encode()).decode('ascii')
    
    headers = {
        'Authorization': f'Basic {auth}',
        'Content-Type': 'application/json'
    }
    
    page_data = {
        'title': title,
        'slug': slug,
        'content': content,
        'status': 'publish',
        'meta': {
            'rank_math_title': title + ' | Poli International',
            'rank_math_description': meta_desc,
            'rank_math_focus_keyword': 'tattoo font previewer'
        }
    }
    
    # Check if exists
    page_id = get_page_by_slug(slug)
    
    if page_id:
        # Update
        print(f"Updating page {page_id}...")
        url = f'{WP_URL}/wp-json/wp/v2/pages/{page_id}'
        response = requests.post(url, headers=headers, json=page_data)
    else:
        # Create
        print(f"Creating new page...")
        url = f'{WP_URL}/wp-json/wp/v2/pages'
        response = requests.post(url, headers=headers, json=page_data)
    
    if response.status_code in [200, 201]:
        print(f'Success: {response.json().get("link")}')
        return True
    
    # If failed with 500, try partial content (remove script, iframe, and emojis)
    if response.status_code == 500:
        print("Failed with 500. Retrying without <script>, <iframe>, and emojis...")
        # Remove script tag content
        clean_content = re.sub(r'<script>.*?</script>', '', content, flags=re.DOTALL)
        # Remove iframe tag
        clean_content = re.sub(r'<iframe.*?>.*?</iframe>', '<!-- Iframe removed due to security restrictions -->', clean_content, flags=re.DOTALL)
        # Remove emojis (non-BMP characters)
        clean_content = clean_content.encode('utf-8', 'ignore').decode('utf-8')
        # Actually proper emoji removal for matched chars
        clean_content = re.sub(r'[^\u0000-\uFFFF]', '', clean_content)
        
        page_data['content'] = clean_content
        
        if page_id:
            response = requests.post(url, headers=headers, json=page_data)
        else:
            response = requests.post(url, headers=headers, json=page_data)
            
        if response.status_code in [200, 201]:
             print(f'Success (cleaned content): {response.json().get("link")}')
             return True

    print(f'Failed: {response.status_code}')
    try:
        print(response.json())
    except:
        print(response.text)
    return False

if __name__ == '__main__':
    # Read HTML files
    try:
        with open('tattoo-font-previewer-page.html', 'r', encoding='utf-8') as f:
            page_content = f.read()
    except FileNotFoundError:
        print("Error: tattoo-font-previewer-page.html not found")
        exit(1)
    
    try:
        with open('tattoo-font-previewer-docs.html', 'r', encoding='utf-8') as f:
            docs_content = f.read()
    except FileNotFoundError:
        print("Error: tattoo-font-previewer-docs.html not found")
        exit(1)
    
    # Run
    create_or_update_page(
        'Tattoo Font Previewer',
        'tattoo-font-previewer',
        page_content,
        'Preview your text in 50+ professional tattoo fonts instantly. Free tattoo font previewer with blackletter, script, gothic styles. Download as PNG!'
    )
    
    create_or_update_page(
        'Tattoo Font Previewer Documentation',
        'tattoo-font-previewer-documentation',
        docs_content,
        'Complete guide to using the Tattoo Font Previewer - 50+ fonts, download options, favorites, and more.'
    )
    
    # Clear cache
    try:
        requests.get(f'{WP_URL}/purge-all-cache.php', timeout=5)
    except:
        pass
