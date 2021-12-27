import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import Contact from "../models/ContactModel.js";

/**
 * @desc   submit contact form
 * @route  POST /report/contact
 * @access Public
 */
export const submitContactForm = asyncHandler(async (req, res) => {
  try {
    const { name, email, message } = req.body;
    validationResult(req).throw();

    const form = new Contact({
      name: name?.trim(),
      email: email?.trim(),
      message: message?.trim(),
    });

   await form.save();
    return res.status(200).json({message: "submitted successfully"});
  } catch (err) {
    return res.status(401).json(err);
  }
});

export default {}