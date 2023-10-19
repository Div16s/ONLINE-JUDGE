import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../../Components/Loading';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { useEffect } from 'react';
import './LoginPage.css'


export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    e.target.disabled = true;

    try {
      //whenever we make an API request it takes json data, so we have to provide some headers
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }

      const { data } = await axios.post(
        "http://localhost:8000/login",
        {
          email,
          password,
        },
        config,
      );

      // console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);
      navigate('/home');
    } catch (error) {
      setError("Invalid email or password!");
      setLoading(false);
    }
    e.target.disabled = false;
  }

  return (
    <div className='loginPage-container'>
      <h1 className='loginPage-heading'>LOGIN</h1>
      {loading && <Loading />}
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      <form action='' className='login-form' onSubmit={submitForm}>
        <div className='div'>
          <label htmlFor='email' className='label'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
          >
          </input>
        </div>

        <div className='div'>
          <label htmlFor='password' className='label'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
          >
          </input>
        </div>
  
        <p><Link to='/forgetPassword'>Forget Password?</Link></p>

        <button className='login-signup-button' type='submit' style={{ fontWeight: "bold" }}>LOGIN</button>
        <Row className='py-3 px-3'>
          <Col style={{ backgroundColor: 'white' }}>
            New User ? <Link to='/signup'>Register Here</Link>
          </Col>
        </Row>
      </form>


    </div>
  )
};

