import React, { useEffect, useState } from "react";

import { get, post } from "../Rest";
function Statusdownload() {
  const [data, setdata] = useState([]); 
  const [verifications,setVerifications] = useState({}); 
  const handleVerify = (e) => {
    const updatedVerifications = { ...verifications, [e.target.name]: e.target.value };
    setVerifications(updatedVerifications);
  };

console.log(data);

  const handlesubmit = async(e)=>{
    e.preventDefault()
    await post('formupload/verifybypolice',{verifybypolice:verifications[`verify_${e.target.name}`],applicationNo:e.target.name})
    setdata(await get("formupload/downloadforms"))
  }
    useEffect(() => {
      (async () => {
        setdata(await get("formupload/downloadforms"))
      })()
    }, []);
  const handleImageClick = (e) => {
    const blob = base64ToBlob(e.target.src);
    const blobUrl = URL.createObjectURL(blob)
    
    window.open(blobUrl, '_blank');

  };
  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/png' }); // Adjust the MIME type accordingly
  };
  return ( <section id="statusincident_section" className="status"> 
  <ul>
    {data.length==0 ?<div className="loading-container">
      <div className="loader"></div></div>:data.map((item) => (
      <li key={item.applicationNo}>
        {/* {Object.entries(item).map(([key, value]) => (
        <p key={key}>
          {key}: {JSON.stringify(value)}
        </p>
      ))} */}
      <div>
        <p>Application Number :- {item['applicationNo']}</p>
      </div>
        <div>
          <p>Email : {item["email"]}</p>
          <p>Category : {item["category"]}</p>
          <p>Sub-Category : {item["subcategory"]}</p>
          <p>Date : {item["date"]}</p>
          <p>Delay : {JSON.stringify(item["delay"])}</p>
        </div>
        <div
          style={{ display: item["bankbool"] == true ? "block" : "none" }}
        >
          <p>Bank Name : {item["bank"]["bankname"]}</p>
          <p>IFSC No. : {item["bank"]["ifsc"]}</p>
          <p>Account No. : {item["bank"]["accno"]}</p>
          <p>Transsaction ID : {item["bank"]["transactionID"]}</p>
          <p>Amount : {item["bank"]["amount"]}</p>
          <p>Ref No. : {item["bank"]["refno"]}</p>
          <p>Date : {item["bank"]["date"]}</p>
        </div>
        <div
          style={{
            display:
              item["subcategory"] ==
              "Business Email Compromise/Email Takeover"
                ? "block"
                : "none",
          }}
        >
          <p>Email Taken by : {item["emailtakenby"]}</p>
          <p>Header: {item["header"]}</p>
        </div>
        <div>
          <p>where incident occur: {item["incidentoccur"]}</p>
          <p>ID: {item["whereid"]}</p>
          <img
            src={item["proof"]}
            alt="noimage"
            style={{ cursor: "pointer" }}
            onClick={handleImageClick}
            height={"100px"}
          />
        </div>
        <div>
          <p>
            Our Peridction :-
            {item["legitment"]}
          </p>
          <p>
            Your Verification :-
            {item["verifybypolice"]}
          </p>
          {item['verifybybank']?<p>
            bank Status :-
            {JSON.stringify(item['verifybybank'])}
          </p>:''}
          {item['verifybycourt']?<p>
            Court Desicison :-
            {JSON.stringify(item['verifybycourt'])}
          </p>:''}
        </div>
      </li>
    ))}
  </ul>
</section>
);
}

export default Statusdownload;
