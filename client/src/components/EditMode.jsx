import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SetTimer from './SetTimer.jsx';
import Confetti from 'react-confetti';
import Stats from './Stats.jsx';

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

const RemoveCardButton = styled.button`
  background-color: black;
  color: white;
  font-family: 'Bangers', cursive;
  border-radius: 12px;
  margin-bottom: 2%;
  padding: 2%;
  transition: .2s;
  &:hover {
    transform: scale(1.15);
    border: 2px ridge red;
    box-shadow: 4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred;
  }
  &:focus {
    outline: none;
  }
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

class EditMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: this.props.cardList,
      cardListSlice: this.props.cardList.slice(),
      collectionName: this.props.collectionName,
      totalCards: this.props.cardList.length,
      currentCard: 0,
      newQuestion: '',
      newAnswer: '',
      addAdded: 'Add Card',
      removeRemoved: 'Remove Card',
      confirmConfirmed: 'Confirm',
    };
    this.nextCard = this.nextCard.bind(this);
    this.prevCard = this.prevCard.bind(this);
    this.goToMainMenu = this.goToMainMenu.bind(this);
    this.confirmChanges = this.confirmChanges.bind(this);
    this.handleQuestionEdit = this.handleQuestionEdit.bind(this);
    this.handleAnswerEdit = this.handleAnswerEdit.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
    this.handleRemoveCard = this.handleRemoveCard.bind(this);
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
    axios.get(`/collections/${this.props.user}/scores/${this.props.collectionName}`)
      .then(({ data }) => {
        let sum = data.totalScores.reduce((total, num) => {
          return total += num;
        }, 0);
        let average = sum / data.totalScores.length;
        this.setState({
          prevScore: data.mostRecentScore,
          totalScores: data.totalScores,
          highScore: data.highScore,
          averageScore: average,
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

  handleQuestionEdit(e) {
    e.preventDefault();
    let cards = this.state.cardListSlice;
    cards[this.state.currentCard].question = e.target.value;
    this.setState({
      newQuestion: e.target.value,
      cardListSlice: cards,
    });
  }

  handleAnswerEdit(e) {
    e.preventDefault();
    let cards = this.state.cardListSlice;
    cards[this.state.currentCard].answer = e.target.value;
    this.setState({
      newAnswer: e.target.value,
      cardListSlice: cards,
    });
  }

  handleAddCard(e) {
    let newCard = {
      question: '',
      answer: '',
      photo: null,
    };
    let newLength = this.state.cardListSlice.length;
    this.setState({
      cardListSlice: [...this.state.cardListSlice, newCard],
      currentCard: newLength,
      addAdded: 'Added Card!',
    });
    setTimeout(() => {
      this.setState({
        addAdded: 'Add Card',
      });
    }, 750);
  }

  handleRemoveCard(e) {
    let updatedCardList = this.state.cardListSlice;
    if (this.state.currentCard === this.state.cardListSlice.length - 1) {
      updatedCardList.splice(this.state.currentCard, 1);
      this.setState({
        cardListSlice: updatedCardList,
        currentCard: this.state.currentCard -= 1,
        removeRemoved: 'Removed Card!',
      });
      setTimeout(() => {
        this.setState({
          removeRemoved: 'Remove Card'
        });
      }, 750);
    } else {
      updatedCardList.splice(this.state.currentCard, 1);
      this.setState({
        cardListSlice: updatedCardList,
        removeRemoved: 'Removed Card!',
      });
      setTimeout(() => {
        this.setState({
          removeRemoved: 'Remove Card'
        });
      }, 750);
    }
  }

  confirmChanges(e) {
    e.preventDefault();
    this.setState({
      confirmConfirmed: 'Confirmed Changes!',
    });
    setTimeout(() => {
      this.setState({
        confirmConfirmed: 'Confirm',
      });
    }, 750);
    let options = {
      collectionName: this.props.collectionName,
      updatedCollection: this.state.cardListSlice,
    };
    axios.post(`/collections/${this.props.user}/edit`, options)
      .then(({ data }) => {
        console.log('confirm data -> ', data);
      })
      .catch((err) => console.error(err));
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

  goToMainMenu() {
    this.props.goBack();
  }

  render() {
    return (
      <>
          <CollectionNameTitle>
            {
              this.state.collectionName
            }
          </CollectionNameTitle>
          <CollectionDiv>
            <CardNumber>
              {
                `Card ${this.state.currentCard + 1} of ${this.state.cardListSlice.length}`
              }
            </CardNumber>
            <FlashCardDiv>
              {
                this.state.cardListSlice[this.state.currentCard].photo
                ?
                (
                  <ImageDiv>
                    <Image src={this.state.cardListSlice[this.state.currentCard].photo} />
                  </ImageDiv>
                )
                :
                (
                  null
                )
              }
              <QuestionAndAnswerDiv style={{fontFamily: 'Noto Serif SC' || 'Luckiest Guy', fontSize: '2rem'}}>
                <b>{
                  this.state.cardListSlice[this.state.currentCard].question
                }</b>
              </QuestionAndAnswerDiv>
              <QuestionAndAnswerDiv style={{fontFamily: 'Noto Serif SC' || 'Luckiest Guy', fontSize: '2rem'}}>
                <textarea value={this.state.newQuestion} type="text" onChange={(e) => this.handleQuestionEdit(e)} style={{color: 'white'}} placeholder="Edit Question" />
              </QuestionAndAnswerDiv>
              <QuestionAndAnswerDiv style={{display: 'flex',   backgroundImage: 'linear-gradient(to bottom, black, green)', border: '2px ridge darkgreen', fontFamily: 'Ubuntu', fontSize: '2rem'}} id="answer">
                <b>{
                  this.state.cardListSlice[this.state.currentCard].answer
                }</b>
              </QuestionAndAnswerDiv>
              <QuestionAndAnswerDiv style={{display: 'flex',   backgroundImage: 'linear-gradient(to bottom, black, green)', border: '2px ridge darkgreen', fontFamily: 'Ubuntu', fontSize: '2rem'}} id="answer">
                <textarea value={this.state.newAnswer} type="text" onChange={this.handleAnswerEdit} style={{color: 'white'}} placeholder="Edit Answer" />
              </QuestionAndAnswerDiv>
              <MainMenuDiv>
                {/* <RevealButton type="button" onClick={(e) => this.handleAddCard(e)}>
                  {this.state.addAdded}
                </RevealButton> */}
                {
                  this.state.addAdded === 'Add Card'
                  ?
                  <RevealButton type="button" onClick={(e) => this.handleAddCard(e)}>
                    {this.state.addAdded}
                  </RevealButton>
                  :
                  <RevealButton style={{color: 'green', border: '2px ridge green'}} type="button" onClick={(e) => this.handleAddCard(e)}>
                    {this.state.addAdded}
                  </RevealButton>
                }
                {/* <RemoveCardButton type="button" onClick={(e) => this.handleRemoveCard(e)}>
                  {this.state.removeRemoved}
                </RemoveCardButton> */}
                {
                  this.state.removeRemoved === 'Remove Card'
                  ?
                  <RemoveCardButton type="button" onClick={(e) => this.handleRemoveCard(e)}>
                    {this.state.removeRemoved}
                  </RemoveCardButton>
                  :
                  <RemoveCardButton style={{color: 'red', border: '2px ridge red'}} type="button" onClick={(e) => this.handleRemoveCard(e)}>
                    {this.state.removeRemoved}
                  </RemoveCardButton>
                }
                {/* <RevealButton type="button" onClick={(e) => this.confirmChanges(e)} autoFocus>
                  {this.state.confirmConfirmed}
                </RevealButton> */}
                {
                  this.state.confirmConfirmed === 'Confirm'
                  ?
                  <RevealButton type="button" onClick={(e) => this.confirmChanges(e)} autoFocus>
                    {this.state.confirmConfirmed}
                  </RevealButton>
                  :
                  <RevealButton style={{color: 'green', border: '2px ridge green'}} type="button" onClick={(e) => this.confirmChanges(e)} autoFocus>
                    {this.state.confirmConfirmed}
                  </RevealButton>
                }
              </MainMenuDiv>
            </FlashCardDiv>
            <MainMenuDiv>
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
      </>
    )
  }
}

export default EditMode;