import express from "express";
import {
  createPerson,
  deletePerson,
  getMissed,
  getMissingById,
  getPersonById,
  getPersons,
  getTopPersons,
  updatePerson
} from "../controllers/Person.controller.js";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  checkforIDinParams,
  CriminalInfoVerification
} from "../middleware/verificationMiddleware.js";

const router = express.Router();

router.route("/wanted").get(getTopPersons);
router.route("/missing").get(getMissed);
router.route("/missing/:id").get(getMissingById);
router
  .route("/")
  .get(getPersons)
  .post(protect, admin, CriminalInfoVerification, createPerson);
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
