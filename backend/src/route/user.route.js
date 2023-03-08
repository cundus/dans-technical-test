const { Router } = require("express");
const route = Router();
const UserController = require("../controller/user");
const { auth } = require("../middleware/auth");

route.post("/login", UserController.login);
route.post("/register", UserController.register);
route.get("/check-auth", auth, UserController.getUser);

module.exports = route;
