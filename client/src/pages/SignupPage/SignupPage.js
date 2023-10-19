import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../../Components/ErrorMessage';
import axios from 'axios';
import Loading from '../../Components/Loading';
import { useEffect } from 'react';
import './SignupPage.css';


export const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setPic] = useState('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg');
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const userInfo = localStorage.getItem('userInfo');
  //   if (userInfo) {
  //     navigate('/home');
  //   }
  // }, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Password do not match!");
    }
    else {
      setMessage(null);
      try {
        //whenever we make an API request it takes json data, so we have to provide some headers
        const config = {
          headers: {
            "Content-type": "application/json"
          }
        }

        setLoading(true);

        const { data } = await axios.post(
          "http://localhost:8000/signup",
          {
            name,
            email,
            password,
            pic,
          },
          config,
        );

        localStorage.setItem('userInfo', JSON.stringify(data));

        setLoading(false);

        navigate('/home');
      } catch (error) {
        console.log(error);
        setError("Error: Signing Up!");
        setLoading(false);
      }
    }
  }

  return (
    <div className='signupPage-container'>
      <h1 className='signupPage-heading'>SIGNUP</h1>
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
      {loading && <Loading />}
      <form action="" className='signup-form' onSubmit={submitForm}>
        <div className='div'>
          <label htmlFor="name" className='label'>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='div'>
          <label htmlFor="email" className='label'>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='div'>
          <label htmlFor="password" className='label'>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}

          />
        </div>

        <div className='div password-input'>
          <label htmlFor="confirm-password" className='label'>Confirm Password</label>
          <input
            type={'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder='ReEnter your password'
            onChange={(e) => setConfirmPassword(e.target.value)}

          />
        </div>

        <div className='div profile-pic'>
          <label htmlFor="profile-picture" className='label'>Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={(e) => setPic(e)}
          />
        </div>

        <button className='signup-button' type="submit">SIGN UP</button>
      </form>
    </div>

  )
};
