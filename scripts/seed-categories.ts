import { drizzle } from "drizzle-orm/mysql2";
import { categories } from "../drizzle/schema";

const db = drizzle(process.env.DATABASE_URL!);

const initialCategories = [
  { name: "Pakistan Dress", slug: "pakistan-dress", description: "Beautiful traditional Pakistani dresses", displayOrder: 1, isActive: true },
  { name: "Indonesia Dress", slug: "indonesia-dress", description: "Elegant Indonesian traditional clothing", displayOrder: 2, isActive: true },
  { name: "Thailand Dress", slug: "thailand-dress", description: "Stunning Thai traditional dresses", displayOrder: 3, isActive: true },
  { name: "Malaysia Hijab", slug: "malaysia-hijab", description: "Modern Malaysian hijabs", displayOrder: 4, isActive: true },
  { name: "Local Dress", slug: "local-dress", description: "Local traditional dresses", displayOrder: 5, isActive: true },
  { name: "Cosmetic", slug: "cosmetic", description: "Beauty products", displayOrder: 6, isActive: true },
];

async function seed() {
  console.log("Seeding categories...");
  for (const category of initialCategories) {
    await db.insert(categories).values(category).onDuplicateKeyUpdate({ set: { updatedAt: new Date() } });
  }
  console.log("✅ Done!");
  process.exit(0);
}

seed().catch(console.error);
