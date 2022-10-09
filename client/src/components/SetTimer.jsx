import React, { useState } from 'react';
import Timer from './Timer.jsx';
import { Start } from './SetTimer/SetTimerStyledComponents.js';

export default function SetTimer({ expire }) {
  // default timer is set to 5
  const [time, setTime] = useState(new Date());
  const [showConutdown, setShowCountdown] = useState(false);
  return (
    <div className="PromptTimer"
      style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      {showConutdown
        ? <Timer expiryTimestamp={time} setShowCountdown={setShowCountdown} expire={expire} />
        : (
          <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <label style={{fontFamily: 'Luckiest Guy', color: 'white', padding: '2%'}}
              htmlFor="settingTimer"
            >
              Set timer
              <input
                style={{fontFamily: 'Luckiest Guy', color: 'white', backgroundColor: 'black', marginLeft: '2%', textAlign: 'center'}}
                type="number"
                onChange={(event) => {
                  const min = Number(event.target.value);
                  const newTime = new Date();
                  newTime.setSeconds(newTime.getSeconds() + min * 60);
                  setTime(newTime);
                }}
              />
            </label>
            <Start
              type="button"
              onClick={() => setShowCountdown(true)}
            > start </Start>
          </div>
        )}
    </div>
  );
}