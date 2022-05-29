import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SetTimer from './SetTimer.jsx';
import Confetti from 'react-confetti'

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
  background-size: cover;
  padding: 3%;
  margin-top: 5%;
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
  &:focus {
    outline: none;
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
  flex-direction: column;
  align-items: center;
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

const Image = styled.img`
  width: 80%;
  height: 20%;
`;

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimerDiv = styled.div`
  text-align: center;
  top: 0;
  left: 0;
  position: relative;
  background-image: linear-gradient(to bottom, black, orangered);
  background-size: cover;
  padding: 3%;
  margin-top: 2%;
  width: fit-content;
  border: 4px ridge darkred;
  border-radius: 12px;
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const HighScoreDiv = styled.div`
  top: 0;
  left: 0;
  background-color: red;
  color: white;
  border: 2px ridge darkred;
  border-radius: 12px;
  text-align: center;
  font-family: 'Luckiest Guy';
  padding-top: 3%;
  padding-bottom: 3%;
`;

const KeyReceiver = styled.div`
  &:focus {
    outline: none
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
      prevScore: 0,
      show: false,
      totalScores: [],
      highScore: 0,
      showStats: false,
    };
    this.nextCard = this.nextCard.bind(this);
    this.prevCard = this.prevCard.bind(this);
    this.reveal = this.reveal.bind(this);
    this.handleFail = this.handleFail.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.back = this.back.bind(this);
    this.timeExpire = this.timeExpire.bind(this);
    this.showConfetti = this.showConfetti.bind(this);
    this.prevNextKeydown = this.prevNextKeydown.bind(this);
    this.goToMainMenu = this.goToMainMenu.bind(this);
    this.showStats = this.showStats.bind(this);
    this.closeStats = this.closeStats.bind(this);
  }

  componentDidMount() {
    let array = this.state.cardList.slice();
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    this.setState({
      cardList: array,
    });
    let prevScore = JSON.parse(localStorage.getItem('score'));
    if (!prevScore || prevScore === 0) {
      this.setState({
        prevScore: 0
      });
    } else {
      this.setState({
        prevScore: prevScore
      });
    }
    axios.get(`/collections/${this.props.user}/scores/${this.props.collectionName}`)
      .then(({ data }) => {
        this.setState({
          prevScore: data.mostRecentScore,
          totalScores: data.totalScores,
          highScore: data.highScore,
        });
      })
      .catch((err) => console.error(err));
  }

  componentDidUpdate(prevProps) {
    if (this.props.pressedKey !== prevProps.pressedKey) {
      if (this.props.pressedKey === 'ArrowLeft') {
        this.prevCard();
        this.props.keydown('ArrowUp');
      } else if (this.props.pressedKey === 'ArrowRight') {
        this.nextCard();
        this.props.keydown('ArrowUp');
      } else {
        this.props.keydown('ArrowUp');
        return;
      }
    }
  }

  showStats() {
    this.setState({
      showStats: true,
    });
  }

  closeStats() {
    this.setState({
      showStats: false,
    });
  }

  prevNextKeydown(e) {
    e.preventDefault();
    this.props.keydown(e.key);
    this.props.keydown('ArrowUp');
  }

  nextCard() {
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
    let options = {
      totalScores: [...this.state.totalScores, this.state.score],
      score: this.state.score
    };
    axios.post(`/collections/${this.props.user}/scores/${this.props.collectionName}`, options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error());
    this.props.goBack();
  }

  goToMainMenu() {
    this.props.goBack();
  }

  timeExpire() {
    if (this.state.score > this.state.prevScore) {
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
        show: true,
      })
    }
  }

  showConfetti() {
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
      show: false,
    })
  }

  render() {
    return (
      <>
        <KeyReceiver onKeyDown={this.prevNextKeydown}>
          <CollectionNameTitle>
            {
              this.state.collectionName
            }
          </CollectionNameTitle>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <button>
              Show Stats
            </button>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <TimerDiv>
              <SetTimer expire={this.timeExpire} />
            </TimerDiv>
          </div>
          <CollectionDiv onKeyDown={this.prevNextKeydown}>
            <CardNumber>
              {
                `Card ${this.state.currentCard + 1} of ${this.state.totalCards}`
              }
            </CardNumber>
            <FlashCardDiv>
              {
                this.state.cardList[this.state.currentCard].photo
                ?
                (
                  <ImageDiv>
                    <Image src={this.state.cardList[this.state.currentCard].photo} />
                  </ImageDiv>
                )
                :
                (
                  null
                )
              }
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
              <RevealButton type="button" onClick={this.reveal} autoFocus>
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
                <Button onClick={this.back} variant="contained" size="large" color="primary" style={{border: '2px ridge red'}}>
                  Finish
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <Button onClick={this.goToMainMenu} variant="contained" size="large" color="primary" style={{border: '2px ridge red'}}>
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
          <Modal open={this.state.showStats}>
            <HighScoreDiv>
              <h1>{`${this.props.user}'s Stats for ${this.props.collectionName}`}</h1>
            </HighScoreDiv>
          </Modal>
          <Modal open={this.state.show}>
                <HighScoreDiv>
                  <h1>{`Congratulations ${this.props.user}!`}</h1>
                  <h2>{`You beat your previous score of ${this.state.prevScore} with ${this.state.score}!`}</h2>
                </HighScoreDiv>
          </Modal>
          <Modal
            open={this.state.show}
            onClick={this.showConfetti}
          >
            <div className="PromptSubmit">
              <Confetti
                recycle={false}
                // run={testsPassed}
                numberOfPieces={1000}
                gravity={2}
              />
            </div>
          </Modal>
        </KeyReceiver>
      </>
    )
  }
}

export default FlashCards;