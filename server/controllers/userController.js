import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      iss: process.env.JWT_ISSUER,
      iat: Math.floor(Date.now() / 1000),
      sub: user._id,
      nbf: Math.floor(Date.now() / 1000),
      admin: user.role === "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "3h" }
  );

  return res
    .cookie("token", token, {
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
      secure: process.env.NODE_ENV === "production",
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "strict",
      signed: false, // Change this to true once you're ready
    })
    .status(200)
    .send({ status: "Login successful", token });
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
