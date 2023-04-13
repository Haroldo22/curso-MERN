const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

//configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import routings
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");

// configure static folder
app.use(express.static("uploads"));

//configure header http - cors
app.use(cors());

//configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);

module.exports = app;
