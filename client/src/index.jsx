import React from "react";
import { render } from "react-dom";
import App2 from './components/App2.jsx';


render(<App2 />, document.getElementById('root'), (err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success!');
  }
});