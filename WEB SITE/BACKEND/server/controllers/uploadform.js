const {mongoose } = require("mongoose");
const {MongoClient,ObjectId} = require("mongodb")

const { incidentformModel } = require("../models/schema");
const { email } = require("./login");

const DBurl =
  process.env.DB_URL ||
  "mongodb+srv://koradiyaangel11:1234@quiz.73dex1f.mongodb.net/?retryWrites=true&w=majority";

module.exports.uploadform =async(req)=>{
  try {
    await mongoose.connect(DBurl, {
      dbName: "rajasthan_hackthon",
    });
    let emaill =await email(req.headers.token) 
    let data = req.body
    data['email']=emaill
    console.log("data",data);
    await incidentformModel.create(data);
  } catch (error) {
    
  }
  
  
  
  return req.body
}
module.exports.downloadimage = async(token)=>{
  await mongoose.connect(DBurl, {
    dbName: "rajasthan_hackthon",
  });
  let emaill =await email(token) 
  let check = await incidentformModel.findOne({ email: emaill });
  return check
}
module.exports.downloadforms = async(token)=>{
  await mongoose.connect(DBurl, {
    dbName: "rajasthan_hackthon",
  });
  let check = await incidentformModel.find({email:'ak@123'},{__v:0,__id:0});
  console.log(check);
  return check
}