import { verifyToken } from "../utils/jwt.js";


export function requireAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireAdminRole(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Required Admin privileges" });
  }
  next();
}

export function requireStandardRole(req, res, next) {
  if (!req.user || req.user.role !== "standard") {
    return res.status(403).json({ error: "Required Standard privileges" });
  }
  next();
}

export function requireDeskRole(req, res, next) {
  if (!req.user || req.user.role !== "desk") {
    return res.status(403).json({ error: "Required Desk privileges" });
  }
  next();
}

