// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     // Ensure password is valid
//     if (!password || typeof password !== "string") {
//       throw new Error("Invalid password");
//     }

//     // Hash the password correctly
//     const salt = bcrypt.genSaltSync(10); // Ensure this is a number
//     const hashedPassword = bcrypt.hashSync(password, salt);

//     // Create new user
//     const user = new User({ username, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Register a new user (No bcrypt, plain text password)
export const register = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const user = new User({ username, password }); // Storing password as plain text (TEMPORARY)
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login an existing user (No bcrypt, plain text password check)
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
