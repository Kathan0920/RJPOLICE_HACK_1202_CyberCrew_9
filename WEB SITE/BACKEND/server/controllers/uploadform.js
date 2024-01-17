const { mongoose } = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb");
const { findusertype } = require("./login");
const { incidentformModel } = require("../models/schema");
const { email } = require("./login");

const DBurl =
  process.env.DB_URL ||
  "mongodb+srv://koradiyaangel11:1234@quiz.73dex1f.mongodb.net/?retryWrites=true&w=majority";

module.exports.uploadform = async (req) => {
  try {
    await mongoose.connect(DBurl, {
      dbName: "rajasthan_hackthon",
    });

    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };
    
   
    let randomComponent;
    while (1) {
      randomComponent = Math.floor(Math.random() * 9000) + 1000;
      const result = await incidentformModel.findOne({
        applicationNo: randomComponent,
      });
      if (!result) {
        break;
      }
    }
    let emaill = await email(req.headers.token);
    let data = req.body;
    data["email"] = emaill;
    data["applicationNo"] = randomComponent;

    let get = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: JSON.stringify(data),
      headers: headersList,
    });
    const responseData = await get.json();
    console.log("responseData",responseData);
    data = { ...data, ...responseData };

    await incidentformModel.create(data);
  } catch (error) {
    console.log(error);
    return false;
  }

  return req.body;
};
module.exports.uploadverify = async (req) => {
  try {
    await mongoose.connect(DBurl, {
      dbName: "rajasthan_hackthon",
    });
    let check = await findusertype(req.headers.token);

    let emaill = await email(req.headers.token);
    
    let data = {};
    if (check == "Police") {
      data["verifybypoliceemail"] = emaill;
      data["verifybypolice"] = req.body.verifybypolice;
    } else if (check == "Bank") {
      data["verifybybankemail"] = emaill;
      data["verifybybank"] = req.body.verifybypolice;
      
    } else if(check=="Court") {
      data["verifybycourtemail"] = emaill;
      data["verifybycourt"] = req.body.verifybypolice;

    }
      else {
      return false;
    }
    let verifyupdate = await incidentformModel.updateOne(
      { applicationNo: req.body.applicationNo },
      { $set: data }
    );
    console.log("object");
    if (verifyupdate.matchedCount == 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports.downloadformsnotverify = async (token) => {
  await mongoose.connect(DBurl, {
    dbName: "rajasthan_hackthon",
  });
  let check = await findusertype(token);
  if (check == "Police") {
    if (check && check != false && check != "") {
      let data = await incidentformModel.find(
        {
          verifybypolice: { $exists: false },
          verifybypoliceemail: { $exists: false },
        },
        { __v: 0, __id: 0 }
      );
      //api post
      return data;
    }
  } else if (check == "Bank") {
    let data = await incidentformModel.find(
      {
        verifybypolice: "yes",
        verifybypoliceemail: { $exists: true },
        bankbool:true,
        verifybybank: { $exists: false },
        verifybybankemail: { $exists: false },
      },
      { __v: 0, __id: 0 }
      );
      
      return data;
    } else if(check=="Court"){
      let data = await incidentformModel.find(
        {
          $or: [
            {
              $and: [
                { bankbool: true },
                { verifybybank: { $exists: true } },
                { verifybypolice: "yes" },
                { verifybypoliceemail: { $exists: true } }
                // Add other conditions if needed
              ]
            },
            {
              $and: [
                { bankbool: false },
                { verifybybank: { $exists: false } },
                { verifybypolice: "yes" },
                { verifybypoliceemail: { $exists: true } }
                // Add other conditions if needed
              ]
            }
          ]
        },
        { __v: 0, __id: 0 }
        );
        
        return data;
        
      }
      else {
        return false;
      }
    };
    module.exports.downloadforms = async (token) => {
      await mongoose.connect(DBurl, {
        dbName: "rajasthan_hackthon",
      });
      let check = await findusertype(token);
      let emaill = await email(token);
      if (check == "Police") {
        if (check && check != false && check != "") {
          let data = await incidentformModel.find(
            {
              verifybypolice: { $exists: true },
              verifybypoliceemail: emaill,
            },
            { __v: 0, __id: 0 }
            );
            
            return data;
          } else {
            return false;
          }
        } else if (check == "Victim") {
          if (check && check != false && check != "") {
            let data = await incidentformModel.find(
              { email: emaill },
              { __v: 0, __id: 0 }
              );
              // console.log(object);
              return data;
            } else {
              return false;
            }
          } else if (check == "Bank") {
            let data = await incidentformModel.find(
              {
                verifybypolice: "yes",
                verifybypoliceemail: { $exists: true },
                bankbool:true,

                verifybybank: { $exists: true },
                verifybybankemail: emaill,
              },
              { __v: 0, __id: 0 }
              );
              // console.log(object);
              return data;
              
            } else if (check == "Court") {
              let data = await incidentformModel.find(
                {
                  verifybypolice: "yes",
                  verifybypoliceemail: { $exists: true },
                  verifybybank: "yes",
                  verifybybankemail: {$exists:true},
                  verifybycourt: { $exists: true },
                  verifybycourtemail: emaill,
                  
                },
                { __v: 0, __id: 0 }
                );
                // console.log(object);
                return data;
              } 
              
              else {
                return false;
  }
};
module.exports.downloadimage = async (token) => {
  await mongoose.connect(DBurl, {
    dbName: "rajasthan_hackthon",
  });
  let emaill = await email(token);
  if (emaill) {
    let check = await incidentformModel.findOne({ email: emaill });
    return check;
  } else {
    return false;
  }
};
