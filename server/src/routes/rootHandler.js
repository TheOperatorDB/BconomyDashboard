import express from "express";
import petsRouter from "./pets.js";
import itemsRouter from "./items.js";
import usersRouter from "./users.js";

const router = express.Router();

router.use("/pets", petsRouter);
router.use("/items", itemsRouter);
router.use("/users", usersRouter);

export default router;
