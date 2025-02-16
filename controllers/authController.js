import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Ensure password is valid
    if (!password || typeof password !== "string") {
      throw new Error("Invalid password");
    }

    // Hash the password correctly
    const salt = bcrypt.genSaltSync(10); // Ensure this is a number
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new user
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
