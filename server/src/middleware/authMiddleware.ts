import 'dotenv/config';
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // The token should be located in the "cookie" field of req, currently it gets set as a header
  const cookieHeader = req.headers['cookie'];
  const token = cookieHeader && cookieHeader.split('=')[1]; // the bearer token from the cookie

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const secretKey = process.env['JWT_KEY'] as string;
    const decoded = jwt.verify(token, secretKey);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
}