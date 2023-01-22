import fetch from "node-fetch";
import { CLOUD_USERS_API_URL } from "../../utils/constants/userConstants.js";

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

export { getUsersFromCloud };
