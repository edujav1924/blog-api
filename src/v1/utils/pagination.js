const getPaginationLimits = (page) => {
  const startPaginationIndex = (page - 1) * limit;
  const endPaginationIndex = page * limit;
  return [startPaginationIndex, endPaginationIndex];
};
