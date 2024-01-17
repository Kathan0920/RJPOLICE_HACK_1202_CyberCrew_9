import React from 'react'
import { Link } from 'react-router-dom'
import './menubar.css'
function Menubar(props) {
  
  return (
    <section id='menubar'>
        <button onClick={()=>props.change('dashboard')}>Dashboard</button>
        <button onClick={()=>props.change('status')}>Status</button>
    </section>
  )
}

export default Menubar