import { getPaginationLimits } from "../../utils/pagination.js";
import { getUsersFromCloud } from "../cloud/users.js";

const getUserList = async (req) => {
  const limit = 5;
  let filterParams = {};
  let { page } = req.query; // filters handled for now
  let usersList = {};
  page = isNaN(parseInt(page)) || page < 1 ? 1 : parseInt(page); // get correct page number to show
  const paginationLimits = getPaginationLimits(page, limit); // only founded 10 users, so ajust limit to 5
  filterParams.startPaginationIndex = paginationLimits[0];
  filterParams.endPaginationIndex = paginationLimits[1];
  try {
    usersList = await getUsersFromCloud(filterParams);
    const hasNextPage = (usersList.count / limit).toFixed(2) > page;
    usersList.hasNextPage = hasNextPage;
    usersList.currentPage = page;
  } catch (error) {
    throw { status: 500, message: error.message };
  }

  return usersList;
};

export default { getUserList };
