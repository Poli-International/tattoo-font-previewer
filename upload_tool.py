#!/usr/bin/env python3
"""FTP Upload for Tattoo Font Previewer"""

from ftplib import FTP
import os

FTP_CONFIG = {
    'host': '89.116.192.233',
    'username': 'u978947437',
    'password': '?X6ZnUdOiU!xmDs9'
}

def upload_tool():
    tool_folder = 'tattoo-font-previewer'
    local_dist = './dist'
    remote_base = f'/domains/poliinternational.com/public_html/wp-content/standalone-tools/{tool_folder}'
    
    print(f'Uploading {tool_folder}...')
    
    ftp = FTP(FTP_CONFIG['host'])
    ftp.login(FTP_CONFIG['username'], FTP_CONFIG['password'])
    
    # Create directories
    try:
        ftp.mkd(remote_base)
    except:
        pass
    
    try:
        ftp.mkd(f'{remote_base}/assets')
    except:
        pass
    
    # Upload files
    files = [
        ('index.html', f'{remote_base}/index.html'),
        ('embed.html', f'{remote_base}/embed.html'),
        ('tattoo-font-previewer-docs.html', f'{remote_base}/documentation.html'), 
    ]
    
    # Check if files exist locally before adding to list
    files_to_upload = []
    
    # Dist files
    if os.path.exists(os.path.join(local_dist, 'index.html')):
        files_to_upload.append((os.path.join(local_dist, 'index.html'), f'{remote_base}/index.html'))
    if os.path.exists(os.path.join(local_dist, 'embed.html')):
        files_to_upload.append((os.path.join(local_dist, 'embed.html'), f'{remote_base}/embed.html'))

    # Docs
    if os.path.exists('tattoo-font-previewer-docs.html'):
        files_to_upload.append(('tattoo-font-previewer-docs.html', f'{remote_base}/documentation.html'))

    # Upload assets
    assets_dir = os.path.join(local_dist, 'assets')
    if os.path.exists(assets_dir):
        for filename in os.listdir(assets_dir):
            local_path = os.path.join(assets_dir, filename)
            remote_path = f'{remote_base}/assets/{filename}'
            files_to_upload.append((local_path, remote_path))
    
    for local, remote in files_to_upload:
        if os.path.exists(local):
            with open(local, 'rb') as f:
                ftp.storbinary(f'STOR {remote}', f)
            print(f'- {os.path.basename(local)}')
        else:
            print(f'! Missing file: {local}')
    
    ftp.quit()
    print('Upload complete!')
    print(f'Link: https://poliinternational.com/wp-content/standalone-tools/{tool_folder}/index.html')

if __name__ == '__main__':
    upload_tool()
