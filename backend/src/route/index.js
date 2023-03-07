const { Router } = require("express");
const route = Router();
const userRoute = require("./user.route");

route.use("/user", userRoute);

module.exports = route;
