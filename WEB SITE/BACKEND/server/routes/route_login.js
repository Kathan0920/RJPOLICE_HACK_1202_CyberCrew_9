const express = require("express");
const route_login = express.Router();
const { signup, login, signout, valid ,findusertype ,email } = require("../controllers/login");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

route_login.use(cookieParser());
route_login.use(bodyParser.json());
route_login.get("/", async (req, res) => {
  res
    .status(200)
    .sendFile(
      path.resolve(__dirname, "..", "..", "client", "public", "a.html")
    );
});

route_login.post("/signup", async (req, res) => {
  console.log(req.body);
  let success = await signup(req.body);

  res.status(200).json(success);
});

route_login.post("/login", async (req, res) => {
  let success = await login(req.body, res);

  res.status(200).json(success);
});
route_login.post("/valid", async (req, res) => {
  if (req.headers.token != "undefined") {
    const v = await valid(req.headers.token);
    res.status(200).json(v);
  } else {
    res.status(200).json(false);
  }
});
route_login.post("/findusertype", async (req, res) => {
  if (req.headers.token != "undefined") {
    const v = await findusertype(req.headers.token);
    res.status(200).json(v);
  } else {
    res.status(200).json(false);
  }
});

route_login.post("/email", async (req, res) => {
  if (req.headers.token != "undefined") {
    const v = await email(req.headers.token);
    res.status(200).json(v);
  } else {
    res.status(200).json(false);
  }
});

route_login.post("/signout", signout);


module.exports.route_login = route_login;
