import jwt from "jsonwebtoken";

const generateToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });

export default generateToken;
