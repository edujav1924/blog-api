import userService from "../services/userServices.js";
const getUserList = async (req, res) => {
  let users = {};
  try {
    users = await userService.getUserList(req);
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
  return res.json(users);
};

const getUser = async (req, res) => {
  let user = {};
  try {
    user = await userService.getUser(req);
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
  return res.json({ user: user });
};

const getUserPostList = async (req, res) => {
  let postList = {};
  try {
    postList = await userService.getUserPostList(req);
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
  return res.json(postList);
};

const createNewUserPost = async (req, res) => {
  let newPost = {};
  try {
    newPost = await userService.createNewUserPost(req);
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
  return res.status(201).json(newPost);
};
export default { getUserList, getUser, getUserPostList, createNewUserPost };
