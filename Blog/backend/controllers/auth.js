import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(insertQuery, [values], (err, result) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};


export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json("Username and password are required");
  }

  const q = "SELECT * FROM users WHERE username = ?"; 
  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (data.length === 0) {
      return res.status(404).json("User not found!");
    }
    const user = data[0];
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  
    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username or password!");
    }

    const token = jwt.sign({ id: user.id }, "jwtkey", { expiresIn: "5h" });
    const { password: _, ...userInfo } = user;

    return res.status(200).json({
      token,
      user: userInfo,
    });
  });
};


export const logout = (req, res) => {
  return res.status(200).json("User has been logged out.");
};
