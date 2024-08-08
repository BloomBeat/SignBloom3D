import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

​/**
​ * Handles user login by verifying email and password, and generating a JWT token.
​ *
​ * @param {Object} req - The request object containing the user's email and password.
​ * @param {string} req.body.email - The user's email.
​ * @param {string} req.body.password - The user's password.
​ * @param {Object} res - The response object to send back to the client.
​ *
​ * @returns {Object} - The response object with a token if successful, or an error message if unsuccessful.
​ */

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .send("passerd validated Email and password are required");
  }

  // get user email and find userid**
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  // Compare provided password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid password");
  }

  // Generate JWT token
  const token = jwt.sign(
    //{ id: decoded.userID, email: user.email },
    { id: user._id, email: user.email }, //GPT changes
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.send({ token });
};

export const userRegister = async (req, res) => {
  try {
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
    console.log("Registering user with data:", req.body);
    // Check if all required fields are provided
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
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      age,
      hearing_level,
      interpreter_group,
      curriculum,
      curr_time: new Date(curr_time),
      institution,
      picture_profile,
      role,
      created_at: new Date(),
      updated_at: new Date(),
    });

    console.log("New user to be saved:", newUser);
    // Save user to database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Validation Error:", error.errors);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
    console.log("error is here:", error);
  }
};
