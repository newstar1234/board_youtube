import React, { useState } from 'react';
import './style.css';

export default function Authentication() {

  // state : 화면 상태 //
  //description : 리터럴 상태값 지정, sign-in | sign-up 두가지만 올수있음 //
  const [view, setView] = useState<'sign-in'|'sign-up'>('sign-in');

  // component : sign in card 컴포넌트 //
  const SignInCard = () => {

    // render //
    return (
      <div className='auth-card'></div>
    );
  };

  // component : sign up card 컴포넌트 //
  const SignUpCard = () => {
    
    // render //
    return (
      <div className='auth-card'></div>
    );
  };

  // render //
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다.'}</div>
              <div className='auth-jumbotron-text'>{'STARs BOARD 입니다.'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard/>}
        {view === 'sign-up' && <SignUpCard/>}
      </div>
    </div>
  )
}
