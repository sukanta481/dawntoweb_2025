import { storage } from "./storage";
import * as bcrypt from "bcryptjs";

/**
 * Database Seeder
 * Run this to create an initial admin user
 *
 * Usage: npx tsx server/seed.ts
 */

async function seedDatabase() {
  console.log("🌱 Seeding database...");

  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = await storage.createUser({
      username: "admin",
      email: "admin@dawntoweb.com",
      password: hashedPassword,
    });

    console.log("✅ Admin user created:");
    console.log("   Username: admin");
    console.log("   Password: admin123");
    console.log("   Email:", adminUser.email);
    console.log("");
    console.log("⚠️  IMPORTANT: Change the password after first login!");
    console.log("");
    console.log("🎉 Database seeded successfully!");
    console.log("");
    console.log("You can now login at: http://localhost:5000/admin/login");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// Run seeder
seedDatabase();
