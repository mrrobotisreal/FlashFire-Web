import React from 'react';
import { useTimer } from 'react-timer-hook';
import styled from 'styled-components';

const Pause = styled.button`
  font-family: 'Luckiest Guy';
  color: white;
  background-color: black;
  border-radius: 12px;
  transition: .2s;
  width: fit-content;
  padding: 2%;
  margin: 4% 2% 2% 2%;
  &:hover {
    transform: scale(1.15);
    border: 2px ridge red;
    box-shadow: 6px 6px 9px red, 0 0 1em darkred, 0 0 0.2em darkred;
  }
`;

const Resume = styled.button`
  font-family: 'Luckiest Guy';
  color: white;
  background-color: black;
  border-radius: 12px;
  transition: .2s;
  width: fit-content;
  padding: 2%;
  margin: 4% 2% 2% 2%;
  &:hover {
    transform: scale(1.15);
    border: 2px ridge green;
    box-shadow: 6px 6px 9px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen;
  }
`;

const Restart = styled.button`
  font-family: 'Luckiest Guy';
  color: white;
  background-color: black;
  border-radius: 12px;
  transition: .2s;
  width: fit-content;
  padding: 2%;
  margin: 4% 2% 2% 2%;
  &:hover {
    transform: scale(1.15);
    border: 2px ridge purple;
    box-shadow: 6px 6px 9px violet, 0 0 1em rebeccapurple, 0 0 0.2em rebeccapurple;
  }
`;

const TimeSpan = styled.span`
  padding: 2%;
`;

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