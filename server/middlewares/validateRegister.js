/**
 * Validates the registration data sent in the request body.
 *
 * @param {Object} req - The request object containing the registration data.
 * @param {Object} res - The response object to send back the validation results.
 * @param {Function} next - The next middleware function in the request-response cycle.
 *
 * @returns {void}
 *
 * @throws Will send a response with status 400 and an error message if any validation fails.
 *
 * @example
 * validateRegister(req, res, next);
 */
const validateRegister = (req, res, next) => {
  const {
    email,
    password,
    firstname,
    lastname,
    age,
    hearing_level,
    interpreter_group,
    curriculum,
    curr_time,
    institution,
    picture_profile,
    role,
  } = req.body;

  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }
  if (!email || !password || !firstname || !lastname || !picture_profile) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(emailFormat)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const passwordFormat =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password.match(passwordFormat)) {
    return res.status(400).json({
      error: "Invalid password format",
      fix: "At least 1 Capital letter, 1 Small letter, 1 number, 1 special character, minimum 8 characters long",
    });
  }

  // Fields required for "Deaf" or "Interpreter" roles
  if (role == "deaf") {
    if (!age || !hearing_level) {
      return res.status(400).json({
        error: "Age and hearing level are both required",
      });
    }
  } else if (role == "interpreter") {
    if (
      !age ||
      !interpreter_group ||
      !curriculum ||
      !curr_time ||
      !institution
    ) {
      // Validate curr_time format (ISO 8601)
      const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
      if (!curr_time.match(dateFormat)) {
        return res.status(400).json({ error: "Invalid curr_time format" });
      }

      const date = new Date(curr_time);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ error: "Invalid curr_time value" });
      }
      return res.status(400).json({
        error:
          "Age, interpreter group, curriculum, curriculum time and institution are all required",
      });
    }
  }

  next();
};

export default validateRegister;
