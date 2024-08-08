const express = require("express");
const cors = require("cors");
const connectToDb = require("./src/db/connect");
require("dotenv").config();
const inventoryRoutes = require("./src/routers/products-routes");

const app = express();

app.use(express.json());
app.use("/uploads", express.static(`${__dirname}/src/uploads`));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1", inventoryRoutes);

const PORT = 5001;

const start = async () => {
  try {
    await connectToDb(process.env.DATABASE_URI);
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  } catch (error) {
    throw error("unable to connect to db");
  }
};

start();

export default app;
