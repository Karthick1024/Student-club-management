import { body, validationResult } from "express-validator";
import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  NotFoundError,
} from "../errors/customErrors.js";
import { User } from "../model/user.Model.js";

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

// Validation for Register Input
export const validateRegisterinput = withvalidationError([
  body("role")
    .trim()
    .notEmpty()
    .withMessage("role name is required"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
   ,
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 8 characters long"),
]);



//validate login input
export const validateLoginInput = withvalidationError([
  body("name")
    .notEmpty()
    .withMessage("name is required"),
  body("password").notEmpty().withMessage("password is required"),
]);

