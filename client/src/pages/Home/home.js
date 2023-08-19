import React from 'react'
import { Navbar } from '../../Components/navbar';
import './home.css';
export const home = () => {
  return (
    <div className='home-container'>
      <Navbar />
      <div className='centered-text'>
        <h1>"Unleash Your Code Wizardry in the CodeSphere"</h1>
        <h2>"Where Ideas Become Functional Art"</h2>
      </div>
    </div>
  )
}
