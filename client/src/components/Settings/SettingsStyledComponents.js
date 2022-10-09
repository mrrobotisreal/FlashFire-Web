import styled from 'styled-components';

export const SettingsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  padding: 4%;
  border: 4px ridge red;
  border-radius: 12px;
  width: 60%;
  /* overflow-y: scroll; */
`;
export const ButtonDiv = styled.div`
  border: 2px ridge red;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2%;
  width: 100%;
`;

export const SettingsButton = styled.button`
  border: 2px ridge rebeccapurple;
  border-radius: 12px;
  background-color: black;
  color: white;
  width: 40%;
  transition: .2s;
  margin-top: 4%;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
    color: violet;
    box-shadow: 4px 4px 6px violet, 0 0 1em rebeccapurple, 0 0 0.2em rebeccapurple;
  }
`;

export const MainMenuButton = styled.button`
  border: 2px ridge darkred;
  border-radius: 12px;
  background-color: black;
  color: white;
  width: fit-content;
  transition: .2s;
  margin-top: 4%;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
    color: red;
    box-shadow: 4px 4px 6px red, 0 0 1em orangered, 0 0 0.2em orangered;
  }
`;

export const BackButton = styled.button`
  border: 2px ridge rebeccapurple;
  border-radius: 12px;
  background-color: black;
  color: white;
  width: fit-content;
  transition: .2s;
  margin-top: 4%;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
    color: violet;
    box-shadow: 4px 4px 6px violet, 0 0 1em rebeccapurple, 0 0 0.2em rebeccapurple;
  }
`;