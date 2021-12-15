import express from "express";

import personRoutes from "./PersonRoutes.js";
import formRoutes from "./FormRoutes.js";

const router = express.Router();

router.use("/person", personRoutes);
router.use("/report", formRoutes);

export default router;
