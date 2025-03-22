import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../model/user.Model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    // Ensure the collection exists before dropping indexes
    const userCollection = mongoose.connection.collection("users"); // Ensure your collection name matches
    if (userCollection) {
      await userCollection.dropIndexes(); // Drops indexes, if needed
    }

    // Check if admin user already exists
    const existingUser = await User.findOne({ email: "karthickcs10124@gmail.com" });
    if (existingUser) {
      console.log("Admin user already exists");
      return; // Avoid unnecessary process.exit; handle gracefully
    }

    // Hash the admin password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    // Create the admin user
    const adminUser = await User.create({
      firstname: "admin",
      email: "karthickcs10124@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully:", adminUser);
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("MongoDB Disconnected");
    process.exit(0); // Exit the process after completion
  }
};

// Execute the function
createAdmin();
