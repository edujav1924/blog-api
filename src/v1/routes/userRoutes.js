import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
const router = Router();
// version of user API v1
// define routes for users

router.get("/", userControllers.getUserList);

export default router;
