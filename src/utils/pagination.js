// get start pagination index and end pagination index. example: page=1 start_index=0 and end_index=10
const getPaginationLimits = (page, limit = 10) => {
  const startPaginationIndex = (page - 1) * limit;
  const endPaginationIndex = page * limit;
  return [startPaginationIndex, endPaginationIndex];
};
export { getPaginationLimits };
