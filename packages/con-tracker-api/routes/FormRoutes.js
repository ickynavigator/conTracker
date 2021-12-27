import express from "express";
import { submitContactForm } from "../controllers/Contact.controller.js";

import {
  submitMissingPerson,
  submitComplaint,
  submitCrime,
} from "../controllers/Form.controller.js";
import {
  BaseFormVerification,
  pictureVerification,
  CriminalVerification,
  contactUsVerification
} from "../middleware/verificationMiddleware.js";
// import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/missing")
  .post(BaseFormVerification, pictureVerification, submitMissingPerson);
router.route("/complaint").post(BaseFormVerification, submitComplaint);
router
  .route("/crime")
  .post(BaseFormVerification, CriminalVerification, submitCrime);
  router.route("/contact").post( contactUsVerification ,submitContactForm);

export default router;
