import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function _Account() {
  return (
    <>
      <h4>Change Password?</h4>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fas', 'lock']} />
        <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fas', 'key']} />
      </div>
    </>
  );
};