import Database from "better-sqlite3";
import path from "path";

const dbPath = path.resolve(process.cwd(), "data", "bconomy.db");
const db = new Database(dbPath);

const createTableSQL = `
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  emoji TEXT,
  idName TEXT,
  uncraftable INTEGER,
  lootSources TEXT,
  cost INTEGER,
  imageUrl TEXT,
  imageBase64 TEXT
);
`;
db.exec(createTableSQL);

export default db;
