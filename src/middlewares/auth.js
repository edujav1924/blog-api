const authRequired = (req, res, next) => {
  const ALLOWED_KEY = process.env.ALLOWED_KEY ? process.env.ALLOWED_KEY : "";

  // verify is authorization settled on headers
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization Required" });
  }

  // returns unauthorized if the authorization header standard is not met
  const headerAuthorization = req.headers.authorization.split(" ");
  if (
    headerAuthorization[0] !== "Api-Key" ||
    ALLOWED_KEY.indexOf(headerAuthorization[1]) === -1
  ) {
    return res.status(401).json({ message: "Authorization Required" });
  }

  next();
};
export default authRequired;
