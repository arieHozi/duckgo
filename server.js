const express = require("express");
const bodyParser = require("body-parser");
const duck = require("./api/duck");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5002;

app.listen(port, () => {
  console.log(`server is runing on port:${port}`);
});

app.use("/api/duck", duck);

