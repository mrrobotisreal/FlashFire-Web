import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SharingStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h4>Connect To Facebook? Twitter? Instagram? Discord?</h4>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fab', 'facebook']} />
          <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fab', 'twitter']} />
          <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fab', 'instagram']} />
          <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fab', 'discord']} />
        </div>
      </>
    );
  }
}

export default SharingStats;