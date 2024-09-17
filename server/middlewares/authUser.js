import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.signedCookies.SessionID;

    if (!token) {
      return res.status(401).send("Unauthorized, No token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER,
    });

    req.user = {
      id: decoded.id,
      email: decoded.email,
      admin: decoded.admin, // Add the admin claim to the request
    };

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      return res.status(401).send("Token expired");
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "unauthenticated", error: error.message });
  }
};

export const authenticateAdmin = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    return res.status(401).send("Unauthorized, No token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: process.env.JWT_ISSUER,
    });
    req.user = { id: decoded.id, email: decoded.email };
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      return res.status(401).send("Token expired");
    }
    if (decoded.role !== "admin") {
      return res.status(403).send("Unauthorized, not admin");
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ message: "unauthenticated", error: error.message });
  }
};
