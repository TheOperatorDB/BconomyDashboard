import express from "express";
import petsRouter from "./pets.js";
import itemsRouter from "./items.js";
import usersRouter from "./users.js";
import marketRouter from "./market.js";

const router = express.Router();

router.use("/pets", petsRouter);
router.use("/items", itemsRouter);
router.use("/users", usersRouter);
router.use("/market", marketRouter);

export default router;
