import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  phone: varchar("phone", { length: 20 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Product categories
 */
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  displayOrder: int("displayOrder").default(0),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Products table
 */
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  price: int("price").notNull(), // Store in cents to avoid decimal issues
  compareAtPrice: int("compareAtPrice"), // Original price for sale items
  sku: varchar("sku", { length: 100 }),
  stock: int("stock").default(0).notNull(),
  imageUrl: text("imageUrl"),
  images: text("images"), // JSON array of image URLs
  isActive: boolean("isActive").default(true).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Customer addresses
 */
export const addresses = mysqlTable("addresses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  addressLine1: varchar("addressLine1", { length: 255 }).notNull(),
  addressLine2: varchar("addressLine2", { length: 255 }),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }),
  postalCode: varchar("postalCode", { length: 20 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  isDefault: boolean("isDefault").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Address = typeof addresses.$inferSelect;
export type InsertAddress = typeof addresses.$inferInsert;

/**
 * Orders table
 */
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
  status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending").notNull(),
  subtotal: int("subtotal").notNull(), // in cents
  shippingCost: int("shippingCost").default(0).notNull(),
  tax: int("tax").default(0).notNull(),
  total: int("total").notNull(),
  
  // Shipping address
  shippingFullName: varchar("shippingFullName", { length: 255 }).notNull(),
  shippingPhone: varchar("shippingPhone", { length: 20 }).notNull(),
  shippingAddressLine1: varchar("shippingAddressLine1", { length: 255 }).notNull(),
  shippingAddressLine2: varchar("shippingAddressLine2", { length: 255 }),
  shippingCity: varchar("shippingCity", { length: 100 }).notNull(),
  shippingState: varchar("shippingState", { length: 100 }),
  shippingPostalCode: varchar("shippingPostalCode", { length: 20 }).notNull(),
  shippingCountry: varchar("shippingCountry", { length: 100 }).notNull(),
  
  // Payment info
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "paid", "failed", "refunded"]).default("pending").notNull(),
  paymentId: varchar("paymentId", { length: 255 }),
  
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

/**
 * Order items table
 */
export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId").notNull(),
  productName: varchar("productName", { length: 255 }).notNull(),
  productImage: text("productImage"),
  price: int("price").notNull(), // Price at time of order (in cents)
  quantity: int("quantity").notNull(),
  subtotal: int("subtotal").notNull(), // price * quantity
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

/**
 * Shopping cart table
 */
export const cartItems = mysqlTable("cartItems", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

/**
 * Wishlist table
 */
export const wishlistItems = mysqlTable("wishlistItems", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WishlistItem = typeof wishlistItems.$inferSelect;
export type InsertWishlistItem = typeof wishlistItems.$inferInsert;

