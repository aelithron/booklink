export type Book = {
  isbn: number,
  name: string,
  cover: string | null,
  links: {
    bookshopOrg: LinkToBook,
    barnesAndNoble: LinkToBook,
    amazon: LinkToBook,
  }
}
type LinkToBook = string | null;