import React ,{useState} from 'react'
import Navbar from '../Victim_components/Navbar'
import Downloadform from '../Court_components/Downloadform'
import Menubar from '../Victim_components/Menubar';
import Statusdownload from '../Court_components/Statusdownload';

function Dashboard_court(props) {
  const [state, setstate] = useState('dashboard');
  
  return (
    <>
    <Navbar usetype={props.usetype} />
    <Menubar change={setstate}/>
    {state == "status"?<Statusdownload />:<Downloadform/>}
    </>

  )
}

export default Dashboard_court