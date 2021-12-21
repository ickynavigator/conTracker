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

const router = express.Router();

router.route("/").get(getPersons).post(protect, admin, createPerson);
router.route("/wanted").get(getTopPersons);
router
  .route("/:id")
  .get(getPersonById)
  .delete(protect, admin, deletePerson)
  .put(protect, admin, updatePerson);

export default router;
