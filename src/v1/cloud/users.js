import {
  CLOUD_USERS_API_URL,
  CLOUD_USERS_POSTS_API_URL,
} from "../../utils/constants/userConstants.js";

// get users from cloud API
const getUsers = async (filterParams) => {
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
  const totalUsers = users.length;

  //apply pagination
  users = users.slice(
    filterParams.startPaginationIndex,
    filterParams.endPaginationIndex
  );
  return {
    users: users,
    count: totalUsers,
  };
};

//get one user from cloud API
const getUserByID = async (userId) => {
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

//get  user post list from cloud API
const getUserPostList = async (filterParams) => {
  let posts = {};
  try {
    const request = await fetch(CLOUD_USERS_POSTS_API_URL);
    if (!request.ok) {
      throw { status: 500, message: "Unexpected request status from database" };
    }
    posts = await request.json();
  } catch (error) {
    throw { status: 500, message: error.message };
  }
  let userPostsList = posts.filter((post) => {
    return post.userId === filterParams.userId;
  });
  const totalUserPosts = userPostsList.length;

  userPostsList = userPostsList.slice(
    filterParams.startPaginationIndex,
    filterParams.endPaginationIndex
  );

  return {
    posts: userPostsList,
    count: totalUserPosts,
  };
};

// create new user post
const createUserPost = async (postData) => {
  let newPost = {};
  try {
    const request = await fetch(CLOUD_USERS_POSTS_API_URL, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (request.status !== 201) {
      throw { status: request.status, message: "An Error occurred" };
    }
    newPost = await request.json();
  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message,
    };
  }
  return newPost;
};

export default {
  getUsers,
  getUserByID,
  getUserPostList,
  createUserPost,
};
