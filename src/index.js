import express from "express";
import fetch from "node-fetch";
import { config } from "dotenv";
import v1Routes from "./v1/routes/userRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();
config();
global.fetch = fetch;

app.use(express.json());
// set routes for API
app.use("/api/v1/users", v1Routes);

// launch server
app.listen(PORT, () => {
  console.log("server started");
});
