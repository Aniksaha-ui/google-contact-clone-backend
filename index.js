const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4000;
const userHandler = require("./router/userHandler");
app.use(cors());
app.use(express.json());

//database connection
mongoose
  .connect(
    "mongodb+srv://admin:sahaanik@cluster0.f4r9bam.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log(err));

//database connection end

//error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

//test api
app.get("/", (req, res) => {
  res.send({ message: "App running successfully" });
});

app.use("/user", userHandler);

app.listen(port, () => {
  console.log(`app listening at port ${port}`);
});
