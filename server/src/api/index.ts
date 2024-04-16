import express from "express";
import restaurantsRouter from "./restaurants";

const router = express.Router();
router.use("restaurants", restaurantsRouter);

export default router;
