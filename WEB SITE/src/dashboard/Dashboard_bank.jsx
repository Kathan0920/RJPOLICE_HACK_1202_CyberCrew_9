import React ,{useState} from 'react'
import Navbar from '../Victim_components/Navbar'
import Downloadform from '../Bank_components/Downloadform'
import Menubar from '../Victim_components/Menubar';
import Statusdownload from '../Bank_components/Statusdownload';

function Dashboard_bank() {
  const [state, setstate] = useState('dashboard');

  return (
    <>
    <Menubar change={setstate}/>
    {state == "status"?<Statusdownload />:<Downloadform/>}
    </>

  )
}

export default Dashboard_bank