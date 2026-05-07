import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

export function endpointLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  const logDir = path.join(process.cwd(), "logs");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logFile = path.join(logDir, "requests.log");

  res.on("finish", () => {
    const duration = Date.now() - start;

    const logEntry = {
      time: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration_ms: duration,
      ip: req.ip,
      userId: req.user?.id || null,
      organisationId: req.user?.organisationId || null,
      query: req.query,
      username: req.body.username || null
    };

    fs.appendFileSync(logFile, JSON.stringify(logEntry) + "\n");
  });

  next();
}