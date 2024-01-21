const { mongoose } = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb");
const { findusertype } = require("./login");
const { incidentformModel } = require("../models/schema");
const { email } = require("./login");

const DBurl =
  process.env.DB_URL ||
  "mongodb+srv://koradiyaangel11:1234@quiz.73dex1f.mongodb.net/?retryWrites=true&w=majority";

module.exports.defreezebybank = async (req) => {
  try {
    await mongoose.connect(DBurl, {
      dbName: "rajasthan_hackthon",
      serverSelectionTimeoutMS: 5000, // Set a timeout for server selection
      socketTimeoutMS: 45000,
    });
    let check = await findusertype(req.headers.token);

    let emaill = await email(req.headers.token);

    let data = {};
    data["defreezestatus"] = req.body.verifybypolice;
    data["defreezestatusbyemail"] = emaill;

    if (check == "Bank") {
      let verifyupdate = await incidentformModel.updateOne(
        { applicationNo: req.body.applicationNo },
        { $set: data }
      );
      if (verifyupdate.matchedCount == 0) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await mongoose.disconnect();
  }
};
module.exports.downloadformsnotverifyfordefreeze = async (token) => {
  try {
    await mongoose.connect(DBurl, {
      dbName: "rajasthan_hackthon",
      serverSelectionTimeoutMS: 5000, // Set a timeout for server selection
      socketTimeoutMS: 45000,
    });
    let check = await findusertype(token);
    if (check == "Bank") {
      let data = await incidentformModel.find(
        {
          verifybypolice: "yes",
          verifybypoliceemail: { $exists: true },
          bankbool: true,
          verifybycourt: "yes",
          verifybycourtemail: { $exists: true },
        },
        { __v: 0, __id: 0 }
      );

      return data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await mongoose.disconnect();
  }
};
module.exports.downloadformsfordefreeze = async (token) => {
  try {
    await mongoose.connect(DBurl, {
      dbName: "rajasthan_hackthon",
      serverSelectionTimeoutMS: 5000, // Set a timeout for server selection
      socketTimeoutMS: 45000,
    });
    let check = await findusertype(token);
    let emaill = await email(token);
      if (check == "Bank") {
        let data = await incidentformModel.find(
          {
            verifybypolice: "yes",
          verifybypoliceemail: { $exists: true },
          bankbool: true,
          verifybycourt: "yes",
          verifybycourtemail: { $exists: true },
          defreezestatus:{$exists:true},
          defreezestatusbyemail:{$exists:true}
          },
          { __v: 0, __id: 0 }
        );
        // console.log(object);
        return data;
      } else {
        return false;
      }
    
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await mongoose.disconnect();
  }
};
