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
export default { getUserList, getUser, getUserPostList };
