const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
// Use cors middleware to enable cross-origin requests
app.use(cors());
app.use(bodyParser.json());

let i = 0;
// Sample API route
app.get('/',(req,res)=>{
  res.json("dsadss")
})
app.get('/api/data', (req, res) => {
    const data = { message: 'Hello from the API!' };
    console.log(req);
    res.json(data);

});
app.post('/api/postData',(req,res)=>{
  console.log(req.body);
  if(req.body.query == 'how to defreeze the money' || req.body.query.includes(' defreeze') ){
    res.status(200).json({message:"Step 1 :- Login .... Step 2 :- Check Status .... Step 3 :- further details call customer care"})
  }
  else if (req.body.query == 'how to file complaint cyber crime' || (req.body.query.includes(' file')&&req.body.query.includes(' complaint'))){
    res.status(200).json({message:"Step 1 :- Login .... Step 2 :- Give Details like name , phone no, address , bank details , father name , etc  .... Step 3 :- Provide Incident Details like what type of sub-category of cyber crime , when fraud is done , provide details about scam in 200 words .... Step 4 :- Provide suspect name , id, if photo there upload , if address that also provide .... Step 5 :- upload proofs .... Step 6 :- submit application  "})
  }
  else {
    res.status(200).json({message:'promt not suffiecient'})
  }
})
// Serve static files (optional)
app.post('/api/refno',(req,res)=>{
  console.log(req.body);
  res.status(200).json({name:"angel koradiya" , address:'201 ,ajay ,manavadar,junagadh' , phoneno:888811118,bankacc:2121212212211,bankifsc:"BKID0003301" ,"our data analsis":"phishing"})
})
// Serve static files (optional)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
