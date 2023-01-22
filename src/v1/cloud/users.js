import {
  CLOUD_USERS_API_URL,
  CLOUD_USERS_POSTS_API_URL,
} from "../../utils/constants/userConstants.js";

const getUsersFromCloud = async (filterParams) => {
  let users = {};
  try {
    const request = await fetch(CLOUD_USERS_API_URL);

    if (!request.ok) {
      throw { status: 500, message: "Unexpected request status from database" };
    }
    users = await request.json();
  } catch (error) {
    throw { status: 500, message: error.message };
  }

  return {
    users: users.slice(
      filterParams.startPaginationIndex,
      filterParams.endPaginationIndex
    ), // apply pagination limits
    count: users.length,
  };
};

const getUserByIDFromCloud = async (userId) => {
  let users = {};
  try {
    const request = await fetch(CLOUD_USERS_API_URL);

    if (!request.ok) {
      throw { status: 500, message: "Unexpected request status from database" };
    }
    users = await request.json();
  } catch (error) {
    throw { status: 500, message: error.message };
  }
  const user = users.find((currentUser) => {
    return currentUser.id === userId;
  });

  if (!user) {
    throw {
      status: 404,
      message: `Can't find user with the id '${userId}'`,
    };
  }

  return user;
};

const getUserPostList = async (filterParams) => {
  let posts = {};
  try {
    const request = await fetch(CLOUD_USERS_POSTS_API_URL);
    if (!request.ok) {
      throw { status: 500, message: "Unexpected request status from database" };
    }
    posts = await request.json();
  } catch (error) {
    throw { status: 500, message: error.message || "An error occurred" };
  }
  let userPostsList = posts.filter((post) => {
    return post.userId === filterParams.userId;
  });

  userPostsList = userPostsList.slice(
    filterParams.startPaginationIndex,
    filterParams.endPaginationIndex
  );
  return {
    posts: userPostsList,
    count: userPostsList.length,
  };
};
export default { getUsersFromCloud, getUserByIDFromCloud, getUserPostList };
