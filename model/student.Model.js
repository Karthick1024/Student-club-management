import mongoose from 'mongoose';

// Define the schema for the Student model
const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    registerNumber: {
      type: String,
      required: true,
      unique: true, // Ensure that the register number is unique
    },
    dob: {
      type: Date,
      required: true, // Date of Birth
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'], // Example blood groups
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    studentAddress: {
      type: String,
      required: true,
    },
    clubName: {
      type: String,
      required: false, // Optional field
    },
    dateOfJoin: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Export the Student model based on the schema
export const Student = mongoose.model('Student', studentSchema);
