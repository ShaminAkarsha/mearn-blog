import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username == "" ||
    email == "" ||
    password == ""
  ) {
    return res.status(400).json({ message: "All filed are required!" });
  }

    const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUseer = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUseer.save();
    res.json("Signup successfull");
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};
