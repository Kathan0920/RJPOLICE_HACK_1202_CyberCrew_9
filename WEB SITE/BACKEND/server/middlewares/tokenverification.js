const { valid } = require("../controllers/login");

async function tokenverification(req, res, next) {
  try {
    const v = await valid(req.headers.token);
    if (v === true) {
      next();
    } else if (v === false) {
      res.status(401).json("wrong token");
      return;
    } else {
      // res.cookie("token", "", { expires: new Date() })
      res.status(401).json("not have v");
      return;
    }
    
  } catch (error) {
    console.log("tokenverification" , error);
  }finally{
    
  }
}

module.exports.tokenverification = tokenverification;
