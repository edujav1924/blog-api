import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
import authRequired from "../../middlewares/auth.js";
const router = Router();
// version of user API v1
// define routes for users

router
  .get("/", authRequired, userControllers.getUserList)
  .get("/:userId", authRequired, userControllers.getUser)
  .get("/:userId/posts", authRequired, userControllers.getUserPostList)
  .post("/:userId/posts", authRequired, userControllers.createNewUserPost);

export default router;
