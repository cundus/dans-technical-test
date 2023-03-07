const { Router } = require("express");
const route = Router();
const JobsController = require("../controller/jobs.controller");

route.get("/?", JobsController.jobs);
route.get("/detail/:id", JobsController.job);

module.exports = route;
