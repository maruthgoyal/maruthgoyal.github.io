import argparse
from jinja2 import Environment, FileSystemLoader, select_autoescape
from PyPDF2 import PdfFileReader
import datetime
from dateutil import tz, parser
import csv
from bs4 import BeautifulSoup
from constants import *
import os

join = os.path.join

arg_parser = argparse.ArgumentParser()
arg_parser.add_argument("--prod",
                        dest="prod",
                        action="store_true",
                        help="deploy to production")


class BlogPost:
    def __init__(self, title, filename, date, tags, preview):
        self.title = title
        self.filename = filename
        self.date = date
        self.tags = tags
        self.preview = preview
        self.date_s = date.strftime(DATE_FORMAT_STR)


def get_pdf_title(path):
    with open(path, 'rb') as f:
        pdf = PdfFileReader(f)
        return pdf.getDocumentInfo().title


def get_notes():
    notes = []
    print(os.listdir(os.path.join(os.getcwd(), NOTES_DIR)))
    for d in os.listdir(os.path.join(os.getcwd(), NOTES_DIR)):
        section = {"name": d, "files": []}
        print(d)
        for f in os.listdir(os.path.join(os.getcwd(), NOTES_DIR, d)):
            print(f)
            file_path = os.path.join(os.getcwd(), NOTES_DIR, d, f)
            if f == "disc":
                with open(file_path) as disc:
                    section["text"] = disc.read()
            elif f.endswith("pdf"):
                section["files"].append(
                    (get_pdf_title(file_path), os.path.join(d, f)))
        notes.append(section)

    return notes


def get_talks():
    talks = []
    for f in os.listdir(join(os.getcwd(), TALKS_DIR)):
        file_path = join(os.getcwd(), TALKS_DIR, f)
        talks.append((get_pdf_title(file_path), f))

    return talks


def get_awards():
    a = []
    with open("awards.csv") as f:
        awards = csv.reader(f)
        for line in awards:
            a.append((line[0], line[1]))
    return a


def get_blogs():

    blogs = []
    for f in os.listdir(join(os.getcwd(), BLOG_DIR)):
        with open(join(os.getcwd(), BLOG_DIR, f), "r+") as b:

            soup = BeautifulSoup(b.read(), 'html.parser')
            title = str(soup.find(id="title").string)
            preview = ''.join(
                str(x) for x in (soup.find(id="preview").contents))
            print(soup.find(id="preview").contents)

            date_s = soup.find(id="date")
            date = None

            if date_s is None:
                date = datetime.datetime.now(tz=tz.tzlocal())
                new_time = soup.new_tag('span',
                                        attrs={
                                            "class": "post_time",
                                            "id": "date"
                                        })
                new_time.string = date.strftime(DATE_FORMAT_STR)
                soup.body.insert(2, new_time)
                b.truncate(0)
                b.seek(0)
                b.write(soup.prettify())
            else:
                date = parser.parse(str(date_s.string).strip())

            blogs.append(BlogPost(title, f, date, [], preview))

    blogs = sorted(blogs, reverse=True, key=lambda x: x.date)
    print(blogs)
    return blogs


def main():

    index_name = "index_test.html"
    blog_name = "blog_test.html"

    args = arg_parser.parse_args()
    if args.prod:
        index_name = "index.html"
        blog_name = "blog.html"

    env = Environment(loader=FileSystemLoader('templates/'),
                      autoescape=select_autoescape(['html', 'xml']))

    index = env.get_template("index.html")
    blog = env.get_template("blog.html")

    blog_render = blog.render(blogs=get_blogs(), blog_dir=BLOG_DIR)
    index_render = index.render(image_dir="./" + IMAGE_DIR,
                                misc_dir="./" + MISC_DIR,
                                pubs_dir="./" + PUBS_DIR,
                                notes_dir="./" + NOTES_DIR,
                                talks_dir="./" + TALKS_DIR,
                                awards=get_awards(),
                                notes=get_notes(),
                                talks=get_talks())

    with open(index_name, "w+") as f:
        f.write(index_render)

    with open(blog_name, "w+") as f:
        f.write(blog_render)


if __name__ == '__main__':
    main()
