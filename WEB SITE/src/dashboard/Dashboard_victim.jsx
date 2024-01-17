import React, { useState } from 'react';
import Navbar from '../Victim_components/Navbar';
import IncidentForm from '../Victim_components/IncidentForm';
import Menubar from '../Victim_components/Menubar';
import Statusincident from '../Victim_components/Statusincident';

function Dashboard_victim(props) {
  const [state, setstate] = useState('dashboard');

  return (
    <>
    <Navbar usetype={props.usetype} />

    <Menubar change={setstate}/>
    {state == "status"?<Statusincident />:<IncidentForm/>}
    </>

  )
}

export default Dashboard_victim;
