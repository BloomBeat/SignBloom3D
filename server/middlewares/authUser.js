import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  // Access the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized, No token");
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized, No token");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };

    // Check if the token is expired
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      return res.status(401).send("Token expired");
    }

    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "unauthenticated", error: error.message });
  }
};
