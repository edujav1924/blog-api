import userService from "../services/userServices.js";
const getAllUsers = async (req, res) => {
  let users = {};
  try {
    users = await userService.getAllUsers(req);
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
  return res.json({ users: users });
};
export default { getAllUsers };
