import Database from "better-sqlite3-multiple-ciphers";

import path from "path";
import fs from "fs";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const dbPath = path.join(__dirname, 'database.sqlite');
const schemaPath = path.join(__dirname, 'schema.sql');

const db = new Database(dbPath, {
    //verbose: console.log,
    fileMustExist: false,
    cipher: 'sqlcipher',
});

//can't be included in options when opening the database, must be set with pragma statements after opening
db.pragma(`key = '${process.env.DB_KEY}'`);
db.pragma(`cipher_page_size = 4096`);
db.pragma(`kdf_iter = 256000`)

db.exec(`PRAGMA foreign_keys = ON;`);

const schema = fs.readFileSync(schemaPath, 'utf-8');

db.exec(schema);

export default db;