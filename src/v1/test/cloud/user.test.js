import { jest } from "@jest/globals";
import cloudUser from "../../cloud/users.js";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

it("verify success cloud response for user posts", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            userId: 1,
            id: 6,
            title: "",
            body: "",
          },
        ]),
    })
  );
  let data = {};
  data = await cloudUser.getUserPostList({
    startPaginationIndex: 0,
    endPaginationIndex: 5,
  });
  expect(data.posts.length).toBeGreaterThan(0);
});

it("verify failed cloud response for user posts", async () => {
  fetch.mockImplementationOnce(() => Promise.reject("API failure"));
  let data = {};
  try {
    data = await cloudUser.getUserPostList({
      startPaginationIndex: 0,
      endPaginationIndex: 5,
    });
  } catch (error) {
    expect(typeof error.status).toBe("number");
    expect(typeof error.message).toBe("string");
  }
});

it("verify_post_list", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            userId: 1,
            id: 6,
            title: "",
            body: "",
          },
          {
            userId: 2,
            id: 6,
            title: "",
            body: "",
          },
        ]),
    })
  );
  let data = {};
  data = await cloudUser.getUserPostList({
    startPaginationIndex: 0,
    endPaginationIndex: 5,
    userId: 1,
  });
  expect(data.posts.length).toBe(1);
});

it("check__success_post_userPost", async () => {
  const postObject = {
    userId: 1,
    title: "title",
    body: "body",
    id: 15,
  };
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      status: 201,
      json: () => Promise.resolve(postObject),
    })
  );
  let newPost = await cloudUser.createUserPost({
    userId: 1,
    title: "title",
    body: "body",
  });
  expect(typeof newPost).toBe("object");
  expect(newPost).toMatchObject(postObject);
});

it("check_failed_post_userPost", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      status: 400,
      json: () =>
        Promise.resolve({
          userId: 1,
          id: 15,
          title: "title",
          body: "body",
        }),
    })
  );
  try {
    let newPost = await cloudUser.createUserPost({
      userId: 1,
      title: "title",
      body: "body",
    });
  } catch (error) {
    expect(typeof error.status).toBe("number");
    expect(typeof error.message).toBe("string");
  }
});
