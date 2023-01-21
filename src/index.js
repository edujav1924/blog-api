import express from "express";
import v1UserRoutes from "./v1/routes/userRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;

// set routes for API
app.use("/api/v1", v1UserRoutes);

// launch server
app.listen(PORT, () => {
  console.log("server started");
});
