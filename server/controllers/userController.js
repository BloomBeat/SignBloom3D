import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

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
      curr_time,
      institution,
      picture_profile,
      role,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

//hashed password
// // Test controller to add info to DB for testing hashed password
// export const testAddUser = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     // Hash the password
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)

//     // Create new user with hashed password
//     const newUser = new User({
//       email,
//       password: hashedPassword
//     })

//     // Save user to database
//     await newUser.save()

//     res.status(201).json({ message: "Test user created successfully" })
//   } catch (error) {
//     res.status(500).json({ message: "Error creating test user", error: error.message })
//   }
// }
