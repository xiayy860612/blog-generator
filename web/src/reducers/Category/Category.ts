import Article from "./Article";

export default interface Category {
  title: string
  children?: Array<Category>
  articles?: Array<Article>
}