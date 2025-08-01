import app from "./src/app.js";
import "./src/db/sqlite.js";
import { config } from "./src/config/index.js";

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`🔑 API Key status: ${config.apiKey ? "Configured" : "Missing"}`);
});
