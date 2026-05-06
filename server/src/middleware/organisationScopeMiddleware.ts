import { Request, Response, NextFunction } from "express";

export const organisationScopeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (!user || !user.organisationId) {
    return res.status(401).send("User not authenticated");
  }

  // Organisation ID from URL, eg /organisations/:organisationId
  const targetOrgId = Number(req.params["organisationId"]);

  if (isNaN(targetOrgId)) {
    return res.status(400).send("Invalid organisation ID");
  }

  if (user.organisationId !== targetOrgId) {
    return res.status(403).send("Forbidden: organisation mismatch");
  }

  next();
};