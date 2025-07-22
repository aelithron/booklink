import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const bookTable = pgTable("books", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: date().notNull().defaultNow(),
  name: text().notNull(),
  author: text().notNull(),
  description: text(),
  isbn: varchar({ length: 13 }),
  googleBooksID: text(),
  openLibraryID: text()
});
