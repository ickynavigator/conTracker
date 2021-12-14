import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import Form from "../models/FormModel.js";
import { FORM_TYPE } from "../constants.js";

/**
 * @desc   submit missing person
 * @route  POST /report/missing
 * @access Public
 */
export const submitMissingPerson = asyncHandler(async (req, res) => {
  try {
    const { title, description, picture } = req.body;
    validationResult(req).throw();

    const form = new Form({
      type: FORM_TYPE.MISSING,
      title: title?.trim(),
      description: description?.trim(),
      picture,
    });

    const missingPerson = await form.save();
    return res.status(200).json(missingPerson);
  } catch (err) {
    return res.status(401).json(err);
  }
});

/**
 * @desc   submit complaint
 * @route  POST /report/complaint
 * @access Public
 */
export const submitComplaint = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
    validationResult(req).throw();

    const form = new Form({
      type: FORM_TYPE.COMPLAINT,
      title: title.trim(),
      description: description.trim(),
    });

    const complaint = await form.save();
    return res.status(200).json(complaint);
  } catch (err) {
    return res.status(401).json(err);
  }
});

/**
 * @desc   submit crime
 * @route  POST /report/crime
 * @access Public
 */
export const submitCrime = asyncHandler(async (req, res) => {
  try {
    const { title, description, criminals } = req.body;
    validationResult(req).throw();

    const form = new Form({
      type: FORM_TYPE.CRIME,
      title: title.trim(),
      description: description.trim(),
      relatedCriminals: criminals,
      byAdmin: false,
    });

    const complaint = await form.save();
    return res.status(200).json(complaint);
  } catch (err) {
    return res.status(401).json(err);
  }
});
