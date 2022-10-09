import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function _Themes() {
  return (
    <>
      <h4>Change Theme?</h4>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fas', 'paintbrush']} />
        <FontAwesomeIcon style={{width: '128', height: '128'}} icon={['fas', 'palette']} />
      </div>
    </>
  );
};