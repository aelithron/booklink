import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const bookTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: date().notNull().defaultNow(),
  cover: text().notNull(),
  name: text().notNull(),
  author: text().notNull(),
  isbn: varchar({ length: 13 }),
  googleBooksID: text(),
  amazonASIN: varchar({ length: 10 })
});
