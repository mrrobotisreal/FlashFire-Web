import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import Facebook from '../../fontawesome-free-5.15.4-web/svgs/brands/facebook.svg';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h4>Change Password?</h4>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fas', 'lock']} />
          <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fas', 'key']} />
        </div>
      </>
    );
  }
}

export default Account;