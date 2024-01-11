import React, { useEffect, useState } from "react";
import img from "./navbar.png";
import "./navbar.css";
import { post } from "../Rest";

function Navbar() {
  const [email,setemail]=useState('')
  const handlelogout = (e)=>{
    document.cookie="token=;expires="+(new Date()).toUTCString()
    window.location = window.location.href;
  }
  const initialTime = 60*60; // 60 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  
  useEffect(() => {
    (async()=>setemail(await post('email')))()
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          handlelogout()
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;     
  return (
    <nav id="victim_navbar">
      <img src={img} id="navbarimg" alt="" />
      <div id="title_div">
        <div>user ID:-{email}</div>
        <div>Report Cyber Crime</div>
        <div id='logout_div'>
          <div>Session Time out in {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div>
          <button onClick={handlelogout}>Log Out</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
