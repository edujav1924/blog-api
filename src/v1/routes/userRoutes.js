import { Router } from "express";
const router = Router();
// version of user API v1
// define routes for users

router.get("/", (req, res) => {
  res.json("get all users");
});

export default router;
