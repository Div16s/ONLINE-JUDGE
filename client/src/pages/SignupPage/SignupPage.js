import React, { useState } from 'react'
import { Button, Heading } from '@chakra-ui/react';
import './SignupPage.css';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../../atoms/userAtom';
import { useShowToast } from '../../hooks/useShowToast';
import {Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

export const SignupPage = () => {
  const setUser = useSetRecoilState(userAtom);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return showToast('Error', 'Passwords do not match', 'error');
    }
    if(loading) return;
    setLoading(true);
    try {
      //whenever we make an API request it takes json data, so we have to provide some headers
      const res = await fetch("http://localhost:8000/signup",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name, email, password})
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
    <div className='signupPage-container'>
      <Heading className='signupPage-heading'>Hi there, SIGNUP!</Heading>
      <form action="" className='signup-form' onSubmit={submitForm}>
        <div className='div'>
          <label htmlFor="name" className='label'>Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder='Enter your name'
            onChange={(e) => setName(e.target.value)}
            backgroundColor={"gray.800"}
          />
        </div>

        <div className='div'>
          <label htmlFor="email" className='label'>Email</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
            backgroundColor={"gray.800"}
          />
        </div>

        <div className='div'>
          <label htmlFor="password" className='label'>Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
            backgroundColor={"gray.800"}
          />
        </div>

        <div className='div password-input'>
          <label htmlFor="confirm-password" className='label'>Confirm Password</label>
          <Input
            type={'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder='Re-enter your password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            backgroundColor={"gray.800"}
          />
        </div>

        <Button color={"#00bb00"} backgroundColor={"gray.800"} _hover={{"backgroundColor":"black"}} type="submit" isLoading={loading} onClick={submitForm}>SIGN UP</Button>
        <Row className='py-3 px-3'>
          <Col style={{ backgroundColor: 'white' }}>
            Already a user ? <Link to='/login'>Login</Link>
          </Col>
        </Row>
      </form>
    </div>
  )
};
