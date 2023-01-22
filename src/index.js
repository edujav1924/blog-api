import express from "express";
import v1Routes from "./v1/routes/userRoutes.js";
import fetch from "node-fetch";
global.fetch = fetch;

const app = express();
const PORT = process.env.PORT || 3000;

// set routes for API
app.use("/api/v1/users", v1Routes);

// launch server
app.listen(PORT, () => {
  console.log("server started");
});
