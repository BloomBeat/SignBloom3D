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
