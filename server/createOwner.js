const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Owner = require("./models/Owner");

async function createOwner() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    const email = "owner@aurabeautystudio.com";
    const password = "Aura@123";

    const existingOwner = await Owner.findOne({ email });

    if (existingOwner) {
      console.log("Owner account already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Owner.create({
      email,
      password: hashedPassword
    });

    console.log("Owner account created successfully.");
  } catch (error) {
    console.error("Error creating owner:", error);
  } finally {
    await mongoose.connection.close();
  }
}

createOwner();