import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Themes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <h4>Change Theme?</h4>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fas', 'paintbrush']} />
          <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fas', 'palette']} />
        </div>
      </>
    );
  }
}

export default Themes;