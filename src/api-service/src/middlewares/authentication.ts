import { Request, Response, NextFunction } from "express";

export async function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = authHeader.split(' ');

  if (!(parts.length === 2)) {
    return res.status(401).json({ error: "Token error" });
  }

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token malformatted" });
  }

  try {
    // req.body.userId = await UserService.getUserIdFromToken(token)
  } catch (err: any) {
    if (err.status < 500 || err.statusCode < 500) {
      return res.status(err.status).json({ error: err.message });
    }
    
    console.log("Error happened", err);
    return res.status(500).json({ error: "Something went wrong!" });
  }

  return next();
}
