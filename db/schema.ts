import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const bookTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: date().notNull().defaultNow(),
  cover: text().notNull(),
  name: text().notNull(),
  author: text().notNull(),
  isbn: varchar({ length: 13 }),
  bookshopOrgID: varchar({ length: 8 }),
  barnesAndNobleID: varchar({ length: 10 }),
  googleBooksID: text()
});
