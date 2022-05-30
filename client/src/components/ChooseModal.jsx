import React, { Component } from 'react';
import styled from 'styled-components';

const ChooseDiv = styled.div`
  background-image: linear-gradient(to bottom, black, orangered, yellow);
  color: white;
  font-family: 'Luckiest Guy';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModesDiv = styled.div`
  width: 60%;
  border: 2px ridge darkred;
  border-radius: 12px;
  background-color: black;
`;

const ChooseTitle = styled.h1`
  margin-top: 5%;
  text-shadow: 6px 6px 8px red, 0 0 1em orange, 0 0 0.2em orange;
`;

const ModeTitles = styled.h3`
  margin-top: 5%;
  text-shadow: 6px 6px 8px red, 0 0 1em orange, 0 0 0.2em orange;
`;

const StartButtons = styled.buttons`
  font-family: 'Luckiest Guy';
  color: white;
  background-color: black;
  border-radius: 12px;
  transition: .2s;
  width: fit-content;
  padding: 1%;
  &:hover {
    transform: scale(1.15);
    border: 2px ridge purple;
    box-shadow: 6px 6px 9px violet, 0 0 1em rebeccapurple, 0 0 0.2em rebeccapurple;
  }
`;

const ChoiceDivs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class ChooseModal extends Component {
  constructor(prop) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <ChooseDiv>
        <ChooseTitle><u><b>Choose A Mode:</b></u></ChooseTitle>
        <ModesDiv style={{backgroundColor: 'black', border: '2px ridge darkred', borderRadius: '12px', width: '60%'}}>
          <ChoiceDivs style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ModeTitles><b>Study Mode:</b></ModeTitles>
            <StartButtons>Start</StartButtons>
          </ChoiceDivs>
          <ChoiceDivs style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ModeTitles><b>Test Mode:</b></ModeTitles>
            <h4>Easy:</h4>
            <StartButtons>Start</StartButtons>
            <h4>Difficult:</h4>
            <StartButtons>Start</StartButtons>
          </ChoiceDivs>
          <ChoiceDivs style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <ModeTitles><b>Edit Mode:</b></ModeTitles>
            <StartButtons>Start</StartButtons>
          </ChoiceDivs>
        </ModesDiv>
      </ChooseDiv>
    )
  }
}

export default ChooseModal;