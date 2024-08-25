import os
from bs4 import BeautifulSoup
from datetime import datetime
from jinja2 import Environment, FileSystemLoader

def extract_blog_info(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    
    title = soup.find('h1', class_='title').text.strip()
    date_str = soup.find('time')['datetime']
    date = datetime.strptime(date_str, '%Y-%m-%d').strftime('%d %B, %Y')
    
    content = soup.find('main').text.strip()
    preview = content[:100] + '...' if len(content) > 100 else content
    
    return title, date, preview

def generate_website():
    blog_dir = 'blogs/'
    blog_files = [f for f in os.listdir(blog_dir) if f.endswith('.html')]
    blog_info = []

    for blog_file in blog_files:
        with open(os.path.join(blog_dir, blog_file), 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        title, date, preview = extract_blog_info(html_content)
        blog_info.append({
            'file': blog_file,
            'title': title,
            'date': date,
            'preview': preview
        })
    
    # Sort blogs by date, most recent first
    blog_info.sort(key=lambda x: datetime.strptime(x['date'], '%d %B, %Y'), reverse=True)
    
    # Set up Jinja2 environment
    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template('blog_index.html')
    
    # Render the template
    output = template.render(blog_posts=blog_info)
    
    # Write the output to index.html
    with open('blog_index.html', 'w', encoding='utf-8') as f:
        f.write(output)

if __name__ == '__main__':
    generate_website()
