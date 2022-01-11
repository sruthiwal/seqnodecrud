const express = require("express");
const routes = require("./routes/index");
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",routes);
app.listen(3000, () => {
  console.log("server is running at port 3000..");
});