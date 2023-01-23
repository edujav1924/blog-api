import { jest } from "@jest/globals";
import cloudUser from "../../databases/cloudApi/users.js";

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

it("check correct return of user post list", async () => {
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

  let data = await cloudUser.getUserPostList({
    startPaginationIndex: 0,
    endPaginationIndex: 5,
    userId: 1,
  });
  expect(data.posts.length).toBeGreaterThan(0);
});

it("Correct exception handling in user post list", async () => {
  fetch.mockImplementationOnce(() => Promise.reject(new Error("API failure")));
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

it("check the successful post new user post", async () => {
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

it("Check the correct handling of exceptions in the creation of new user post", async () => {
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
