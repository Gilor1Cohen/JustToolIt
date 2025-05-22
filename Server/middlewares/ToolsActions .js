require("dotenv").config();
const jwt = require("jsonwebtoken");
const { getUserActionCountToday } = require("../data-accsess-layer/AuthDAL");

async function checkUserAccess(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Missing token." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.plan_id === 1 && decoded.plan_status === "active") {
      const result = await getUserActionCountToday(decoded.userId);

      if (!result.success) {
        return res.status(500).json({ message: "Internal server error." });
      }

      if (result.count >= 3) {
        return res
          .status(403)
          .json({ message: "Daily limit reached for free users." });
      }
    }

    req.user = decoded;

    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({ message: "Missing token." });
    }

    return res
      .status(403)
      .json({ message: "Daily limit reached for free users." });
  }
}

module.exports = checkUserAccess;
