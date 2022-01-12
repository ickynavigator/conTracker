/* eslint-disable no-underscore-dangle */
import asyncHandler from "express-async-handler";
import generateToken from "../lib/generateToken.js";
import Admin from "../models/AdminModel.js";

// @desc   Auth User and get token
// @route  POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Username or Password");
  }
});

export default { authUser };
