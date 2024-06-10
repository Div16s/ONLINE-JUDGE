import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './LoginPage.css'
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../atoms/userAtom';
import { Button } from '@chakra-ui/react';
import { useShowToast } from '../../hooks/useShowToast';
import { Input } from '@chakra-ui/react';

export const LoginPage = () => {
  const setUser = useSetRecoilState(userAtom);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();

  const submitForm = async (e) => {
    e.preventDefault();
    if (!email || !password) return showToast('Error', 'Please fill all the fields', 'error');
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if(data.err){
        showToast('Error', data.err, 'error');
        return;
      }
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      showToast('Success', data.message, 'success');
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='loginPage-container'>
      <h1 className='loginPage-heading'>LOGIN</h1>
      <form action='' className='login-form' onSubmit={submitForm}>
        <div className='div'>
          <label htmlFor='email' className='label'>
            Email
          </label>
          <Input
            type='email'
            name='email'
            id='email'
            value={email}
            placeholder='Enter email'
            onChange={(e) => setEmail(e.target.value)}
            backgroundColor={"gray.800"}
          >
          </Input>
        </div>

        <div className='div'>
          <label htmlFor='password' className='label'>
            Password
          </label>
          <Input
            type='password'
            name='password'
            id='password'
            value={password}
            placeholder='Enter password'
            onChange={(e) => setPassword(e.target.value)}
            backgroundColor={"gray.800"}
          >
          </Input>
        </div>

        <p><Link to='/forgetPassword' className='forget-pass'>Forget Password?</Link></p>

        <Button type='submit' color={"#00bb00"} backgroundColor={"gray.800"} _hover={{"backgroundColor":"black"}} isLoading={loading} onClick={submitForm} style={{ fontWeight: "bold" }}>
          LOGIN
        </Button>
        <Row className='py-3 px-3'>
          <Col style={{ backgroundColor: 'white' }}>
            New User ? <Link to='/signup'>Register Here</Link>
          </Col>
        </Row>
      </form>
    </div>
  )
};

