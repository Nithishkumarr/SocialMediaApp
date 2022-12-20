import express from "express";
import { login } from "../controllers/Auth.js";
const route = express.Router();
route.get("/login", login);
export default route;
