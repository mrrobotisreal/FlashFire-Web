import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MainMenu from '../_MainMenu/_MainMenu.jsx';
import {
  Title,
  LoginSignupDiv,
  LoginSignupTitle,
  LoginSignupForm,
  SignupDiv,
  LoginDiv,
  LoginSignupSubmit,
  AlreadyAMemberButton,
  InputLabel,
  Input
} from './_AppStyledComponents.js';
import { _AppContextProvider, _AppContext } from './_AppContext.js';

export default function _App() {
  const {
    isAlreadyAMember,
    setIsAlreadyAMember,
    _showLoginForm,
    _setShowLoginForm,
    signupName,
    setSignupName,
    signupEmail,
    setSignupEmail,
    username,
    setUsername,
    password,
    setPassword,
    showMainMenu,
    setShowMainMenu,
    checkCookie,
    createCookie,
    handleSignupSubmit,
    handleLoginSubmit,
    showLoginForm,
    showSignupForm,
    handleNameInput,
    handleEmailInput,
    handleUsernameInput,
    handlePasswordInput,
    logout
  } = useContext(_AppContext);

  return (
    <_AppContextProvider>
      {
        !showMainMenu
        ?
        (
          <>
            <Title>🔥Flash Fire🔥</Title>
            <LoginSignupDiv>
              <LoginSignupTitle><b><u>{!isAlreadyAMember ? 'Sign Up' : 'Log In'}</u></b></LoginSignupTitle>
              {
                !isAlreadyAMember
                ?
                (
                  <LoginSignupForm onSubmit={handleSignupSubmit}>
                    <InputLabel style={{gridColumn: '1', gridRow: '1', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                    <b>Name:</b>
                    </InputLabel>
                    <input style={{gridColumn: '1', gridRow: '2', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} type="text" onChange={handleNameInput} />
                    <InputLabel style={{gridColumn: '1', gridRow: '3', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                    <b>Email:</b>
                    </InputLabel>
                    <input style={{gridColumn: '1', gridRow: '4', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} type="text" onChange={handleEmailInput} />
                    <InputLabel style={{gridColumn: '1', gridRow: '5', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                    <b>Username:</b>
                    </InputLabel>
                    <input style={{gridColumn: '1', gridRow: '6', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} type="text" onChange={handleUsernameInput} />
                    <InputLabel style={{gridColumn: '1', gridRow: '7', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                      <b>Password:</b>
                    </InputLabel>
                    <input type="password" style={{gridColumn: '1', gridRow: '8', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} onChange={handlePasswordInput} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <LoginSignupSubmit type="submit" onClick={handleSignupSubmit}>
                      <b>Submit</b>
                      </LoginSignupSubmit>
                      <AlreadyAMemberButton style={{gridColumn: '2', gridRow: '1', color: 'blue', textAlign: 'right'}} onClick={showLoginForm}>
                        <b><u>Already a member?</u></b>
                      </AlreadyAMemberButton>
                    </div>
                  </LoginSignupForm>
                )
                :
                (
                  <LoginSignupForm onSubmit={handleLoginSubmit}>
                    <div class="fb-login-button" data-width="" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="true"></div>
                    <InputLabel style={{gridRow: '1'}}>
                      <b>Username:</b>
                    </InputLabel>
                    <Input type="text" style={{gridRow: '2'}} onChange={handleUsernameInput} />
                    <InputLabel style={{gridRow: '3'}}>
                      <b>Password:</b>
                    </InputLabel>
                    <Input type="password" style={{gridRow: '4'}} onChange={handlePasswordInput} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <LoginSignupSubmit type="submit" onClick={handleLoginSubmit}>
                        <b>Submit</b>
                      </LoginSignupSubmit>
                      <AlreadyAMemberButton style={{gridColumn: '2', gridRow: '1', color: 'blue', textAlign: 'right'}} onClick={showSignupForm}>
                        <b><u>Want to register?</u></b>
                      </AlreadyAMemberButton>
                    </div>
                  </LoginSignupForm>
                )
                }
            </LoginSignupDiv>
          </>
        )
        :
        (
          <MainMenu logout={logout} user={username} />
        )
      }
  </_AppContextProvider>
  );
};
