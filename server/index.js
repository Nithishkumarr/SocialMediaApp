import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/Auth.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoute from "./routes/usersRoute.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import { createPost } from "./controllers/posts.js";
import postRoute from "./routes/postRoute.js";
import User from "./models/user.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

//configs//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//file storage multer//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/asstes");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
//Routes with file
app.post("/auth/register", upload.single("picture"), register);
app.post("/post", verifyToken, upload.single("picture"), createPost);

//ROUTES
app.use("/auth", authRoutes);
app.use("/users", usersRoute);
app.use("/posts", postRoute);

//mongoose setup
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`server satrted on port ${PORT}`));
    //ADD Data one time
    // User.insertMany(users);
    // Post.insertMany(posts)
  })
  .catch((err) => console.log(`${err} did not connect`));
