import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import upload from "./multer.js";


const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


const uploadDir = path.join(__dirname, "upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/upload", express.static(uploadDir)); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); 
  },
});

const upload = multer({ storage }); 

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  if (file) {
    res.status(200).json({ url: `http://localhost:5000/upload/${file.filename}` });
  } else {
    console.log("No file received");
    res.status(400).json({ error: "No file uploaded" });
  }
});


app.use("/api/auth", authRoutes); 
app.use("/api/posts", postRoutes); 

console.log("Server started on port 5000");

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
