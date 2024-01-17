import React from 'react'
import { Link } from 'react-router-dom'
import './menubar.css'
function Menubar(props) {
  
  return (
    <section id='menubar'>
        <div><button onClick={()=>props.change('dashboard')}>Dashboard</button></div>
        <div><button onClick={()=>props.change('status')}>Status</button></div>
    </section>
  )
}

export default Menubar