import React from 'react'
import logo from './csfn-bg.png';
import bg from './bg-image.jpg';
import './landingPage.css';
import { Button } from '@chakra-ui/react';

export const landingPage = () => {
    return (
        <div className="landingPage landingPage-bg">
            <div class="flex lp-container items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <div class="max-w-4xl mx-auto px-8 py-16 text-white">
                    <div class="justify-center">
                        <div class="justify-center">
                            <img src={logo} alt="Your Image" class="landingPage-logo max-w-full max-h-full" />
                        </div>
                    </div>
                    <h1 class="landingPage-heading flex text-center">Welcome to CodeSphere</h1>
                    <h2 class="landingPage-h2 text-center">Online Judge</h2>
                    <div class="landingPage-registration flex">
                        {/* <a href="/login" class="inline-block bg-indigo-500 text-white rounded-lg px-8 py-4 text-lg font-medium transition duration-300 hover:bg-indigo-700 mr-4" style={{padding: "10px"}}>Login</a>
                        <a href="/signup" class="inline-block bg-gray-700 text-white rounded-lg px-8 py-4 text-lg font-medium transition duration-300 hover:bg-gray-900">Signup</a> */}
                        {/* <button type="submit" href="/login" class="login-button"><a className='login' href='/login'>Login</a></button>
                        <button type="submit" href="/signup" class="signup-button">Signup</button> */}

                        {/* <button type="button" className="btn btn-primary btn-lg login-button">Login</button> */}
                        <a href="/login" className="btn btn-primary loginButton">Login</a>
                        {/* <button type="button" className="btn btn-secondary btn-lg signup-button">Signup</button> */}
                        <a href="/signup" className="btn btn-secondary signupButton">Signup</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
