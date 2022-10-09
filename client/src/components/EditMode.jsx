import * as React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SetTimer from './SetTimer.jsx';
import Confetti from 'react-confetti';
import Stats from './Stats.jsx';
import {
  CollectionDiv,
  PrevButton,
  NextButton,
  PrevNextDiv,
  CollectionNameTitle,
  CardNumber,
  FlashCardDiv,
  QuestionAndAnswerDiv,
  RevealButton,
  RemoveCardButton,
  MainMenuDiv,
  MainMenuButton,
  Image,
  ImageDiv
} from './EditMode/EditModeStyledComponents.js';

const theme = createTheme({
  palette: {
    primary: {
      main: '#040004',
      darker: '#952800',
    }
  }
});

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
      newQuestion: '',
      newAnswer: '',
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
          currentCard: 0,
          answerDisplay: 'none',
        });
      } else {
        this.setState({
          currentCard: 0,
        });
      }
    } else {
      if (this.state.answerDisplay !== 'none') {
        this.setState({
          currentCard: this.state.currentCard += 1,
          answerDisplay: 'none',
        });
      } else {
        this.setState({
          currentCard: this.state.currentCard += 1,
        });
      }
    }
  }

  prevCard() {
    if (this.state.currentCard === 0) {
      if (this.state.answerDisplay !== 'none') {
        this.setState({
          currentCard: this.state.totalCards - 1,
          answerDisplay: 'none',
        });
      } else {
        this.setState({
          currentCard: this.state.totalCards - 1,
        });
      }
    } else {
      if (this.state.answerDisplay !== 'none') {
        this.setState({
          currentCard: this.state.currentCard -= 1,
          answerDisplay: 'none',
        });
      } else {
        this.setState({
          currentCard: this.state.currentCard -= 1,
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