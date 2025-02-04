const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("Unauthorized: No token provided or incorrect format");
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach decoded user data to the request
    console.log("Authenticated user:", decoded);

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.error("JWT Expired:", err.message);
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }

    console.error("JWT Verification Error:", err.message);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
