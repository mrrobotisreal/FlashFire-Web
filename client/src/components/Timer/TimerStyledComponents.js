import styled from 'styled-components';

export const Pause = styled.button`
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

export const Resume = styled.button`
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

export const Restart = styled.button`
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

export const TimeSpan = styled.span`
  padding: 2%;
`;