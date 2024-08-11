/**
 * Validates the login credentials provided by the user.
 *
 * @param {*Object} req - The request object containing the user's email and password.
 * @param {*Object} res - The response object to send back to the client.
 * @param {*Function} next - The next middleware function in the request-response cycle.
 *
 * @returns {void}
 *
 * @throws Will send a response with status 400 and an error message if any validation fails.
 * validaateLogin(req, res, next);
 */
const validateLogin = (req, res, next) => {
  //now still not pass validate
  const { email, password } = req.body; //check that used username/email !!!

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (typeof email !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({ error: "Email and password must be strings" });
  }

  if (email.length < 3 || email.length > 20) {
    //not related to login
    return res
      .status(400)
      .json({ error: "Email must be between 3 and 20 characters" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }

  // If all validations pass, move to the next middleware
  next();
};

export default validateLogin;