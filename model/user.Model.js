import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {

    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["hod", "staff"],
      default: "staff",
    },
    joined_date:{
      type: Date,
      required: true,
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date
  },
  { timestamps: true }
);

// Export the User model based on the schema
export const User = mongoose.model("User", userSchema);
