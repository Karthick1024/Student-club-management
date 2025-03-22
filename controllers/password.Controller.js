import { User } from "../model/user.Model.js";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { Sendmail } from "../utils/sendmail.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

export const ForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email: email.trim() });
    
    if (!user) {
      throw new BadRequestError("invalid Email adderss");
    }
    const token = Math.floor(100000 + Math.random() * 900000);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 900000; //15min

    await user.save();
    if (token) {
      await Sendmail(
        `Hi ${user.email},`,
        "Password Reset Request",
        `We received a request to reset your password for your account associated with ${user.email}.\n\n
        If you made this request, here is your reset password token:\n\n
        ${token}\n\n
        If you did not request this, you can safely ignore this email.\n\n
        Thank you,\n`
      );
    } else {
      throw new BadRequestError("token invalid");
    }
    res.status(StatusCodes.OK).json({
      success: true,
      msg: `the reset token will send your register ${user.email}`,
    });
  } catch (error) {
    next(error);
  }
};

export const ResetPassword = async (req, res, next) => {
  try {
    const { token } = req.body;
    const { password } = req.body;

    let user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new BadRequestError("token expired");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "password reset successfull",
    });
  } catch (error) {
    next(error);
  }
};
