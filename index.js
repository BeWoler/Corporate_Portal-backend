require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./src/routes/routes");
const errorMiddleware = require("./src/middlewares/error-middleware");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use("/api", router);
app.use(cookieParser())
app.use(errorMiddleware);

const connection = async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT} port`);
  });
};

connection();
