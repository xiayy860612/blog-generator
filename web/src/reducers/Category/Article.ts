
export default interface Article {
  title: string,
  path: string,
  update_time: number
}

export function getArticleHref(article: Article): string {
  const end = article.path.lastIndexOf(".")
  return article.path.substring(0, end)
}

export function articleOrder(a: Article, b: Article) {
  if (a.update_time == b.update_time) {
    return 0;
  }
  return a.update_time > b.update_time ? 1 : -1;
}