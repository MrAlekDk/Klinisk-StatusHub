import "better-sqlite3";

declare module "better-sqlite3" {
  interface DatabaseOptions {
    cipher?: string;
  }
}

declare module "better-sqlite3-multiple-ciphers" {
  import BetterSqlite3 from "better-sqlite3";
  export default BetterSqlite3;
}