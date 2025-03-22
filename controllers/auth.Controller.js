import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { User } from "../model/user.Model.js";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/jsonToken.js";



export const Register = async (req, res, next) => {
  try {
    const { name, password, role,joined_date } = req.body; // Added firstname to destructuring

    // Check if the email already exists 
    let existingUser  = await User.findOne({ name: name.toLowerCase() });;

    if (existingUser ) {
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, existingUser .password);
      if (isMatch) {
        throw new BadRequestError("Username already exists");
      }
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser ;

    // Create a new user based on the role
    if (role === "hod" || role === "staff") {
      newUser  = new User({
        name: name.toLowerCase(),
        password: hashedPassword,
        role: role, // Assuming you want to store the role in User as well
        joined_date:joined_date
      });
    } else {
      throw new BadRequestError("Invalid role provided");
      
    }

    // Save the new user
    await newUser .save();

    res.status(StatusCodes.CREATED).json({
      msg: "Registration Successful",
      newUser ,
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};


// export const Login = async (req, res, next) => {
//   try {
//     const { name, password } = req.body;

//     if (!name || !password) {
//       throw new UnauthenticatedError("Email and password are required");
//     }

  

//     let user = await User.findOne({ name: name.toLowerCase() });
  

//     if (!user) {
//       throw new UnauthenticatedError("Invalid credentials");
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       throw new UnauthenticatedError("Invalid credentials");
//     }



//     const token = createJWT({
//       userId: user._id,
//       role: user.role,
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     res.status(StatusCodes.OK).json({
//       success: true,
//       user: {
//         id: user._id,
//         name: user.name,
//         role: user.role,
//         joined_date: user.joined_date
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
export const Login = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      throw new UnauthenticatedError("Name and password are required");
    }

    let user = await User.findOne({ name: name.toLowerCase() });

    if (!user) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid credentials");
    }

    const token = createJWT({
      userId: user._id,
      role: user.role,
    });

    // Store the token in a cookie as well as sending it in the response
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Send token and user details in response as well
    res.status(StatusCodes.OK).json({
      success: true,
      token,  // Add token here for front-end to use
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        joined_date: user.joined_date,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const Logout = async (req, res, next) => {
  console.log("requested",req);
  
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ msg: "user logged out" });
};



export const filterStaffAndHod = async (req, res) => {
  try {
    const filters = {};

    // Add filters based on query parameters
    if (req.query.studentName) {
      filters.name = { $regex: req.query.name, $options: 'i' }; // Case-insensitive search
    }
    if (req.query.id){
      filters._id= req.query.id; // Filter by student ID
    }
    


    const staff = await User.find(filters); // Fetch filtered staff from the database
    res.status(StatusCodes.OK).json(staff); // Send the filtered list of staff as a response
  }
  catch (error) {
    // Handle errors
    console.error(error); // Log the error for debugging
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
  }
  
};

export const updateStaffAndHod = async (req, res, next) => {
  try {
    const staffId = req.params.id;
    const updateData = req.body;

    // Find the student by ID and update
    const updatedStaff = await User.findByIdAndUpdate(staffId, updateData, { new: true });

    if (!updatedStaff) {
      throw new NotFoundError("Staff not found");
    }

    res.status(StatusCodes.OK).json({
      message: "staff updated successfully",
      staff: updatedStaff,
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};


export const deleteStaffAndHod = async (req, res, next) => {
  try {
    const studentId = req.params.id;

    // Find the student by ID and delete
    const deletedStudent = await User.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      throw new NotFoundError("Staff not found");
    }

    res.status(StatusCodes.OK).json({
      message: "Staff deleted successfully",
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};