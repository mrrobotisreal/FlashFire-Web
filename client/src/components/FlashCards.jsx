import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#040004',
      darker: '#952800',
    }
  }
});

const CollectionDiv = styled.div`
  text-align: center;
  color: #470047
  top: 0;
  left: 0;
  position: relative;
  background-image: linear-gradient(to bottom, black, orangered, yellow);
  /* background-image: url('https://acegif.com/wp-content/gifs/fire-15.gif'); */
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
    border: 2px ridge green;
    color: green;
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
    border: 2px ridge green;
    color: green;
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
  display: flex;
  justify-content: center;
  border: 2px ridge orangered;
  border-radius: 12px;
  background-image: linear-gradient(to bottom, black, darkred);
  color: white;
  font-family: 'Bangers', cursive;
  padding: 2%;
  overflow: break-word;
  margin-bottom: 2%;
  transition: .2s;
`;

const RevealButton = styled.button`
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
  background-color: black;
  box-shadow: 4px 4px 6px red, 0 0 1em orange, 0 0 0.2em orange;
  width: fit-content;
  padding: 4%;
  display: flex;
  justify-content: center;
  margin-bottom: 3%;
  transition: .2s;
  &:hover {
    transform: scale(1.15);
    box-shadow: 4px 4px 6px orange, 0 0 1em yellow, 0 0 0.2em yellow;
  }
`;

