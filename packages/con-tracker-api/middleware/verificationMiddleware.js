import { checkSchema } from "express-validator";

export const BaseFormVerification = checkSchema({
  title: {
    notEmpty: { errorMessage: "Title is required" },
    isLength: {
      options: { min: 5, max: 30 },
      errorMessage: "Minimum Title Length of 5",
    },
  },
  description: {
    notEmpty: { errorMessage: "Description is required" },
  },
});

export const pictureVerification = checkSchema({
  picture: {
    notEmpty: { errorMessage: "At least one picture is required" },
  },
  "picture.*": {
    isURL: { errorMessage: "Invalid URL" },
  },
});

export const CriminalVerification = checkSchema({
  "criminal.*.name": {
    notEmpty: { errorMessage: "At least one criminal is required" },
    isString: { errorMessage: "Invalid Name" },
  },
});

export const CriminalInfoVerification = checkSchema({
  nameFirst: {
    notEmpty: { errorMessage: "First Name is required" },
    isString: { errorMessage: "Invalid Name" },
  },
  nameLast: {
    isString: { errorMessage: "Invalid Name" },
  },
  nameOthers: {
    isString: { errorMessage: "Invalid Name" },
  },
  description: {
    notEmpty: { errorMessage: "Description is required" },
    isString: { errorMessage: "Invalid Description" },
  },
  dob: {
    isString: { errorMessage: "Invalid Date of Birth" },
  },
  sex: {
    isIn: {
      options: ["M", "F"],
      errorMessage:
        "Invalid Options. Valid Options are 'M', 'F', or leave empty for 'UNSPECIFIED'",
    },
  },
  race: {
    isString: { errorMessage: "Invalid Race" },
  },
});

export const checkforIDinParams = checkSchema({
  id: {
    in: ["params"],
    notEmpty: { errorMessage: "ID is required" },
  },
});

export const contactUsVerification = checkSchema({
  name: {
    notEmpty: { errorMessage: "Name is required" },
    isString: { errorMessage: "Invalid name" },
  },
  email: {
    notEmpty: { errorMessage: "Email is required" }, 
    isEmail: { errorMessage: "Invalid email" },
  },
  message: {
    notEmpty: { errorMessage: "Message is required" },
    isString: { errorMessage: "Invalid message" },
  },
})