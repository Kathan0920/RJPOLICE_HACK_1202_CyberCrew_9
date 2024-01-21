import React ,{useEffect, useState} from 'react'
import Downloadform from '../Bank_components/defreeze/Downloadform'
import Menubar from '../Victim_components/Menubar';
import Statusdownload from '../Bank_components/defreeze/Statusdownload';

function Defreezenoti(props) {
  const [state, setstate] = useState('dashboard');
  return (
    <>
    <Menubar change={setstate}/>
    {state == "status"?<Statusdownload />:<Downloadform/>}
    </>

  )
}

export default Defreezenoti