
import {Student} from '../model/student.Model.js'; // Adjust the import based on your project structure
import { body, validationResult } from "express-validator";
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
} from "../errors/customErrors.js";

// Middleware for Handling Validation Errors
export const withvalidationError = (validatevalue) => {
  return [
    validatevalue,
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const errorMessage = error.array().map((error) => error.msg);
        if (errorMessage[0].startsWith("not Unauthorized")) {
          throw new UnauthorizedError("not Unauthorized to access this route");
        }
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

// Validation for Student Registration Input
export const validateStudentInput = withvalidationError([
  body("studentName")
    .trim()
    .notEmpty()
    .withMessage("Student name is required"),

  body("registerNumber")
    .trim()
    .notEmpty()
    .withMessage("Register number is required")
    .custom(async (registerNumber) => {
      const student = await Student.findOne({ registerNumber });
      if (student) {
        throw new Error("Register number already exists");
      }
      return true;
    }),

  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD."),

  body("bloodGroup")
    .notEmpty()
    .withMessage("Blood group is required")
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'])
    .withMessage("Invalid blood group"),

  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required"),

  body("studentAddress")
    .trim()
    .notEmpty()
    .withMessage("Student address is required"),

  body("clubName")
    .optional() // This field is optional
    .trim(),

  body("dateOfJoin")
    .notEmpty()
    .withMessage("Date of join is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD."),
]);


export const validateStudentInputUpdate = withvalidationError([
  body("studentName")
    .trim()
    .notEmpty()
    .withMessage("Student name is required"),

  body("registerNumber")
    .trim()
    .notEmpty()
    .withMessage("Register number is required"),
  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD."),

  body("bloodGroup")
    .notEmpty()
    .withMessage("Blood group is required")
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'])
    .withMessage("Invalid blood group"),

  body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required"),

  body("studentAddress")
    .trim()
    .notEmpty()
    .withMessage("Student address is required"),

  body("clubName")
    .optional() // This field is optional
    .trim(),

  body("dateOfJoin")
    .notEmpty()
    .withMessage("Date of join is required")
    .isISO8601()
    .withMessage("Invalid date format. Use YYYY-MM-DD."),
]);