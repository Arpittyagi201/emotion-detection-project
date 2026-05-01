const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, token missing" });
  }

  try {
    const secret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
    if (!secret) {
      return res
        .status(500)
        .json({ success: false, message: "JWT secret not configured on server" });
    }

    const decoded = jwt.verify(token, secret);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized, token invalid" });
  }
};

module.exports = authMiddleware;

