import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res
      .status(400)
      .send("passerd validated Email and password are required");
  }

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
