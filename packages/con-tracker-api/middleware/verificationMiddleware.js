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
