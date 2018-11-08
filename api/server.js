const express = require("express");
// const helmet = require("helmet"); // helmet is for server security.
// const morgan = require("morgan"); // morgan is a logger
// == INSTALLATION ==
// npm i express helmet morgan
// yarn add express helmet morgan

const productRouter = require("../products/productRouter");

const server = express();

// configure middleware
// ORDER MATTERS! they will execute from top to bottom
server.use(express.json()); // built in
// server.use(helmet()); // 3rd party
// server.use(morgan("short")); // 3rd party
// custom middleware
function gatekeeper(req, res, next) {
  if (req.body.password === "mellon") {
    // next points to the next middleware/route handler in queue
    console.log("welcome travelers");

    req.welcomeMessage = "welcome to the mines of Morio";
    next();
  } else {
    res.send("you shall not pass");
  }
}

server.use(gatekeeper); // using middleware globally

// configure endpoints (route handlers are middleware)
server.get("/", (req, res) => {
  res.status(200).json({api: "running"});
});

server.get("/", (req, res) => {
  res.send(req.welcomeMessage);
});

server.use("/api/products/", productRouter);
module.exports = server;
