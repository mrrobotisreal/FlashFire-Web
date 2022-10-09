import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function _SharingStats() {
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
};
