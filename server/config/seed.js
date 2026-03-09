// config/seed.js — Seeds the initial admin user into MongoDB
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) return; // Already seeded

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "Admin@123",
      12
    );

    await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL || "admin@resume.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin user seeded successfully");
    console.log(`   Email: ${process.env.ADMIN_EMAIL || "admin@resume.com"}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || "Admin@123"}`);
  } catch (error) {
    console.error("Seed error:", error.message);
  }
};

module.exports = { seedAdmin };
