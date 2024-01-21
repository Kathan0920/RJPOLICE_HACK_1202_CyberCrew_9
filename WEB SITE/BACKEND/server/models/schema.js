const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: String,
  password: String,
  usertype: String,
});
//companyname => usetype
//canceled page

const loginModel = mongoose.model("login", loginSchema);

const incidentformSchema = new mongoose.Schema({
  applicationNo:Number,
  
  email: String,
  type:String,
  category: String,
  subcategory: String,
  delay: Boolean,
  bankbool: Boolean,
  bank: Object,
  date:Date,
  delay: Boolean,
  incidentoccur: String,
  incidentoccurID: String,
  description: String,
  header:String,
  emailtakenby:String,
  whereid:String,
  proof:String,

  legitment:String,
  
  verifybypolice:String,
  verifybypoliceemail:String,
  
  verifybybank:String,
  verifybybankemail:String,

  verifybycourt:String,
  verifybycourtemail:String,

  defreezestatus:String,
  defreezestatusbyemail:String
  
});
const incidentformModel = mongoose.model("incidentform", incidentformSchema);

module.exports.loginModel = loginModel;
module.exports.incidentformModel = incidentformModel;
