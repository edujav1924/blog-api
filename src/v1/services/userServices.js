import { getPaginationLimits } from "../../utils/pagination.js";
import cloudUser from "../cloud/users.js";

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
    usersList = await cloudUser.getUsersFromCloud(filterParams);
    const hasNextPage = (usersList.count / limit).toFixed(2) > page;
    usersList.hasNextPage = hasNextPage;
    usersList.currentPage = page;
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }

  return usersList;
};

const getUser = async (req) => {
  let user = {};
  const { userId } = req.params;
  try {
    user = await cloudUser.getUserByIDFromCloud(parseInt(userId));
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }
  return user;
};

const getUserPostList = async (req) => {
  const limit = 5;
  let { page } = req.query; // filters handled for now
  let { userId } = req.params;
  let userPostsList = {};
  let filterParams = {};

  page = isNaN(parseInt(page)) || page < 1 ? 1 : parseInt(page); // get correct page number to show
  const paginationLimits = getPaginationLimits(page, limit); // only founded 10 users, so ajust limit to 5
  filterParams.startPaginationIndex = paginationLimits[0];
  filterParams.endPaginationIndex = paginationLimits[1];
  filterParams.userId = parseInt(userId);
  try {
    userPostsList = await cloudUser.getUserPostList(filterParams);
    const hasNextPage = (userPostsList.count / limit).toFixed(2) > page;
    userPostsList.hasNextPage = hasNextPage;
    userPostsList.currentPage = page;
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }

  return userPostsList;
};

const createNewUserPost = async (req) => {
  const { userId, body, title } = req.body;
  const postData = {
    userId: userId,
    body: body,
    title: title,
  };
  let newPost = {};
  try {
    newPost = await cloudUser.createUserPost(postData);
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "An error ocurred",
    };
  }
  return newPost;
};

export default { getUserList, getUserPostList, getUser, createNewUserPost };
