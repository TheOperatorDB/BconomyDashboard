import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import rootHandler from "./routes/rootHandler.js";
import { config } from "./config/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors({ origin: config.allowedOrigin }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", rootHandler);
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
