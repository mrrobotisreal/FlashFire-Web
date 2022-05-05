import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CollectionDiv = styled.div`
  text-align: center;
  top: 0;
  left: 0;
  position: relative;
  /* background-image: linear-gradient(to bottom, black, orangered, yellow); */
  background-image: url('https://acegif.com/wp-content/gifs/fire-15.gif');
  background-size: cover;
  padding: 3%;
  margin-top: 10%;
  border: 4px ridge darkred;
  border-radius: 12px;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* display: grid; */
`;

const PrevButton = styled.button`
  background-color: black;
  border: 2px ridge darkred;
  border-radius: 12px;
  color: white;
  grid-column: 1;
  font-size: 2rem;
  transition: .2s;
  padding-left: 2%;
  padding-right: 2%;
  &:hover {
    transform: scale(1.25);
  }
`;

const NextButton = styled.button`
  background-color: black;
  border: 2px ridge darkred;
  border-radius: 12px;
  color: white;
  grid-column: 3;
  font-size: 2rem;
  transition: .2s;
  padding-left: 2%;
  padding-right: 2%;
  &:hover {
    transform: scale(1.25);
  }
`;

const PrevNextDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: 'Bangers', cursive;
  margin-top: 4%;
`;

const CollectionNameTitle = styled.h2`
  margin-bottom: 3%;
  text-align: center;
  font-family: 'Luckiest Guy', cursive;
  color: white;
  text-shadow: 1px 1px 2px red, 0 0 1em orange, 0 0 0.2em orange;
`;

const CardNumber = styled.h3`
  grid-column: 2;
  grid-row: 2;
  margin-bottom: 3%;
  text-align: center;
  font-family: 'Luckiest Guy', cursive;
`;

const FlashCardDiv = styled.div`
  border: 2px ridge darkred;
  border-radius: 12px;
  background-color: black;
  color: white;
  padding: 2%;
`;

const QuestionAndAnswerDiv = styled.div`
  border: 2px ridge orangered;
  border-radius: 12px;
  background-image: linear-gradient(to bottom, black, darkred);
  color: white;
  font-family: 'Bangers', cursive;
  padding: 2%;
  overflow: break-word;
  margin-bottom: 2%;
`;

const RevealButton = styled.button`
  background-color: black;
  color: white;
  font-family: 'Bangers', cursive;
  border-radius: 12px;
  margin-bottom: 2%;
`;

const FailSuccessDiv = styled.div`
  display: grid;
  margin: 2%;
`;

const FailSuccessIndividualDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const FailSuccessButton = styled.button`
  border: 2px ridge darkred;
  border-radius: 12px;
  box-shadow: 4px 4px 6px red, 0 0 1em orange, 0 0 0.2em orange;
  width: fit-content;
  padding: 2%;
  display: flex;
  justify-content: center;
  margin-bottom: 3%;
`;

const FailSuccessCount = styled.span`
  color: yellow;
  background-color: black;
  border-radius: 12px;
  font-family: 'Bangers', cursive;
  width: fit-content;
  padding: 2%;
  display: flex;
  justify-content: center;
`;

const MainMenuButton = styled.button`
  border-radius: 12px;
  background-color: black;
  color: white;
  font-family: 'Bangers', cursive;
  width: fit-content;
  padding: 2%;
  margin-top: 2%;
`;

class FlashCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: this.props.cardList,
      collectionName: this.props.collectionName,
      totalCards: this.props.cardList.length,
      currentCard: 0,
      success: 0,
      fail: 0,
    };
    this.nextCard = this.nextCard.bind(this);
    this.prevCard = this.prevCard.bind(this);
    this.reveal = this.reveal.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentDidMount() {

  }

  nextCard() {}

  prevCard() {}

  reveal() {}

  handleFail() {}

  handleSuccess() {}

  render() {
    return (
      <>
        <CollectionNameTitle>
          {
            this.state.collectionName
            // 'Hello!'
          }
        </CollectionNameTitle>
        <CollectionDiv>
          <CardNumber>
            {
              `Card ${this.state.currentCard} of ${this.state.totalCards}`
            }
          </CardNumber>
          <FlashCardDiv>
            <QuestionAndAnswerDiv>
              {
                this.state.cardList[this.state.currentCard].question
              }
            </QuestionAndAnswerDiv>
            <QuestionAndAnswerDiv>
              {
                this.state.cardList[this.state.currentCard].answer
              }
            </QuestionAndAnswerDiv>
            <RevealButton>
              Reveal
            </RevealButton>
            <FailSuccessDiv>
              <FailSuccessIndividualDiv style={{gridColumn: '1', gridRow: '1'}}>
                <FailSuccessButton>
                  <b>❌</b>
                </FailSuccessButton>
              </FailSuccessIndividualDiv>
              <FailSuccessIndividualDiv style={{gridColumn: '1', gridRow: '2'}}>
                <FailSuccessCount>
                  {this.state.fail}
                </FailSuccessCount>
              </FailSuccessIndividualDiv>
              <FailSuccessIndividualDiv style={{gridColumn: '2', gridRow: '1'}}>
                <FailSuccessButton>
                <b>✔️</b>
                </FailSuccessButton>
              </FailSuccessIndividualDiv>
              <FailSuccessIndividualDiv style={{gridColumn: '2', gridRow: '2'}}>
                <FailSuccessCount>
                  {this.state.success}
                </FailSuccessCount>
              </FailSuccessIndividualDiv>
            </FailSuccessDiv>
          </FlashCardDiv>
          <MainMenuButton>
            Main Menu
          </MainMenuButton>
        </CollectionDiv>
        <PrevNextDiv>
          <PrevButton>
            <b>{`<`}</b>
          </PrevButton>
          <NextButton>
            <b>{`>`}</b>
          </NextButton>
        </PrevNextDiv>
      </>
    )
  }
}

export default FlashCards;