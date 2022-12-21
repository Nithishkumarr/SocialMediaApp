import express from "express";
const route = express.Router();
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/authMiddleware.js";
//READ POST
route.get("/", verifyToken, getFeedPosts);
route.get("/:userId/posts", verifyToken, getUserPosts);

//UPDATE
route.patch("/:id/likes", verifyToken, likePost);
export default route;
