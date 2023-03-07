const { Router } = require("express");
const route = Router();
const UserController = require("../controller/user");

route.post("/login", UserController.login);
route.post("/register", UserController.register);

module.exports = route;
