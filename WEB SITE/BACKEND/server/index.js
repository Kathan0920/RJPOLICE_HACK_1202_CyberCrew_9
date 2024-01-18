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

app.post('/api/postData',(req,res)=>{
  console.log(req.body);
  if (req.body.query == ' ' || (req.body.query.match('  ')&&req.body.query.match('complaint'))){
    res.status(200).json({message:"1. Contact the Bank Immediately: - you should contact her bank as soon as you becomes aware of the fraudulent transactions. Inform the bank about the unauthorized access to her account and provide details of the incident. .. ..2. Freeze the Account:- Request the bank to freeze the affected account to prevent further unauthorized transactions. This step helps limit the financial impact and prevents additional losses. .. ..3. Document the Incident: - Keep a detailed record of all communications with the bank, including dates, times, and the names of the individuals you speaks to. This documentation can be crucial in the recovery process. .. ..4. File a Police Report: - Report the cyber fraud incident to local law enforcement. Provide them with a comprehensive overview of the situation, including details of the phishing email, fraudulent transactions, and any other relevant information. .. ..5. Report to Cybercrime Authorities: - Depending on the jurisdiction, you should report the cybercrime to relevant cybercrime units or agencies. They may specialize in investigating and combating online fraud. .. ..6. Collaborate with Cybersecurity Professionals: - Engage cybersecurity professionals to analyze the incident, identify vulnerabilities, and implement measures to prevent future attacks. This step is crucial for ensuring the security of yous online accounts. .. ..7. Cooperate with Financial Institutions: - Work closely with the banks fraud department to provide any additional information they may require. Financial institutions often have dedicated teams to investigate and resolve fraud cases. .. ..8. Insurance Claims: - If you has cybersecurity insurance, you should contact her insurance provider to initiate the claims process. Insurance coverage may help mitigate financial losses. .. ..9. Legal Assistance: - Consider seeking legal advice to understand potential legal avenues for recovering the funds. Legal professionals can provide guidance on the best course of action based on the specific circumstances and applicable laws. .. ..10. Stay Informed and Vigilant: - Regularly monitor bank statements and credit reports for any unusual activity. Staying vigilant can help detect any subsequent fraudulent attempts and allow for immediate action. .."})
  }
  else if(req.body.query == 'how to defreeze the money' || req.body.query.match('defreeze') ){
    res.status(200).json({message:"1.Contact Your Bank:   - Immediately get in touch with your bank through their customer support helpline. Verify the contact details from the official website or your account statements to ensure you are reaching the legitimate customer service. .. .. 2.Provide Necessary Information:- Clearly explain the situation to the bank representative and provide any necessary information they request. This may include your account details, recent transactions, and details about the suspected fraud. .. .. 3.Verify Your Identity:- The bank may ask you to verify your identity to ensure that you are the account holder. Be prepared to provide personal information and answer security questions. .. .. 4.Request Account Freeze Removal:- Request the removal of the freeze on your account. The bank will likely investigate the issue and take appropriate actions to secure your account. .. .. 5.Follow Bank Procedures:- Adhere to any procedures or protocols provided by the bank to resolve the issue. This may involve filling out specific forms, providing additional documentation, or following certain verification processes. .. .. 6.Report to Law Enforcement:- If the freeze is related to suspected fraudulent activity or cybercrime, consider filing a police report. Provide the police with details of the incident and any evidence you may have. .. .. 7.Monitor Account Activity:- Keep a close eye on your account activity during and after the resolution process. Report any unauthorized transactions promptly. .. .. 8.Check for Legal Assistance:- If the freeze is related to legal matters or if you encounter difficulties resolving the issue with the bank, consider seeking legal advice. Consult with an attorney who specializes in financial or banking law."})
  }
  else if(req.body.query == ' ' || req.body.query.match('details') ){
    res.status(200).json({message:"When filing a cybercrime complaint in India, provide: .. .. 1.Personal details (name, contact info). .. .. 2.Incident specifics (date, time, description). .. .. 3.Financial details (amount, transactions). .. .. 4.Communication details (email, phone numbers). .. .. 5.Evidence (screenshots, URLs, files). .. .. 6.Device information (type, IP addresses). .. .. 7.Witness information (if applicable). .. .. 8.Steps taken to mitigate. .. .. 9.Previous complaint/reference number (if any)."})
  }
  else {
    res.status(200).json({message:'1. Contact the Bank Immediately: - you should contact her bank as soon as you becomes aware of the fraudulent transactions. Inform the bank about the unauthorized access to her account and provide details of the incident. ..2. Freeze the Account:- Request the bank to freeze the affected account to prevent further unauthorized transactions. This step helps limit the financial impact and prevents additional losses. ..3. Document the Incident:   - Keep a detailed record of all communications with the bank, including dates, times, and the names of the individuals you speaks to. This documentation can be crucial in the recovery process. ..4. File a Police Report:   - Report the cyber fraud incident to local law enforcement. Provide them with a comprehensive overview of the situation, including details of the phishing email, fraudulent transactions, and any other relevant information. ..5. Report to Cybercrime Authorities:   - Depending on the jurisdiction, you should report the cybercrime to relevant cybercrime units or agencies. They may specialize in investigating and combating online fraud. ..6. Collaborate with Cybersecurity Professionals:   - Engage cybersecurity professionals to analyze the incident, identify vulnerabilities, and implement measures to prevent future attacks. This step is crucial for ensuring the security of yous online accounts. ..7. Cooperate with Financial Institutions:   - Work closely with the banks fraud department to provide any additional information they may require. Financial institutions often have dedicated teams to investigate and resolve fraud cases. ..8. Insurance Claims:   - If you has cybersecurity insurance, you should contact her insurance provider to initiate the claims process. Insurance coverage may help mitigate financial losses. ..9. Legal Assistance:   - Consider seeking legal advice to understand potential legal avenues for recovering the funds. Legal professionals can provide guidance on the best course of action based on the specific circumstances and applicable laws. ..10. Stay Informed and Vigilant:    - Regularly monitor bank statements and credit reports for any unusual activity. Staying vigilant can help detect any subsequent fraudulent attempts and allow for immediate action. ..'})
  }
})
app.use(tokenverification)

app.use('/formupload',route_formupload)




app.listen(port, () => {
  console.log(`Server is Running on ${baseUrl} at ${port}`);
});
