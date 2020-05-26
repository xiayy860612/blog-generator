# coding=utf8
import json
import os
import re


class JsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, object):
            return obj.__dict__
        return json.JSONEncoder.default(self, obj)


class Category:
    def __init__(self, title):
        self.title = title
        self.children = []

    def add_sub_category(self, sub):
        self.children.append(sub)

    def to_json(self):
        return self.__dict__


class Article:
    def __init__(self, title, path):
        self.title = title
        self.path = path

class CategoryArticlesGenerator:
    def __init__(self, root_dir):
        self.root_dir = root_dir
        self.categories = {}
        self.articles = {}

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
            
            category = Category(file)
            self.categories[file] = category
            for sub in os.listdir(root_file_path):
                if sub.startswith("."):
                    continue

                sub_path = os.path.join(file, sub)
                root_sub_path = os.path.join(self.root_dir, sub_path)
                if not os.path.isdir(root_sub_path):
                    continue
                
                sub_category = Category(sub)
                category.add_sub_category(sub_category)

                print("sub_path:" + sub_path)
                sub_articles = []
                for root, dirs, files in os.walk(root_sub_path):
                    for article in files:
                        rel_article_path = os.path.join(sub_path, article)
                        sub_articles.append(Article(article, rel_article_path))
                self.articles[sub_path] = sub_articles
        self.__output_file()

    def __output_file(self):
        with open("categoryList.json", 'w', encoding='utf8') as json_file:
            json.dump(self.categories, json_file, ensure_ascii=False, cls=JsonEncoder, indent=2)
        with open("articles.json", 'w', encoding='utf8') as json_file:
            json.dump(self.articles, json_file, ensure_ascii=False, cls=JsonEncoder, indent=2)


if __name__ == "__main__":
    CategoryArticlesGenerator("/Users/xyy/workspace/sds/sds-airflow-pipeline").exec()
