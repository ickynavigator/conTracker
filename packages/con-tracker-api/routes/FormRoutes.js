import express from "express";
import { submitContactForm } from "../controllers/Contact.controller.js";
import {
  submitComplaint,
  submitCrime,
  submitMissingPerson,
} from "../controllers/Form.controller.js";

// import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/missing").post(submitMissingPerson);
router.route("/complaint").post(submitComplaint);
router.route("/crime").post(submitCrime);
router.route("/contact").post(submitContactForm);

export default router;
