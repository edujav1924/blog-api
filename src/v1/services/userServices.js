import { getPaginationLimits } from "../../utils/pagination.js";
import cloudUser from "../databases/cloudApi/users.js";

// get user list
const getUserList = async (req) => {
  let filterParams = {};
  let usersList = {};
  let { offset, limit } = req.query; // filters handled for now

  // check and validate pagination limits
  offset = parseInt(offset);
  limit = parseInt(limit);
  offset = isNaN(offset) || offset < 0 ? 0 : offset;
  limit = isNaN(limit) || limit < 0 ? 50 : limit;

  const paginationLimits = getPaginationLimits(offset, limit);
  filterParams.startPaginationIndex = paginationLimits[0];
  filterParams.endPaginationIndex = paginationLimits[1];
  try {
    usersList = await cloudUser.getUsers(filterParams);
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }
  return usersList;
};

// get one user
const getUser = async (req) => {
  let user = {};
  const { userId } = req.params;
  try {
    user = await cloudUser.getUserByID(parseInt(userId));
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }
  return user;
};

// get user post list
const getUserPostList = async (req) => {
  let userPostsList = {};
  let filterParams = {};
  let { offset, limit } = req.query; // filters handled for now
  let { userId } = req.params;

  // check and validate pagination limits
  offset = parseInt(offset);
  limit = parseInt(limit);
  offset = isNaN(offset) || offset < 0 ? 0 : offset;
  limit = isNaN(limit) || limit < 0 ? 50 : limit;

  const paginationLimits = getPaginationLimits(offset, limit); // get correct pagination limits
  filterParams.startPaginationIndex = paginationLimits[0];
  filterParams.endPaginationIndex = paginationLimits[1];
  filterParams.userId = parseInt(userId);
  try {
    userPostsList = await cloudUser.getUserPostList(filterParams);
  } catch (error) {
    throw { status: error.status || 500, message: error.message };
  }
  return userPostsList;
};

// create New User post
const createNewUserPost = async (req) => {
  const { userId, body, title } = req.body;
  const postData = {
    userId: userId,
    body: body,
    title: title,
  }; // set value from request body
  //todo: is important validate all data values and verify exist keys for the user
  let newPost = {};
  try {
    newPost = await cloudUser.createUserPost(postData);
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message,
    };
  }
  return newPost;
};

export default { getUserList, getUserPostList, getUser, createNewUserPost };
