const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models/db");
const artikel = require("./routers/artikel");
const category = require("./routers/category");
const contribution = require("./routers/contribution");
const user = require("./routers/user");
const app = express();
const port = 3000;

// midleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/artikel", artikel);
app.use("/category", category);
app.use("/contribution", contribution);
app.use("/user", user);

app.listen(port, () => {
  console.log(`server run port ${port}`);
});
