import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const businessEnquiriesTable = pgTable("business_enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  product: text("product").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertBusinessEnquirySchema = createInsertSchema(
  businessEnquiriesTable,
).omit({ id: true, createdAt: true });

export type InsertBusinessEnquiry = z.infer<
  typeof insertBusinessEnquirySchema
>;

export type BusinessEnquiry = typeof businessEnquiriesTable.$inferSelect;
