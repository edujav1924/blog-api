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
export default { getUserList };
