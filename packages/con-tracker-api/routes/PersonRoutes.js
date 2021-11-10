import express from "express";

import {
  getPersons,
  getPersonById,
  deletePerson,
  createPerson,
  updatePerson,
  getTopPersons,
} from "../controllers/PersonController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getPersons).post(protect, admin, createPerson);
router.route("/top").get(getTopPersons);
router
  .route("/:id")
  .get(getPersonById)
  .delete(protect, admin, deletePerson)
  .put(protect, admin, updatePerson);

export default router;
