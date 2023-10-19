import React from 'react'
import { Navbar } from '../../Components/navbar';
import './home.css';
export const home = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <div className='home-container'>
      <div className='user-welcome'>
        <h1 style={{fontFamily:'Montserrat'}}>Welcome back {userInfo.name} ...</h1>
      </div>
      <div className='centered-text'>
        <h1>"Unleash Your Code Wizardry in the CodeSphere"</h1>
        <h2>"Where Ideas Become Functional Art"</h2>
      </div>
    </div>
  )
}
