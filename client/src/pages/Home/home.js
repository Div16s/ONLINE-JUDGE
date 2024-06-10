import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from '../../atoms/userAtom';
import { problemStatusAtom } from '../../atoms/problemStatusAtom';
import { useShowToast } from '../../hooks/useShowToast';
import './home.css';

export const Home = () => {
  const user = useRecoilValue(userAtom);
  return (
    <div className='home-container'>
      <div className='centered-text'>
        <div className='home-page-text'>
          <h1 style={{fontFamily:'Montserrat'}}>Welcome back {user.name} ...</h1>
          <h1>"Unleash Your Code Wizardry in the CodeSphere"</h1>
          <h2>"Where Ideas Become Functional Art"</h2>
        </div>
      </div>
    </div>
  )
}
