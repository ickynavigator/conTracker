import express from "express";

import personRoutes from "./PersonRoutes.js";

const router = express.Router();

router.use("/person", personRoutes);

export default router;
