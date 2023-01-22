import { getPaginationLimits } from "../../utils/pagination.js";
import { getUsersFromCloud } from "../cloud/users.js";

const getAllUsers = async (req) => {
  let filterParams = {};
  let { page } = req.query; // filters handled for now
  let users = {};
  page = isNaN(parseInt(page)) || page < 1 ? 1 : page; // get correct page number to show
  const paginationLimits = getPaginationLimits(page, 5);
  filterParams.startIndex = paginationLimits[0];
  filterParams.endIndex = paginationLimits[1];
  try {
    users = await getUsersFromCloud(filterParams);
  } catch (error) {
    throw { status: 500, message: error.message };
  }

  return users;
};

export default { getAllUsers };
