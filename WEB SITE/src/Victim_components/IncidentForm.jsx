import React, { useState } from "react";
import InputDate from "./InputDate";
import "./incidentform.css";
import InputMoney from "./InputMoney";
import { post, get } from "../Rest";
function IncidentForm() {
  const [category, setCategory] = useState("Online Finacial Fraud");
  const [subcategory, setsubcategory] = useState("");
  const [delay, setdelay] = useState("no");
  const [bankbool, setbankbool] = useState("no");
  const [incidentoccur, setincidentoccur] = useState("");
  const [bank, setbank] = useState("");
  const [date, setdate] = useState("");
  const [whereid, setwhereid] = useState("");
  const [description, setdescription] = useState("");
  const [emailtakenby, setemailtakenby] = useState("");
  const [header, setheader] = useState("");
  const [proof, setproof] = useState("");
  const [image, setimage] = useState("");
  console.log(date);
  const handleOptionChange = (e) => {
    if (e.target.name == "delay") {
      setdelay(e.target.value);
    } else if (e.target.name == "moneylost") {
      setbankbool(e.target.value);
    }
  };

  const options = ["Online Finacial Fraud"];
  const optionsforsubcategory = [
    "Aadhar Enabled Payment System (AEPS)",
    "Business Email Compromise/Email Takeover",
    "Debit/Credit Card Fraud/Sim Swap Fraud",
    "Demat/Depository Fraud",
    "E-Wallet Related Fraud",
    "Fraud Call/Vishing",
    "Internet Banking Related Fraud",
    "UPI Related Frauds",
  ];
  const optionsforplatform = [
    "Email",
    "Facebook",
    "Instagram",
    "Snapchat",
    "Twitter",
    "WhatsApp",
    "Website Url",
    "Youtube",
    "LinkedIn",
    "Telegram",
    "Mobile App",
    "Other",
  ];
  const handleSelect = (e) => {
    if (e.target.name == "subcategory") {
      setsubcategory(e.target.value);
    } else if (e.target.name == "category") {
      setCategory(e.target.value);
    } else if (e.target.name == "whereincident") {
      setincidentoccur(e.target.value);
    }
  };
  const handleText = (e) => {
    if (e.target.name == "whereid") {
      setwhereid(e.target.value);
    } else if (e.target.name == "description") {
      setdescription(e.target.value);
    } else if (e.target.name == "header") {
      setheader(e.target.value);
    } else if (e.target.name == "emailtakenby") {
      setemailtakenby(e.target.value);
    }
  };

  const upload = async (e) => {
    e.preventDefault();
    if (
      category != "" &&
      subcategory != "" &&
      delay != "" &&
      bankbool != "" &&
      incidentoccur != "" &&
      date != "" &&
      description != "" &&
      whereid != "" &&
      proof != ""
    ) {
      const res = await post("formupload/upload", {
        category,
        subcategory,
        emailtakenby,
        header,
        delay,
        bankbool,
        incidentoccur,
        bank,
        whereid,
        date,
        description,
        proof,
      });
      if(res){
        alert('Uploaded Sucessfully')
        // document.location=document.location.href

      }else{
        alert('there is problem in request')
      }
    } else {
      alert("fill up required information");
    }

  };
  const handleimage = async (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setproof(reader.result);
    };
    // reader.error=(error)=>{console.log(error);}
    console.log(e.target.files[0]);
    // setimage((await get('formupload/image')).proof)
    setimage(e.target.files[0].name);
  };
  return (
    <section id="incidentform">
      <div>
        <div className="dropdownLabel"> Category of complaint *:-</div>
        <select
          value={category}
          name="category"
          onChange={(e) => handleSelect(e)}
          className={"dropdownSelect"}
          placeholder={"role"}
          disabled={true}
        >
          <option value="" disabled>
            ---Select---
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="dropdownLabel"> Sub-Category of complaint *:-</div>
        <select
          value={subcategory}
          name="subcategory"
          onChange={(e) => handleSelect(e)}
          className={"dropdownSelect"}
          placeholder={"role"}
        >
          <option value="" disabled>
            Select an option
          </option>
          {optionsforsubcategory.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display:
            subcategory == "Business Email Compromise/Email Takeover"
              ? "flex"
              : "none",
        }}
      >
        <div className="dropdownLabel">
          Email from which authorization email has been received
        </div>
        <input
          type="text"
          name="emailtakenby"
          id="emailtakenby"
          onChange={handleText}
        />
        <div className="dropdownLabel">Full Header of the alleged email</div>
        <input type="text" name="header" id="header" onChange={handleText} />
      </div>
      <div>
        <div className="dropdownLabel"> Money Lost ? :-</div>
        <label>
          <input
            name="moneylost"
            type="radio"
            value="yes"
            checked={bankbool === "yes"}
            onChange={handleOptionChange}
          />
          Yes
        </label>
        <label>
          <input
            name="moneylost"
            type="radio"
            value="no"
            checked={bankbool === "no"}
            onChange={handleOptionChange}
          />
          No
        </label>
      </div>
      <div style={{ display: bankbool == "no" ? "none" : "flex" }}>
        <InputMoney change={setbank} />
      </div>
      <div>
        <InputDate change={setdate} />
      </div>

      <div>
        <div className="dropdownLabel"> Delay in reporting? :-</div>
        <label>
          <input
            name="delay"
            type="radio"
            value="yes"
            checked={delay === "yes"}
            onChange={handleOptionChange}
          />
          Yes
        </label>
        <label>
          <input
            name="delay"
            type="radio"
            value="no"
            checked={delay === "no"}
            onChange={handleOptionChange}
          />
          No
        </label>
      </div>
      <div>
        <div className="dropdownLabel"> where did the incident occur? *:-</div>

        <select
          value={incidentoccur}
          name="whereincident"
          onChange={(e) => handleSelect(e)}
          className={"dropdownSelect"}
          placeholder={"role"}
        >
          <option value="" disabled>
            Select an option
          </option>
          {optionsforplatform.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: incidentoccur == "" ? "none" : "flex" }}>
        <div className="dropdownLabel">
          Give id of {incidentoccur} of suspect *:-
        </div>
        <input type="text" name="whereid" id="whereid" onChange={handleText} />
      </div>
      <div style={{ display: incidentoccur == "" ? "none" : "flex" }}>
      <div className="dropdownLabel">Upload Proof *:-</div>
        <input type="file" name="proof" id="proof" onChange={handleimage} />
      </div>
      {/* {image == ""?'':image+'  selected'} */}
      <div id="textarea_div">
        <div className="dropdownLabel">
          provide any addition details of the incident? *:-
        </div>
        <textarea
          value={description}
          onChange={handleText}
          name="description"
          id="info"
          cols="100"
          rows="10"
        ></textarea>
      </div>
      <button type="submit" id="formsubmit" onClick={upload}>
        Save & Next
      </button>
    </section>
  );
}

export default IncidentForm;
