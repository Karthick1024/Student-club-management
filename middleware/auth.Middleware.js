import { verifyJWT } from "../utils/jsonToken.js";
import {
  UnauthorizedError,
  UnauthenticatedError,
} from "../errors/customErrors.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      req.user = null;
      return next();
    }

    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    req.user = null;
    return next();
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      throw new UnauthorizedError("Not authorized to access this route");
    }
    next();
  } catch (error) {
    next(error);
  }
};
