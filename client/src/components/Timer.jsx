import React from 'react';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components';
import {
  Pause,
  Resume,
  Restart,
  TimeSpan
} from './Timer/TimerStyledComponents.js';

const Timer = ({ expiryTimestamp, setShowCountdown, expire }) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => {
    console.warn('onExpire called')
    setShowCountdown(true);
    expire();
  }});

  return (
    <div style={{display: 'grid', padding: '2%'}}>
      <div style={{fontFamily: 'Luckiest Guy', color: 'white', backgroundColor: 'black', borderRadius: '4px', gridColumn: '1', gridRow: '1', border: '2px ridge violet'}}>
        <TimeSpan>{hours}</TimeSpan>
        :
        <TimeSpan>{minutes}</TimeSpan>
        :
        <TimeSpan>{seconds}</TimeSpan>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gridColumn: '1', gridRow: '2'}}>
        <Pause type="button" onClick={pause}>Pause</Pause>
        <Resume type="button" onClick={resume}>Resume</Resume>
        <Restart
          type="button"
          onClick={() => {
            setShowCountdown(false);
          }}
        >
          Restart
        </Restart>
      </div>
    </div>
  )
};

export default Timer;