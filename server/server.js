import app from "./src/app.js";
import "./src/db/sqlite.js";
import { config } from "./src/config/index.js";

app.listen(config.port, "0.0.0.0", (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }

  console.log(`🚀 Server running on port ${config.port}`);
  console.log(`🔑 API Key status: ${config.apiKey ? "Configured" : "Missing"}`);
});
