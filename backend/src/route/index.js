const { Router } = require("express");
const route = Router();
const userRoute = require("./user.route");
const jobsRoute = require("./jobs.route");

route.use("/user", userRoute);
route.use("/jobs", jobsRoute);

module.exports = route;
