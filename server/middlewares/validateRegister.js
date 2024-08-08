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

  if (
    !email ||
    !password ||
    !firstname ||
    !lastname ||
    !age ||
    !hearing_level ||
    !interpreter_group ||
    !curriculum ||
    !curr_time ||
    !institution ||
    !picture_profile ||
    !role
  ) {
    return res.status(400).json({ error: "All the fields are required" });
  }

  //validate email format(emailRegex)
  //rules : at least 1 letter, 1 number, 1 special character, minimum 8 characters long
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(emailFormat)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  //validate password format
  //rules : at least 1 letter, 1 number, 1 special character, minimum 8 characters long
  const passwordFormat =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password.match(passwordFormat)) {
    return res.status(400).json({ error: "Invalid password format" });
  }

  next();
};
export default validateRegister;
