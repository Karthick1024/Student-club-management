import { StatusCodes } from 'http-status-codes';
import { BadRequestError,UnauthenticatedError } from "../errors/customErrors.js"; // Adjust the import based on your project structure
import {Student} from '../model/student.Model.js'; 

export const registerStudent = async (req, res, next) => {
  try {
    const {
      studentName,
      registerNumber,
      dob,
      bloodGroup,
      department,
      studentAddress,
      clubName,
      dateOfJoin,
    } = req.body;

    console.log(studentName,registerNumber,"akhil")

    // Check if the register number already exists
    let existingStudent = await Student.findOne({ registerNumber });

    if (existingStudent) {
      throw new BadRequestError("Register number already exists");
    }

    // Create a new student
    const newStudent = new Student({
      studentName,
      registerNumber,
      dob,
      bloodGroup,
      department,
      studentAddress,
      clubName,
      dateOfJoin,
    });

    // Save the new student
    await newStudent.save();

    res.status(StatusCodes.CREATED).json({
      msg: "Student registered successfully",
      studentId: newStudent._id, // Return the ID of the newly created student
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};




// Filter students based on query parameters
export const filterStudents = async (req, res) => {
  try {
    const filters = {};

    // Add filters based on query parameters
    if (req.query.studentName) {
      filters.studentName = { $regex: req.query.studentName, $options: 'i' }; // Case-insensitive search
    }
    if (req.query.id){
      filters._id= req.query.id; // Filter by student ID
    }
    if (req.query.registerNumber) {
      filters.registerNumber = req.query.registerNumber;
    }
    if (req.query.dob) {
      filters.dob = req.query.dob;
    }
    if (req.query.bloodGroup) {
      filters.bloodGroup = req.query.bloodGroup;
    }
    if (req.query.department) {
      filters.department = { $regex: req.query.department, $options: 'i' };
    }
    if (req.query.studentAddress) {
      filters.studentAddress = { $regex: req.query.studentAddress, $options: 'i' };
    }
    if (req.query.clubName) {
      filters.clubName = { $regex: req.query.clubName, $options: 'i' };
    }
    if (req.query.dateOfJoin) {
      filters.dateOfJoin = req.query.dateOfJoin;
    }
    if (req.query.year) {
      const year = req.query.year;

      if (year.includes('-')) {
        // Range case: YYYY-YYYY
        const [startYear, endYear] = year.split('-').map(Number);
        filters.dateOfJoin = {
          ...filters.dateOfJoin,
          $gte: new Date(`${startYear}-01-01`),
          $lte: new Date(`${endYear}-12-31`)
        };
      } else {
        // Single year case: YYYY
        const singleYear = Number(year);
        filters.dateOfJoin = {
          ...filters.dateOfJoin,
          $gte: new Date(`${singleYear}-01-01`),
          $lte: new Date(`${singleYear}-12-31`)
        };
      }
    }



    const students = await Student.find(filters); // Fetch filtered students from the database
    res.status(StatusCodes.OK).json(students); // Send the filtered list of students as a response
  }
  catch (error) {
    // Handle errors
    console.error(error); // Log the error for debugging
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
  }
  
};


export const updateStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    const updateData = req.body;

    // Find the student by ID and update
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true });

    if (!updatedStudent) {
      throw new NotFoundError("Student not found");
    }

 

    res.status(StatusCodes.OK).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};



export const deleteStudent = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    // Find the student by ID and delete
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      throw new NotFoundError("Student not found");
    }

    res.status(StatusCodes.OK).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};