const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const { tokenverification } = require("./middlewares/tokenverification");
const {route_formupload} = require('./routes/route_formupload')
const { route_login } = require("./routes/route_login");


const baseUrl = "http://localhost:8383";
const port = 8383;

app.use(express.json({ limit: '10mb' }));


app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


app.use('/',route_login)

app.use(tokenverification)

app.use('/formupload',route_formupload)

app.post('/api/postData',(req,res)=>{
  res.json('jel')
})



app.listen(port, () => {
  console.log(`Server is Running on ${baseUrl} at ${port}`);
});
