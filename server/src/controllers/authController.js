import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

// Register
async function register(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send('Bad Request')
  }
  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ msg: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 10)
    user = new User({ username, email, password: hashedPassword })
    await user.save();

    const payload = { id: user._id, email: user.email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" })
    res.json({ msg: "User registered successfully", token });
  } catch (err) {
    res.status(500).send("Server error", err);
  }
}

// Login
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Credentials Required')
  }
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: "No Account Found , Signup First" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" })

    const payload = { id: user._id, email: user.email }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "6h" })
    res.json({ msg: "Login successful", token: token })

  } catch (err) {
    res.status(500).send("Server error", err);
  }
}

// me
async function me(req, res) {
  const user = req.user
  res.status(200).json({
    success: true,
    user: user
  })
}

export {
  register,
  login,
  me
}
