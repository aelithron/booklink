import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const bookTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: date().notNull().defaultNow(),
  name: text().notNull(),
  author: text().notNull(),
  //isbn: integer().notNull(),
  cover: text().notNull(),
  googleBooksID: text(),
  bookShopOrgID: integer(),
  barnesAndNobleID: integer(),
  amazonASIN: varchar({ length: 10 })
});
