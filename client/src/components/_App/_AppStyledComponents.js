import styled from 'styled-components';

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  font-family: 'Luckiest Guy', cursive;
  text-shadow: 6px 6px 8px red, 0 0 1em orange, 0 0 0.2em orange;
`;

export const LoginSignupDiv = styled.div`
  text-align: center;
  top: 0;
  left: 0;
  position: relative;
  background-image: url('https://acegif.com/wp-content/gifs/fire-15.gif');
  background-size: cover;
  padding: 3%;
  margin-top: 10%;
  border: 4px ridge darkred;
  border-radius: 12px;
  color: white;
`;

export const LoginSignupTitle = styled.h2`
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 3%;
  font-family: 'Bangers', cursive;
`;

export const LoginSignupForm = styled.form`
  display: grid;
  grid-column: 1;
  grid-row: 2;
`;

export const SignupDiv = styled.div``;

export const LoginDiv = styled.div``;

export const LoginSignupSubmit = styled.button`
  grid-column: 1;
  grid-row: 1;
  width: 25%;
  border-radius: 12px;
  transition: .2s;
  background-color: black;
  color: white;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
  }
`;

export const AlreadyAMemberButton = styled.button`
  transition: .2s;
  color: blue;
  background-color: black;
  width: fit-content;
  padding: 1%;
  border-radius: 12px;
  font-family: 'Bangers', cursive;
  &:hover {
    /* font-size: 1.25rem; */
    transform: scale(1.15);
  }
`;

export const InputLabel = styled.label`
  grid-column: 1;
  text-align: left;
  color: white;
  background-color: black;
  width: fit-content;
  padding: 1%;
  border-radius: 12px;
  font-family: 'Shadows Into Light', cursive;
`;

export const Input = styled.input`
  grid-column: 1;
  margin-bottom: 3%;
  text-align: left;
  background-color: black;
  color: white;
`;