const SuccessButton = styled.button`
  border: 2px ridge green;
  border-radius: 12px;
  background-color: black;
  box-shadow: 4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen;
  width: fit-content;
  padding: 4%;
  display: flex;
  justify-content: center;
  margin-bottom: 3%;
  transition: .2s;
  &:hover {
    transform: scale(1.15);
    box-shadow: 4px 4px 6px orange, 0 0 1em yellow, 0 0 0.2em yellow;
  }
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

const MainMenuDiv = styled.div`
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
  transition: .2s;
  &:hover {
    transform: scale(1.15);
    color: yellow;
    border: 2px ridge yellow;
  }
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
      answerDisplay: 'none',
      score: 0,
      prevScore: 0
    };
    this.nextCard = this.nextCard.bind(this);
    this.prevCard = this.prevCard.bind(this);
    this.reveal = this.reveal.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.back = this.back.bind(this);
  }

  componentDidMount() {
    let prevScore = JSON.parse(localStorage.getItem('score'));
    if (!prevScore || prevScore === 0) {
      this.setState({
        prevScore: 0
      })
    } else {
      this.setState({
        prevScore: prevScore
      })
    }
  }

  nextCard() {
    console.log('nextCard ', this.state.currentCard)
    if (this.state.currentCard === this.state.totalCards - 1) {
      if (this.state.answerDisplay !== 'none') {
        this.setState({
          cardList: this.state.cardList,
          collectionName: this.state.collectionName,
          totalCards: this.state.cardList.length,
          currentCard: 0,
          success: this.state.success,
          fail: this.state.fail,
          answerDisplay: 'none',
          score: this.state.score,
          prevScore: this.state.prevScore,
        });
      } else {
        this.setState({
          cardList: this.state.cardList,
          collectionName: this.state.collectionName,
          totalCards: this.state.cardList.length,
          currentCard: 0,
          success: this.state.success,
          fail: this.state.fail,
          answerDisplay: this.state.answerDisplay,
          score: this.state.score,
          prevScore: this.state.prevScore,
        });
      }
    } else {
      if (this.state.answerDisplay !== 'none') {
        this.setState({
          cardList: this.state.cardList,
          collectionName: this.state.collectionName,
          totalCards: this.state.cardList.length,
          currentCard: this.state.currentCard += 1,
          success: this.state.success,
          fail: this.state.fail,
          answerDisplay: 'none',
          score: this.state.score,
          prevScore: this.state.prevScore,
        });
      } else {
        this.setState({
          cardList: this.state.cardList,
          collectionName: this.state.collectionName,
          totalCards: this.state.cardList.length,
          currentCard: this.state.currentCard += 1,
          success: this.state.success,
          fail: this.state.fail,
          answerDisplay: this.state.answerDisplay,
          score: this.state.score,
          prevScore: this.state.prevScore,
        });
      }
    }
  }

  prevCard() {
    console.log('prevCard ', this.state.currentCard)
    if (this.state.currentCard === 0) {
      if (this.state.answerDisplay !== 'none') {
        this.setState({
          cardList: this.state.cardList,
          collectionName: this.state.collectionName,
          totalCards: this.state.cardList.length,
          currentCard: this.state.totalCards - 1,
          success: this.state.success,
          fail: this.state.fail,
          answerDisplay: 'none',
          score: this.state.score,
          prevScore: this.state.prevScore,
        });
      } else {
        this.setState({
          cardList: this.state.cardList,
          collectionName: this.state.collectionName,
          totalCards: this.state.cardList.length,
          currentCard: this.state.totalCards - 1,
          success: this.state.success,
          fail: this.state.fail,
          answerDisplay: this.state.answerDisplay,
          score: this.state.score,
          prevScore: this.state.prevScore,
        });
      }
    } else {
      if (this.state.answerDisplay !== 'none') {
        this.setState({
          cardList: this.state.cardList,
          collectionName: this.state.collectionName,
          totalCards: this.state.cardList.length,
          currentCard: this.state.currentCard -= 1,
          success: this.state.success,
          fail: this.state.fail,
          answerDisplay: 'none',
          score: this.state.score,
          prevScore: this.state.prevScore,
        });
      } else {
        this.setState({
          cardList: this.state.cardList,
          collectionName: this.state.collectionName,
          totalCards: this.state.cardList.length,
          currentCard: this.state.currentCard -= 1,
          success: this.state.success,
          fail: this.state.fail,
          answerDisplay: this.state.answerDisplay,
          score: this.state.score,
          prevScore: this.state.prevScore,
        });
      }
    }
  }

  reveal() {
    if (this.state.answerDisplay === 'none') {
      this.setState({
        cardList: this.state.cardList,
        collectionName: this.state.collectionName,
        totalCards: this.state.cardList.length,
        currentCard: this.state.currentCard,
        success: this.state.success,
        fail: this.state.fail,
        answerDisplay: 'flex',
        score: this.state.score,
        prevScore: this.state.prevScore,
      })
    } else {
      this.setState({
        cardList: this.state.cardList,
        collectionName: this.state.collectionName,
        totalCards: this.state.cardList.length,
        currentCard: this.state.currentCard,
        success: this.state.success,
        fail: this.state.fail,
        answerDisplay: 'none',
        score: this.state.score,
        prevScore: this.state.prevScore,
      })
    }
  }

  handleFail() {
    this.setState({
      cardList: this.state.cardList,
      collectionName: this.state.collectionName,
      totalCards: this.state.cardList.length,
      currentCard: this.state.currentCard,
      success: this.state.success,
      fail: this.state.fail += 1,
      answerDisplay: this.state.answerDisplay,
      score: this.state.score,
      prevScore: this.state.prevScore,
    });
  }

  handleSuccess() {
    this.setState({
      cardList: this.state.cardList,
      collectionName: this.state.collectionName,
      totalCards: this.state.cardList.length,
      currentCard: this.state.currentCard,
      success: this.state.success += 1,
      fail: this.state.fail,
      answerDisplay: this.state.answerDisplay,
      score: this.state.score += 1,
      prevScore: this.state.prevScore,
    });
  }

  back(score) {
    localStorage.setItem('score', JSON.stringify(this.state.score));
    this.props.goBack();
  }

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
              `Card ${this.state.currentCard + 1} of ${this.state.totalCards}`
            }
          </CardNumber>
          <FlashCardDiv>
            <QuestionAndAnswerDiv style={{fontFamily: 'Noto Serif SC' || 'Luckiest Guy', fontSize: '2rem'}}>
              <b>{
                this.state.cardList[this.state.currentCard].question
              }</b>
            </QuestionAndAnswerDiv>
            <QuestionAndAnswerDiv style={{display: this.state.answerDisplay,   backgroundImage: 'linear-gradient(to bottom, black, green)', border: '2px ridge darkgreen', fontFamily: 'Ubuntu', fontSize: '2rem'}} id="answer">
              <b>{
                this.state.cardList[this.state.currentCard].answer
              }</b>
            </QuestionAndAnswerDiv>
            <RevealButton type="button" onClick={this.reveal}>
              Reveal
            </RevealButton>
            <FailSuccessDiv>
              <FailSuccessIndividualDiv style={{gridColumn: '1', gridRow: '1'}}>
                <FailSuccessButton onClick={this.handleFail}>
                  <b>❌</b>
                </FailSuccessButton>
              </FailSuccessIndividualDiv>
              <FailSuccessIndividualDiv style={{gridColumn: '1', gridRow: '2'}}>
                <FailSuccessCount>
                  {this.state.fail}
                </FailSuccessCount>
              </FailSuccessIndividualDiv>
              <FailSuccessIndividualDiv style={{gridColumn: '2', gridRow: '1'}}>
                <SuccessButton onClick={this.handleSuccess}>
                <b>✔️</b>
                </SuccessButton>
              </FailSuccessIndividualDiv>
              <FailSuccessIndividualDiv style={{gridColumn: '2', gridRow: '2'}}>
                <FailSuccessCount>
                  {this.state.success}
                </FailSuccessCount>
              </FailSuccessIndividualDiv>
            </FailSuccessDiv>
            <FailSuccessDiv style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
              <FailSuccessDiv style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
                <h3>Previous Score</h3>
              </FailSuccessDiv>
              <FailSuccessDiv style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
                {this.state.prevScore}
              </FailSuccessDiv>
            </FailSuccessDiv>
          </FlashCardDiv>
          <MainMenuDiv>
            <ThemeProvider theme={theme}>
              <Button onClick={this.back} variant="contained" size="large" color="primary">
                Main Menu
              </Button>
            </ThemeProvider>
          </MainMenuDiv>
        </CollectionDiv>
        <PrevNextDiv>
          <PrevButton onClick={this.prevCard}>
            <b>{`<`}</b>
          </PrevButton>
          <NextButton onClick={this.nextCard}>
            <b>{`>`}</b>
          </NextButton>
        </PrevNextDiv>
      </>
    )
  }
}

export default FlashCards;