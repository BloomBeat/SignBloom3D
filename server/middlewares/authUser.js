import jwt from "jsonwebtoken";

function authenticateUser(req, res, next) {
  const token = req.headers.Authorization;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    //code to run before start
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.user = { id: decoded.userID, email: decoded.email }; // */

    //function check expired
    const now = math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
      return res.status(401).send("Token expired");
    }

    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
}
export default authenticateUser;
