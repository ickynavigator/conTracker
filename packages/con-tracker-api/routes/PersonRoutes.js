import express from "express";
import {
  createPerson,
  deletePerson,
  getPersonById,
  getPersons,
  getTopPersons,
  updatePerson,
} from "../controllers/Person.controller.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  checkforIDinParams,
  CriminalInfoVerification,
} from "../middleware/verificationMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getPersons)
  .post(protect, admin, CriminalInfoVerification, createPerson);
router.route("/wanted").get(getTopPersons);
router
  .route("/:id")
  .get(checkforIDinParams, getPersonById)
  .delete(protect, admin, checkforIDinParams, deletePerson)
  .put(
    protect,
    admin,
    checkforIDinParams,
    CriminalInfoVerification,
    updatePerson,
  );

export default router;
