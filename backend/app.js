const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());

const db = require("./database");

const port = process.env.PORT || 5000;

//Midlewares
app.use(morgan("dev"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

//routes
app.use("/auth", require("./routes/user.routes"));
app.use("/api/game", require("./routes/game.routes"));

app.listen(port, () =>
  console.log("App conectada correctamente en el puerto", port)
);

