export interface Article {
  title: string,
  key: string,
  path: string
}

export interface CategoryArticles {
  categoryKey: string,
  articles: Array<Article>
}