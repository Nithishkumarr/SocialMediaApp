import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const route = express.Router();

//Reading
route.get("/:id", verifyToken, getUser);
route.get("/:id/friends", verifyToken, getUserFriends);

//add/remove friend // UPDATE
route.patch("/:id/:friendId", verifyToken, addRemoveFriend);
export default route;
