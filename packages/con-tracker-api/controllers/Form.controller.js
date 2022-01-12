import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { ComplaintForm, CrimeForm, MissingForm } from "../models/FormModel.js";

/**
 * @desc   submit missing person
 * @route  POST /report/missing
 * @access Public
 */
export const submitMissingPerson = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      dob,
      location,
      height,
      weight,
      eyeColor,
      hairColor,
      race,
      gender,
      picture,
    } = req.body;
    validationResult(req).throw();

    const form = new MissingForm({
      name: name.trim(),
      dob: dob ? new Date(dob).toUTCString() : "",
      location: location.trim(),
      height,
      weight,
      eyeColor: eyeColor.trim(),
      hairColor: hairColor.trim(),
      race: race.trim(),
      gender: gender || "UNSPECIFIED",
      picture,
      resolved: false,
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
    const { title, phone, description } = req.body;
    validationResult(req).throw();

    const form = new ComplaintForm({
      title: title.trim(),
      description: description.trim(),
      phone: phone.trim(),
      resolved: false,
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
    const {
      contactAddress,
      contactName,
      contactEmail,
      contactPhone,
      crimeAddress,
      crimeAddress2,
      crimeCity,
      crimeZip,
      crimeDesc,
      crimeType,
      otherCrimeType,
    } = req.body;
    validationResult(req).throw();

    const CrimeType = crimeType === "Other" ? otherCrimeType : crimeType;
    const form = new CrimeForm({
      contactAddress: contactAddress.trim(),
      contactName: contactName.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),

      crimeAddress: crimeAddress.trim(),
      crimeAddress2: crimeAddress2.trim(),
      crimeCity: crimeCity.trim(),
      crimeZip: crimeZip.trim(),
      crimeDesc: crimeDesc.trim(),
      crimeType: CrimeType.trim(),
    });

    const complaint = await form.save();
    return res.status(200).json(complaint);
  } catch (err) {
    return res.status(401).json(err);
  }
});
