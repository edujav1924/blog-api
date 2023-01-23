// get pagination params, limited to max 50 items
const getPaginationLimits = (offset = 0, limit = 50) => {
  const startPaginationIndex = offset;
  let endPaginationIndex = 0;
  if (limit - offset <= 50) {
    endPaginationIndex = limit;
  } else {
    endPaginationIndex = offset + 50;
  }
  return [startPaginationIndex, endPaginationIndex];
};
export { getPaginationLimits };
