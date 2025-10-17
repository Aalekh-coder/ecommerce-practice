import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { SECRET } from "../../config/env.js";

//register
export const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser?._id,
        role: newUser?.role,
        email: newUser?.email,
        userName: newUser?.userName,
      },
      SECRET,
      { expiresIn: "1d" }
    );

    return res
      .cookie("token", token, { httpOnly: true, secure: false })
      .status(200)
      .json({
        success: true,
        message: "Register successfully",
        token,
        user: {
          email: newUser?.email,
          role: newUser?.role,
          id: newUser?._id,
          userName: newUser?.userName,
        },
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error while register",
    });
    console.log(error);
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User does't exits! please register first",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser?.password
    );

    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! please try again",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser?._id,
        role: checkUser?.role,
        email: checkUser?.email,
        userName: checkUser?.userName,
      },
      SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "logged in successfully",
      user: {
        email: checkUser?.email,
        role: checkUser?.role,
        id: checkUser?._id,
        userName: checkUser?.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout
export const logout = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

//auth middleware
export const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User!",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error while authorization",
    });
    console.log(error);
  }
};
