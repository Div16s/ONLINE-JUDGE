import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Row,Col} from 'react-bootstrap';
import axios from 'axios';
import Loading from '../../Components/Loading';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { useEffect } from 'react';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo){
        navigate('/home');
    }
}, [navigate]);

  const submitForm = async (e) => {
    e.preventDefault();
    //console.log(email,password);

    try {
      //whenever we make an API request it takes json data, so we have to provide some headers
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }

      setLoading(true);

      const {data} = await axios.post(
        "http://localhost:8000/login",
        {
          email,
          password,
        },
        config,
      );

      console.log(data);
      localStorage.setItem('userInfo',JSON.stringify(data));

      setLoading(false);

    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 style={{ color: "white" }}>LOGIN</h1>
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

        <button className='login-signup-button' type='submit' style={{ fontWeight: "bold" }}>LOGIN</button>
      </form>
      <Row className='py-3'>
        <Col style={{backgroundColor:'white'}}>
          New User ? <Link to='/signup'>Register Here</Link>
        </Col>
      </Row>

    </div>
  )
};

