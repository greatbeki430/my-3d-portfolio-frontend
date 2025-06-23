require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./backend/models/Admin");

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/portfolio"
    );

    // Admin credentials
    const adminData = {
      email: "greatbeki22@admin.email", // Your email
      password: await bcrypt.hash("Ggeze%%##12aa", 12), // Your password
      role: "superadmin",
    };

    // Check if exists
    const exists = await Admin.findOne({ email: adminData.email });
    if (exists) {
      console.log("Admin already exists");
      return process.exit(0);
    }

    // Create admin
    await Admin.create(adminData);
    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

createAdmin();
