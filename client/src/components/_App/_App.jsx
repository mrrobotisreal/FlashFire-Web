import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import MainMenu from './MainMenu2.jsx';
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
} from './App2/App2StyledComponents.js';
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
        !this.state.showMainMenu
        ?
        (
          <>
            <Title>🔥Flash Fire🔥</Title>
            <LoginSignupDiv>
              <LoginSignupTitle><b><u>{!this.state.isAlreadyAMember ? 'Sign Up' : 'Log In'}</u></b></LoginSignupTitle>
              {
                !this.state.isAlreadyAMember
                ?
                (
                  <LoginSignupForm onSubmit={this.handleSignupSubmit}>
                    <InputLabel style={{gridColumn: '1', gridRow: '1', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                    <b>Name:</b>
                    </InputLabel>
                    <input style={{gridColumn: '1', gridRow: '2', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} type="text" onChange={this.handleNameInput} />
                    <InputLabel style={{gridColumn: '1', gridRow: '3', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                    <b>Email:</b>
                    </InputLabel>
                    <input style={{gridColumn: '1', gridRow: '4', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} type="text" onChange={this.handleEmailInput} />
                    <InputLabel style={{gridColumn: '1', gridRow: '5', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                    <b>Username:</b>
                    </InputLabel>
                    <input style={{gridColumn: '1', gridRow: '6', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} type="text" onChange={this.handleUsernameInput} />
                    <InputLabel style={{gridColumn: '1', gridRow: '7', textAlign: 'left', backgroundColor: 'black', color: 'white', width: 'fit-content', padding: '1%', borderRadius: '12px'}}>
                      <b>Password:</b>
                    </InputLabel>
                    <input type="password" style={{gridColumn: '1', gridRow: '8', marginBottom: '3%', textAlign: 'left', backgroundColor: 'black', color: 'white'}} onChange={this.handlePasswordInput} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <LoginSignupSubmit type="submit" onClick={this.handleSignupSubmit}>
                      <b>Submit</b>
                      </LoginSignupSubmit>
                      <AlreadyAMemberButton style={{gridColumn: '2', gridRow: '1', color: 'blue', textAlign: 'right'}} onClick={this.showLoginForm}>
                        <b><u>Already a member?</u></b>
                      </AlreadyAMemberButton>
                    </div>
                  </LoginSignupForm>
                )
                :
                (
                  <LoginSignupForm onSubmit={this.handleLoginSubmit}>
                    <div class="fb-login-button" data-width="" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="true" data-use-continue-as="true"></div>
                    <InputLabel style={{gridRow: '1'}}>
                      <b>Username:</b>
                    </InputLabel>
                    <Input type="text" style={{gridRow: '2'}} onChange={this.handleUsernameInput} />
                    <InputLabel style={{gridRow: '3'}}>
                      <b>Password:</b>
                    </InputLabel>
                    <Input type="password" style={{gridRow: '4'}} onChange={this.handlePasswordInput} />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <LoginSignupSubmit type="submit" onClick={this.handleLoginSubmit}>
                        <b>Submit</b>
                      </LoginSignupSubmit>
                      <AlreadyAMemberButton style={{gridColumn: '2', gridRow: '1', color: 'blue', textAlign: 'right'}} onClick={this.showSignupForm}>
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
          <MainMenu logout={this.logout} user={this.state.username} />
        )
      }
  </_AppContextProvider>
  );
};
