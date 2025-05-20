import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const { cat, author } = req.query;

  let q = "SELECT p.*, u.username FROM posts p JOIN users u ON p.uid = u.id";
  const values = [];

  if (cat) {
    q += " WHERE p.cat = ?";
    values.push(cat);
  }

  if (author) {
    if (values.length > 0) {
      q += " AND u.username = ?";
    } else {
      q += " WHERE u.username = ?";
    }
    values.push(author);
  }

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const postId = req.params.id;

  const q = `
    SELECT p.id, p.title, p.desc, p.img, p.cat, p.date, u.username, u.img AS userImg
    FROM posts p
    JOIN users u ON u.id = p.uid
    WHERE p.id = ?
  `;

  db.query(q, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Post not found");
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const q =
    "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    req.user.id, 
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error("Error adding post:", err); 
      return res.status(500).json(err);
    }
    return res.json("Post has been created.");
  });
};

export const deletePost = (req, res) => {
  const postId = req.params.id;
  const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

  db.query(q, [postId, req.user.id], (err, data) => {
    if (err) return res.status(500).json("Error deleting post");

    if (data.affectedRows === 0) {
      return res.status(401).json("You can delete only your post!");
    }

    return res.json("Post has been deleted!");
  });
};

export const updatePost = (req, res) => {
  const postId = req.params.id;
  const q =
    "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid` = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
  ];

  db.query(q, [...values, postId, req.user.id], (err, data) => {
    if (err) {
      console.error("Error updating post:", err); 
      return res.status(500).json(err);
    }
    return res.json("Post has been updated.");
  });
};
