import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #b0c4de;
  padding: 50px;
  z-index: 1000;
  opacity: 1;
  width: 35%;
  height: 80%;
  border-radius: 12px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.75;
  z-index: 800;
`;

const Button = styled.button`
  position: fixed;
  top: 5%;
  right: 5%;
  background-color: white;
  font-size: 20px;
  border: 2px ridge grey;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
  transition: .2s;
  &:hover {
    transform: scale(1.15);
  }
`;

const ChooseDiv = styled.div`
  border: 2px ridge darkred;
  border-radius: 12px;
  background-color: black;
  color: white;
  font-family: 'Luckiest Guy';
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ChooseFlash = styled.button`
  background-color: black;
  color: white;
  font-family: 'Bangers', cursive;
  border-radius: 12px;
  margin-bottom: 2%;
  padding: 2%;
  transition: .2s;
  &:hover {
    transform: scale(1.15);
    border: 2px ridge green;
    box-shadow: 4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen;
  }
`;

const ChooseEdit = styled.button`
  background-color: black;
  color: white;
  font-family: 'Bangers', cursive;
  border-radius: 12px;
  margin-bottom: 2%;
  padding: 2%;
  transition: .2s;
  &:hover {
    transform: scale(1.15);
    border: 2px ridge orangered;
    box-shadow: 4px 4px 6px orange, 0 0 1em orangered, 0 0 0.2em orangered;
  }
`;

class ChooseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Overlay onClick={() => this.props.onClose()}>
        </Overlay>
        <ModalStyle>
          <Button onClick={() => this.props.onClose()}>
            X
          </Button>
          <ChooseDiv>
            <ChooseFlash onClick={this.props.start()}>
              Start Session
            </ChooseFlash>
            <ChooseEdit onClick={this.props.edit()}>
              Edit Cards
            </ChooseEdit>
          </ChooseDiv>
        </ModalStyle>
      </>
    )
  }
}

export default ChooseModal;