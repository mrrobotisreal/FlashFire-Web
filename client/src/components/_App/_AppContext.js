import React, { useState, createContext } from 'react';
import axios from 'axios';

export const _AppContext = useContext(null);

export function _AppContextProvider({ children }) {
  const [isAlreadyAMember, setIsAlreadyAMember] = useState(false);
  const [_showLoginForm, _setShowLoginForm] = useState(true);
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showMainMenu, setShowMainMenu] = useState(false);

  const checkCookie = () => {
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
          username: username,
          email: signupEmail,
          jwt: null,
        }
        axios.post(`/check-cookie/${user}`, options)
          .then(({ data }) => {
            if (data.cookie === cookie) {
              setUsername(prevState => user);
              setShowMainMenu(prevState => true);
            }
          })
          .catch((err) => console.error(err));
      } else {
        console.log('yes jwt');
        let options = {
          cookie: cookie,
          username: username,
          email: signupEmail,
          jwt: jwt,
        }
        axios.post(`/check-cookie/${user}`, options)
          .then(({ data }) => {
            if (data.cookie === cookie) {
              setUsername(prevState => user);
              setShowMainMenu(prevState => true);
            }
          })
          .catch((err) => console.error(err));
      }
    }
  };

  const createCookie = (str) => {
    localStorage.setItem('flash-cookie', str);
    localStorage.setItem('flash-user', username);
  };

  const createJWT = () => {
    let options = {
      email: signupEmail,
    };
    axios.post(`/create-jwt/${username}`, options)
      .then(({ data }) => {
        console.log('data -> ', data);
        localStorage.setItem(`ffj-${username}`, data);
      })
      .catch((err) => console.error(err));
  };

  const checkJWT = () => {
    let jwt = localStorage.getItem(`ffj-${username}`);
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
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // this.createJWT()
    axios.post('/signup', {
      name: signupName,
      email: signupEmail,
      username: username,
      password: password
    })
      .then(({ data }) => {
        console.log('data -> ', data);
        setShowMainMenu(prevState => true);
        createCookie(data.cookie);
        console.log('data -> ', data);
        localStorage.setItem(`ffj-${username}`, data);
      })
      .catch((err) => console.error(err));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let userInfo = {
      username: username,
      password: password
    };
    axios.post(`/login`, userInfo)
      .then(({ data }) => {
        if (!data) {
          alert('Wrong username or password! Please try again')
          // this will need to be removed below
          setShowMainMenu(prevState => true);
        } else {
          setShowMainMenu(prevState => true);
          createCookie(data.cookie);
        }
      })
      .catch((err) => console.error(err));
  };

  const showLoginForm = (e) => {
    e.preventDefault();
    setIsAlreadyAMember(prevState => true);
  };

  const showSignupForm = (e) => {
    e.preventDefault();
    setIsAlreadyAMember(prevState => false);
  };

  const handleNameInput = (e) => {
    setSignupName(prevState => e.target.value);
  };

  const handleEmailInput = (e) => {
    setSignupEmail(prevState => e.target.value);
  };

  const handleUsernameInput = (e) => {
    setUsername(prevState => e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(prevState => e.target.value);
  };

  const logout = () => {
    setIsAlreadyAMember(prevState => true);
    setShowMainMenu(prevState => false);
    localStorage.removeItem('flash-cookie');
    localStorage.removeItem('flash-user');
  };

  const value = {
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
  };

  return (
    <_AppContext.Provider value={value}>
      {children}
    </_AppContext.Provider>
  );
};
