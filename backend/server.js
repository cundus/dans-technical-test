require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/route/index");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("DANS MULTIPRO TECHNICAL TEST - BACKEND!"));
app.use("/api", routes);

app.listen(port, () => console.log(`Dans api listening on port ${port}!`));
