import React ,{useState} from 'react'
import Navbar from '../Victim_components/Navbar'
import Downloadform from '../Police_components/Downloadform'
import Menubar from '../Victim_components/Menubar';
import Statusdownload from '../Police_components/Statusdownload';

function Dashboard_police() {
  const [state, setstate] = useState('dashboard');

  return (
    <>
    <Navbar />
    <Menubar change={setstate}/>
    {state == "status"?<Statusdownload />:<Downloadform/>}
    </>

  )
}

export default Dashboard_police