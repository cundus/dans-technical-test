const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("DANS MULTIPRO TECHNICAL TEST - BACKEND!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
