import React ,{useEffect, useState} from 'react'
import Navbar from '../Victim_components/Navbar'
import Downloadform from '../Bank_components/Downloadform'
import Menubar from '../Victim_components/Menubar';
import Statusdownload from '../Bank_components/Statusdownload';
import { post } from '../Rest';

function Dashboard_bank(props) {
  const [state, setstate] = useState('dashboard');
  return (
    <>
    <Navbar usetype={props.usetype} />
    <Menubar change={setstate}/>
    {state == "status"?<Statusdownload />:<Downloadform/>}
    </>

  )
}

export default Dashboard_bank