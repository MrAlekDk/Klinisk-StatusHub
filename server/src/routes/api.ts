import express from "express";
import type { Request, Response } from "express";
import db from "../db/database.js";

const router = express.Router();

//Routes for API endpoints here


//test route to check if API is working
if (process.env["NODE_ENV"] === "development") {
    router.get("/api-test", (req: Request, res: Response) => {
      res.json({ message: "API is working" });
    });
  
    router.get("/db-test", (req: Request, res: Response) => {
      try {
        const stmt = db.prepare("SELECT 1");
        const result = stmt.get();
        res.json({ ok: true, result });
      } catch (err) {
        const error = err as Error;
        res.status(500).json({ ok: false, error: error.message });
      }
    });
  }

export default router;