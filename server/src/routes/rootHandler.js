import express from "express";
import petsRouter from "./pets.js";
import itemsRouter from "./items.js";
import usersRouter from "./users.js";
import marketRouter from "./market.js";
import { validateApiKey } from "../middlewares/apiKeyHandler.js";

const router = express.Router();

// Apply API key validation middleware to all routes
router.use(validateApiKey);

router.use("/pets", petsRouter);
router.use("/items", itemsRouter);
router.use("/users", usersRouter);
router.use("/market", marketRouter);

export default router;
