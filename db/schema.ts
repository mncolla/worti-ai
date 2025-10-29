import { json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const chatsTable = pgTable("chats", {
  id: varchar({ length: 255 }).primaryKey(), // ID autogenerado por la librería (ej: s3cHtJHaQHnAmhNo)
  userId: varchar({ length: 255 }).notNull(), // Google SSO user ID
  title: varchar({ length: 255 }).notNull(),
  messages: json().notNull().default([]), // Array de mensajes como JSON
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
});