const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./db/mongoose");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: process.env.BASE_URL,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log("Server is running on port: " + port + "!");
});

module.exports = app;
