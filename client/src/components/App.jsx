import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainMenu from './MainMenu2.jsx';
// import flameBackground from './assets/flames-small.gif';
// import db from '../../../server/db.js';

const Title = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  font-family: 'Bangers', cursive;
`;

const LoginSignupDiv = styled.div`
  text-align: center;
  top: 0;
  left: 0;
  position: relative;
  /* background-image: linear-gradient(to bottom, black, orangered, yellow); */
  background-image: url('https://acegif.com/wp-content/gifs/fire-15.gif');
  background-size: cover;
  padding: 3%;
  margin-top: 10%;
  border: 4px ridge darkred;
  border-radius: 12px;
  color: white;
`;

const LoginSignupTitle = styled.h2`
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 3%;
`;

const LoginSignupForm = styled.form`
  display: grid;
  grid-column: 1;
  grid-row: 2;
`;

const SignupDiv = styled.div``;

// const SignupForm = styled.form``;

const LoginDiv = styled.div``;

// const LoginForm = styled.div``;

const LoginSignupSubmit = styled.button`
  grid-column: 1;
  grid-row: 1;
  width: 25%;
  border-radius: 12px;
  transition: .2s;
  &:hover {
    transform: scale(1.15);
  }
`;

const AlreadyAMemberSpan = styled.span`
  transition: .2s;
  color: blue;
  background-color: black;
  width: fit-content;
  padding: 1%;
  border-radius: 12px;
  &:hover {
    font-size: 1.25rem;
  }
`;

const App = () => {
  const [ isAlreadyAMember, setIsAlreadyAMember ] = useState(false);
  const [ showLoginSignupDiv, setShowLoginSignupDiv ] = useState(true);
  const [ signupName, setSignupName ] = useState('');
  const [ signupEmail, setSignupEmail ] = useState('');
  const [ signupUsername, setSignupUsername ] = useState('');
  const [ signupPassword, setSignupPassword ] = useState('');
  const [ showMainMenu, setShowMainMenu ] = useState(false);
  let loginSignupDisplay = 'grid';

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    axios.post('/signup', {
      name: signupName,
      email: signupEmail,
      username: signupUsername,
      password: signupPassword
    })
      .then((res) => {
        console.log('successful signup!');
        setShowLoginSignupDiv(false);
        // setShowMainMenu(true);
      })
      .catch((err) => console.error(err));
  };

  const handleNameInput = (e) => {
    setSignupName(e.target.value);
  };

  const handleEmailInput = (e) => {
    setSignupEmail(e.target.value);
  };

  const handleUsernameInput = (e) => {
    setSignupUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setSignupPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    // ...
  };

  const showLoginForm = (e) => {
    e.preventDefault();
    setIsAlreadyAMember(true);
  };

  useEffect(() => {
    //
  }, [showLoginSignupDiv, isAlreadyAMember]);

  return (
    <>
      {
        showLoginSignupDiv
        ?
        (
          <>
            <Title>🔥Welcome to Flash Fire!🔥</Title>
            <LoginSignupDiv>
              <LoginSignupTitle><b><u>{!isAlreadyAMember ? 'Sign Up' : 'Log In'}</u></b></LoginSignupTitle>
              {
                !isAlreadyAMember
                ?
                (
                  <LoginSignupForm onSubmit={handleSignupSubmit}>
                    <label style={{gridColumn: '1', gridRow: '1', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                      Name:
                    </label>
                    <input style={{gridColumn: '1', gridRow: '2', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} type="text" onChange={handleNameInput} />
                    <label style={{gridColumn: '1', gridRow: '3', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                      Email:
                    </label>
                    <input style={{gridColumn: '1', gridRow: '4', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} type="text" onChange={handleEmailInput} />
                    <label style={{gridColumn: '1', gridRow: '5', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                      Username:
                    </label>
                    <input style={{gridColumn: '1', gridRow: '6', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} type="text" onChange={handleUsernameInput} />
                    <label style={{gridColumn: '1', gridRow: '7', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                      Password:
                    </label>
                    <input style={{gridColumn: '1', gridRow: '8', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} type="text" onChange={handlePasswordInput} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <LoginSignupSubmit type="submit" onClick={handleSignupSubmit}>
                        Submit
                      </LoginSignupSubmit>
                      <AlreadyAMemberSpan style={{gridColumn: '2', gridRow: '1', color: 'blue', textAlign: 'right'}} onClick={showLoginForm}>
                        <b><u>Already a member?</u></b>
                      </AlreadyAMemberSpan>
                    </div>
                  </LoginSignupForm>
                )
                :
                (
                  null
                )
                }
            </LoginSignupDiv>
          </>
        )
        :
        (
          // null
          <MainMenu user={signupUsername} />
        )
      }
    </>
  )
}

export default App;