import React, { useState, useEffect } from 'react';
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
// import App2Context from './App2/App2Context.js';

class App2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlreadyAMember: false,
      showLoginForm: true,
      signupName: '',
      signupEmail: '',
      username: '',
      password: '',
      showMainMenu: false
    }
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.showLoginForm = this.showLoginForm.bind(this);
    this.showSignupForm = this.showSignupForm.bind(this);
    this.logout = this.logout.bind(this);
    this.createCookie = this.createCookie.bind(this);
    this.checkCookie = this.checkCookie.bind(this);
    this.createJWT = this.createJWT.bind(this);
    this.checkJWT = this.checkJWT.bind(this);
  }

  componentDidMount() {
    this.checkCookie();
    this.checkJWT();
  }

  checkCookie() {
    let user = localStorage.getItem('flash-user');
    let cookie = localStorage.getItem('flash-cookie');
    if (!cookie || !user) {
      return;
    } else {
      let jwt = localStorage.getItem(`ffj-${user}`);
      console.log(`ffj-${user}`);
      if (!jwt) {
        console.log('not jwt');
        let options = {
          cookie: cookie,
          username: this.state.username,
          email: this.state.email,
          jwt: null,
        }
        axios.post(`/check-cookie/${user}`, options)
          .then(({ data }) => {
            if (data.cookie === cookie) {
              this.setState({
                username: user,
                showMainMenu: true,
              });
            }
          })
          .catch((err) => console.error(err));
      } else {
        console.log('yes jwt');
        let options = {
          cookie: cookie,
          username: this.state.username,
          email: this.state.email,
          jwt: jwt,
        }
        axios.post(`/check-cookie/${user}`, options)
          .then(({ data }) => {
            if (data.cookie === cookie) {
              this.setState({
                username: user,
                showMainMenu: true,
              });
            }
          })
          .catch((err) => console.error(err));
      }
    }
  }

  createCookie(str) {
    localStorage.setItem('flash-cookie', str);
    localStorage.setItem('flash-user', this.state.username);
  }

  createJWT() {
    let options = {
      email: this.state.email,
    };
    axios.post(`/create-jwt/${this.state.username}`, options)
      .then(({ data }) => {
        console.log('data -> ', data);
        localStorage.setItem(`ffj-${this.state.username}`, data);
      })
      .catch((err) => console.error(err));
  }

  checkJWT() {
    let jwt = localStorage.getItem(`ffj-${this.state.username}`);
    if (jwt) {
      console.log('jwt be like -> ', jwt);
      // verify jwt with server
      // if verified
        // log in to main menu
      // else
        // return
    } else {
      return;
    }
  }

  handleSignupSubmit(e) {
    e.preventDefault();
    // this.createJWT()
    axios.post('/signup', {
      name: this.state.signupName,
      email: this.state.signupEmail,
      username: this.state.username,
      password: this.state.password
    })
      .then(({ data }) => {
        console.log('data -> ', data);
        this.setState({
          showMainMenu: true,
        });
        this.createCookie(data.cookie);
        console.log('data -> ', data);
        localStorage.setItem(`ffj-${this.state.username}`, data);
      })
      .catch((err) => console.error(err));
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    let userInfo = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post(`/login`, userInfo)
      .then(({ data }) => {
        if (!data) {
          alert('Wrong username or password! Please try again')
          // this will need to be removed below
          this.setState({
            showMainMenu: true,
          });
        } else {
          this.setState({
            showMainMenu: true,
          });
          this.createCookie(data.cookie);
        }
      })
      .catch((err) => console.error(err));
  }

  showLoginForm(e) {
    e.preventDefault();
    this.setState({
      isAlreadyAMember: true,
    });
  }

  showSignupForm(e) {
    this.setState({
      isAlreadyAMember: false,
    });
  }

  handleNameInput(e) {
    this.setState({
      signupName: e.target.value,
    });
  }

  handleEmailInput(e) {
    this.setState({
      signupEmail: e.target.value,
    });
  }

  handleUsernameInput(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordInput(e) {
    this.setState({
      password: e.target.value,
    });
  }

  logout() {
    this.setState({
      isAlreadyAMember: true,
      showMainMenu: false,
    });
    localStorage.removeItem('flash-cookie');
    localStorage.removeItem('flash-user');
  }

  render() {
    return (
      <>
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
    </>
    )
  }
};

export default App2;