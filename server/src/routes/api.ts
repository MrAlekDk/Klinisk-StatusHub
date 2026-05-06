import express from "express";
import type { Request, Response } from "express";
import db from "../db/database.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { organisationScopeMiddleware } from "../middleware/organisationScopeMiddleware.js";
import { getOrganisationSystems } from "../services/organisationService.js";

const router = express.Router();

router.get("/organisations/:organisationId", 
  authMiddleware, 
  organisationScopeMiddleware,
  async (req: Request, res: Response) => {
    try {
      const organisationId = Number(req.params["organisationId"]);
      const systems = await getOrganisationSystems(organisationId);
      res.json(systems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });


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