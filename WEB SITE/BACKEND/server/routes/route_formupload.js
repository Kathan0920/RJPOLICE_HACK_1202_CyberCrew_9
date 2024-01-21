const express = require("express");
const route_formupload = express.Router();
const { uploadform,downloadimage ,downloadforms,uploadverify,downloadformsnotverify,} = require("../controllers/uploadform");
const {defreezebybank,downloadformsnotverifyfordefreeze,downloadformsfordefreeze}=require('../controllers/defreeze')
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

route_formupload.use(cookieParser());
route_formupload.use(bodyParser.json());

route_formupload.get("/", async (req, res) => {
    res
      .status(200)
      .sendFile(
        path.resolve(__dirname, "..", "..", "client", "public", "a.html")
      );
  });
  route_formupload.post("/upload", async (req, res) => {

    let success = await uploadform(req,res);
    
    res.status(200).json(success)
  });
  route_formupload.post("/verifybypolice", async (req, res) => {

    let success = await uploadverify(req);
  
    res.status(200).json(success);
  });
  route_formupload.get("/downloadformsnotverify", async (req, res) => {
    let success = await downloadformsnotverify(req.headers.token);
  
    res.status(200).json(success);
  });

  route_formupload.get("/downloadforms", async (req, res) => {
    let success = await downloadforms(req.headers.token);
  
    res.status(200).json(success);
  });
  
  
  //
  route_formupload.get("/image", async (req, res) => {
    let success = await downloadimage(req.headers.token);
    
    res.status(200).json(success);
  });
  
  
  
  
  
  
  
  
  route_formupload.post("/defreezebybank", async (req, res) => {

    let success = await defreezebybank(req);
  
    res.status(200).json(success);
  });
  route_formupload.get("/downloadformsnotverifyfordefreeze", async (req, res) => {
    let success = await downloadformsnotverifyfordefreeze(req.headers.token);
  
    res.status(200).json(success);
  });

  route_formupload.get("/downloadformsfordefreeze", async (req, res) => {
    let success = await downloadformsfordefreeze(req.headers.token);
  
    res.status(200).json(success);
  });
  
  
  
  
  module.exports.route_formupload = route_formupload;
  