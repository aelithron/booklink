export type Book = {
  isbn: number,
  name: string,
  links: {
    bookshopOrg: string,
    barnesAndNoble: string,
    amazon: string,
  }
}