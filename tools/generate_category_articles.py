# coding=utf8
import json
import os
import re
import argparse


class JsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, object):
            return obj.__dict__
        return json.JSONEncoder.default(self, obj)


class Category:
    def __init__(self, title):
        self.title = title
        self.children = []
        self.articles = []

    def add_sub_category(self, sub):
        self.children.append(sub)

    def add_article(self, article):
        self.articles.append(article)

class Article:
    def __init__(self, title, path, update_time):
        self.title = title
        self.path = path
        self.update_time = update_time

class CategoryArticlesGenerator:
    def __init__(self, root_dir, output):
        self.root_dir = root_dir
        self.categories = {}
        self.output = output

    def exec(self):
        if not os.path.isdir(self.root_dir):
            print("%s is not a dir" % self.root_dir)
            return

        for file in os.listdir(self.root_dir):
            if file.startswith("."):
                continue

            root_file_path = os.path.join(self.root_dir, file)
            if not os.path.isdir(root_file_path):
                continue

            category = self.get_category(file, file)
            self.categories[file] = category
        self.__output_file()

    def get_category(self, title, rel_path):
        category = Category(title)

        category_root = os.path.join(self.root_dir, rel_path)
        for file in os.listdir(category_root):
            if file.startswith("."):
                continue
            
            file_rel_path = os.path.join(rel_path, file)
            file_path = os.path.join(self.root_dir, file_rel_path)
            if os.path.isdir(file_path):
                sub_category = self.get_category(file, file_rel_path)
                category.add_sub_category(sub_category)
                continue

            if os.path.isfile(file_path):
                article = self.__get_article(file, file_rel_path)
                if article:
                    category.add_article(article)
                continue
        return category

    def __get_article(self, file, file_rel_path):
        file_path = os.path.join(self.root_dir, file_rel_path)
        info = os.stat(file_path)
        return Article(file, "/" + file_rel_path, info.st_mtime)


    def __output_file(self):
        with open(self.output, 'w', encoding='utf8') as json_file:
            json.dump(self.categories, json_file, ensure_ascii=False, cls=JsonEncoder, indent=2)


if __name__ == "__main__":
    default_output = os.path.join(os.path.curdir, "categoryArticles.json")
    parser = argparse.ArgumentParser("Generate category articles json file")
    parser.add_argument("src_root", help="abstract root path of category articles")
    parser.add_argument("-o", "--output", default=default_output, help="abstract root path of category articles")
    args = parser.parse_args()
    CategoryArticlesGenerator(args.src_root, args.output).exec()
