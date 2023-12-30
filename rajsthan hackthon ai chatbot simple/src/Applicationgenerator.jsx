import React, { useEffect, useState } from 'react'
import './application.css'
import Cookie from "js-cookie"
function Applicationgenerator() {
  const [data,setData]=useState({"hek":"dad"})
  const [keys,setKeys]=useState([])
  document.cookie = "auth=john_doe"
  const postData = async (bodyy) => {
    try {
      const response = await fetch('http://localhost:3000/api/refno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
          }
        ,
        body: JSON.stringify({query:bodyy,cookie:Cookie.get('auth')}),

    });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result
    } catch (error) {
      console.log(error);
    } 
  };
  const [refno,setrefno]=useState('')
  const refnohandle =(e)=>{setrefno(e.target.value)}
  const buttonHandle = async()=>{
    setData(await postData(refno))
    setKeys(Object.keys(data))

  }
  return (<>
    <section id='application'>
    <p>Reference No. :- </p> <input type="text" name="refno" onChange={refnohandle} id="refno" placeholder='ref no'/>
    <button type="submit" onClick={buttonHandle}>Search</button>
    </section>
  {keys.map((key)=>{
    return ( <>{key}  {data[key]}<br /></>)
  })}
  </>
  )
}

export default Applicationgenerator