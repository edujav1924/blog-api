import userService from "../services/userServices.js";
const getAllUsers = (req, res) => {
  const users = userService.getAllUsers();
  req.send(users);
};
export default { getAllUsers };
