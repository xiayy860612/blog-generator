
export default interface Category {
  title: string
  key: string
  children?: Array<Category>
}