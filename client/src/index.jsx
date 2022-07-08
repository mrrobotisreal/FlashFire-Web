import React from "react";
import ReactDOM from "react-dom";
import App2 from './components/App2.jsx';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab, faFacebook, faInstagram, faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { fas, faKey, faLock, faPaintBrush, faPaintbrush } from '@fortawesome/free-solid-svg-icons'
import './fontawesome.min.css';

library.add(fab, fas, faLock, faKey, faFacebook, faPaintBrush, faPaintbrush, faDiscord, faTwitter, faInstagram);


ReactDOM.render(<App2 />, document.getElementById('root'), (err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success!');
  }
});