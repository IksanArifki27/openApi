const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

// memanggil route
const artikelRoute = require("./routers/artikel");
const categoryRoute = require("./routers/category");

// midleware
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/artikel", artikelRoute);
app.use("/category", categoryRoute);
// app.use("/contribution", contribution);
// app.use("/user", user);
app.get("/", (req, res) => {
  res.send({
    "/artikel": {
      get: "/",
      get: "/123",
      post: "/",
      put: "/",
      delete: "/",
    },
    "/category": {
      get: "/",
      get: "/123",
      post: "/",
      put: "/",
      delete: "/",
    },
  });
});
// semua path error akan kesini
app.use((req, res, next) => {
  const err = new Error(`${req.url} not found in this server`);
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

module.exports = app;
