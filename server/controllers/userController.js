import User from "../models/user.js";
import bcrypt from "bcryptjs";

/**
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
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid password");
  }
  const token = user.generateAccessJWT();
  const options = {
    maxAge: 3 * 60 * 60 * 1000, // 3 hours
    secure: process.env.NODE_ENV === "production",
    httpOnly: process.env.NODE_ENV === "production",
    sameSite: "lax",
    signed: true, // Change this to true once you're ready
    // domain: process.env.NODE_ENV === "production" ? domain : localhost,
  };
  return res
    .cookie("SessionID", token, options)
    .status(200)
    .send({ status: "Login successful" });
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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      email,
      password, // This will be hashed via the pre-save hook
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

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Validation Error:", error.errors);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

/**
 * Handles user logout by clearing the authentication cookie.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send back to the client.
 *
 * @returns {Object} - The response object indicating logout success.
 */

export const userLogout = async (req, res) => {
  try {
    res.clearCookie("SessionID", {
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "lax",
      signed: true,
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Logout failed", error: error.message });
  }
};
