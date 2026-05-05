import Database, { Options } from 'better-sqlite3-multiple-ciphers';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// __dirname replacement for ESM
const __filename: string = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath: string = path.join(__dirname, 'database.sqlite');
const schemaPath: string = path.join(__dirname, 'schema.sql');

const options: Options = {
  verbose: console.log,
  fileMustExist: false
}

const db: Database.Database = new Database(dbPath, options);

// Must be set after opening the DB
db.pragma(`key = '${process.env['DB_KEY']}'`);
db.pragma(`cipher_page_size = 4096`);
db.pragma(`kdf_iter = 256000`);

db.exec(`PRAGMA foreign_keys = ON;`);

const schema = fs.readFileSync(schemaPath, 'utf-8');
db.exec(schema);

export default db;
