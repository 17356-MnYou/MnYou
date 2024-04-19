import express from "express";
import restaurantsRouter from "./restaurants";
import menuRouter from "./menu";

const router = express.Router();
router.use("/restaurants", restaurantsRouter);

router.use("/menus", menuRouter);

export default router;
