import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainMenu from './MainMenu2.jsx';

const Title = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  font-family: 'Luckiest Guy', cursive;
  text-shadow: 6px 6px 8px red, 0 0 1em orange, 0 0 0.2em orange;
`;

const LoginSignupDiv = styled.div`
  text-align: center;
  top: 0;
  left: 0;
  position: relative;
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
  font-family: 'Bangers', cursive;
`;

const LoginSignupForm = styled.form`
  display: grid;
  grid-column: 1;
  grid-row: 2;
`;

const SignupDiv = styled.div``;

const LoginDiv = styled.div``;

const LoginSignupSubmit = styled.button`
  grid-column: 1;
  grid-row: 1;
  width: 25%;
  border-radius: 12px;
  transition: .2s;
  background-color: black;
  color: white;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
  }
`;

const AlreadyAMemberButton = styled.button`
  transition: .2s;
  color: blue;
  background-color: black;
  width: fit-content;
  padding: 1%;
  border-radius: 12px;
  font-family: 'Bangers', cursive;
  &:hover {
    /* font-size: 1.25rem; */
    transform: scale(1.15);
  }
`;

const InputLabel = styled.label`
  grid-column: 1;
  text-align: left;
  color: white;
  background-color: black;
  width: fit-content;
  padding: 1%;
  border-radius: 12px;
  font-family: 'Shadows Into Light', cursive;
`;

const Input = styled.input`
  grid-column: 1;
  margin-bottom: 3%;
  text-align: left;
  background-color: black;
  color: white;
`;

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
      let options = {
        cookie: cookie,
        username: this.state.username,
        email: this.state.email,
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
    this.createJWT()
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