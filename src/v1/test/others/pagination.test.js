import { getPaginationLimits } from "../../../utils/pagination.js";
test("pagination indexs return", function () {
  let paginationLimits = getPaginationLimits(0, 30);
  expect(paginationLimits[0]).toEqual(0);
  expect(paginationLimits[1]).toEqual(30);
  paginationLimits = getPaginationLimits(0, 50);
  expect(paginationLimits[0]).toEqual(0);
  expect(paginationLimits[1]).toEqual(50);
  paginationLimits = getPaginationLimits(40, 100);
  expect(paginationLimits[0]).toEqual(40);
  expect(paginationLimits[1]).toEqual(90);
});
