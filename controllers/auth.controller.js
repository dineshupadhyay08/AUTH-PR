import userModel from "../models/user.models.js";
import cryppto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function register(req, res) {
  const { username, password, email } = req.body;

  const isAlreadyExist = await userModel.findOne({ username }, { email });

  if (isAlreadyExist) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = cryppto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
}

export async function getMe(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("AUTH HEADER:", req.headers.authorization);
    // console.log("SECRET:", process.env.JWT_SECRET);

    // ✅ user fetch from DB
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ✅ response
    res.status(200).json({
      message: "User info retrieved successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Invalid token",
    });
  }
}
