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

const FailSuccessDiv = styled.div`
  display: grid;
  margin: 2%;
`;

const FailSuccessIndividualDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: .2s;
  border-radius: 12px;
  margin-left: 2%;
  margin-right: 2%;
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

const ModalButton = styled.button`
  position: fixed;
  top: 5%;
  right: 5%;
  background-color: white;
  font-size: 20px;
  border: 2px ridge grey;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 10px 5px 5px black;
`;

const StatsButton = styled.button`
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

const AnswerSpans = styled.span`
  overflow-wrap: break-word;
  padding: 2%;
  border-radius: 12px;
`;

const CheckAnswerButton = styled.button`
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

class TestModeDifficult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDifficult: this.props.isDifficult,
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
      averageScore: 0,
      grade: 0,
      answerArray: [],
      abcdAnswers: [],
      correctAnswer: '',
      selectedAnswer: '',
      aAnswer: '',
      bAnswer: '',
      cAnswer: '',
      dAnswer: '',
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
    this.renderAnswers = this.renderAnswers.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
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
    // this.renderAnswers();
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
        this.renderAnswers();
      })
      .catch((err) => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
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
    // check prev state and correct answer
    if (this.state.correctAnswer !== prevState.correctAnswer) {
      console.log('they be different!');
    }
  }

  renderAnswers() {
    let answers = [];
    let correct = this.state.cardList[this.state.currentCard].answer;
    console.log('correct answer is -> ', correct);
    answers.push(correct);
    let loopCount = 0;
    while (answers.length <= 4) {
      let uniq = true;
      loopCount++;
      let num = Math.floor(Math.random() * this.props.cardList.length);
      if (this.props.cardList[num].answer !== correct) {
        for (let i = 0; i < answers.length; i++) {
          if (this.props.cardList[num].answer === answers[i]) {
            uniq = false;
          }
        }
        if (uniq) {
          answers.push(this.props.cardList[num].answer);
          if (answers.length === 4) {
            console.log('breaking out of this joint!');
            break;
          }
        }
      }
      if (loopCount > 30) {
        console.log('breaking loop now');
        break;
      }
    }
    console.log('answers after while loop -> ', answers);
    let currentIndex = answers.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [answers[currentIndex], answers[randomIndex]] = [answers[randomIndex], answers[currentIndex]];
    }
    this.setState({
      aAnswer: answers[0],
      bAnswer: answers[1],
      cAnswer: answers[2],
      dAnswer: answers[3],
      correctAnswer: correct,
      answerArray: answers,
    });
    document.getElementById('A').style.border = 'none';
    document.getElementById('A').style.boxShadow = 'none';
    document.getElementById('B').style.border = 'none';
    document.getElementById('B').style.boxShadow = 'none';
    document.getElementById('C').style.border = 'none';
    document.getElementById('C').style.boxShadow = 'none';
    document.getElementById('D').style.border = 'none';
    document.getElementById('D').style.boxShadow = 'none';
  }

  selectAnswer(e) {
    e.preventDefault();
    console.log('answer id is -> ', e.target.id);
    document.getElementById(e.target.id).style.border = '2px ridge purple';
    document.getElementById(e.target.id).style.boxShadow = '6px 6px 9px violet, 0 0 1em rebeccapurple, 0 0 0.2em rebeccapurple';
    if (e.target.id === 'A') {
      this.setState({
        selectedAnswer: this.state.aAnswer,
      });
      document.getElementById('B').style.border = 'none';
      document.getElementById('B').style.boxShadow = 'none';
      document.getElementById('C').style.border = 'none';
      document.getElementById('C').style.boxShadow = 'none';
      document.getElementById('D').style.border = 'none';
      document.getElementById('D').style.boxShadow = 'none';
    } else if (e.target.id === 'B') {
      this.setState({
        selectedAnswer: this.state.bAnswer,
      });
      document.getElementById('A').style.border = 'none';
      document.getElementById('A').style.boxShadow = 'none';
      document.getElementById('C').style.border = 'none';
      document.getElementById('C').style.boxShadow = 'none';
      document.getElementById('D').style.border = 'none';
      document.getElementById('D').style.boxShadow = 'none';
    } else if (e.target.id === 'C') {
      this.setState({
        selectedAnswer: this.state.cAnswer,
      });
      document.getElementById('B').style.border = 'none';
      document.getElementById('B').style.boxShadow = 'none';
      document.getElementById('A').style.border = 'none';
      document.getElementById('A').style.boxShadow = 'none';
      document.getElementById('D').style.border = 'none';
      document.getElementById('D').style.boxShadow = 'none';
    } else {
      this.setState({
        selectedAnswer: this.state.dAnswer,
      });
      document.getElementById('B').style.border = 'none';
      document.getElementById('B').style.boxShadow = 'none';
      document.getElementById('C').style.border = 'none';
      document.getElementById('C').style.boxShadow = 'none';
      document.getElementById('A').style.border = 'none';
      document.getElementById('A').style.boxShadow = 'none';
    }
    setTimeout(() => {
      console.log('selected answer is -> ', this.state.selectedAnswer);
      console.log('is the answer correct? ', this.state.correctAnswer === this.state.selectedAnswer);
    }, 2000);
  }

  checkAnswer(e) {
    let a = document.getElementById('A'), b = document.getElementById('B'), c = document.getElementById('C'), d = document.getElementById('D');
    e.preventDefault();
    if (this.state.selectedAnswer === this.state.correctAnswer) {
      this.setState({
        score: this.state.score += 1,
        success: this.state.success += 1,
        grade: this.state.score / this.props.cardList.length * 100,
      });
      if (a.style.border === '2px ridge purple') {
        a.style.border = '2px ridge green';
        a.style.boxShadow = '4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen';
        b.style.border = '2px ridge red';
        b.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        c.style.border = '2px ridge red';
        c.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        d.style.border = '2px ridge red';
        d.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
      } else if (b.style.border === '2px ridge purple') {
        a.style.border = '2px ridge red';
        a.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        b.style.border = '2px ridge green';
        b.style.boxShadow = '4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen';
        c.style.border = '2px ridge red';
        c.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        d.style.border = '2px ridge red';
        d.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
      } else if (c.style.border === '2px ridge purple') {
        a.style.border = '2px ridge red';
        a.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        b.style.border = '2px ridge red';
        b.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        c.style.border = '2px ridge green';
        c.style.boxShadow = '4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen';
        d.style.border = '2px ridge red';
        d.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
      } else {
        a.style.border = '2px ridge red';
        a.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        b.style.border = '2px ridge red';
        b.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        c.style.border = '2px ridge red';
        c.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        d.style.border = '2px ridge green';
        d.style.boxShadow = '4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen';
      }
    } else {
      this.setState({
        fail: this.state.fail += 1,
      });
      if (this.state.correctAnswer === this.state.aAnswer) {
        a.style.border = '2px ridge green';
        a.style.boxShadow = '4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen';
        b.style.border = '2px ridge red';
        b.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        c.style.border = '2px ridge red';
        c.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        d.style.border = '2px ridge red';
        d.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
      } else if (this.state.correctAnswer === this.state.bAnswer) {
        a.style.border = '2px ridge red';
        a.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        b.style.border = '2px ridge green';
        b.style.boxShadow = '4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen';
        c.style.border = '2px ridge red';
        c.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        d.style.border = '2px ridge red';
        d.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
      } else if (this.state.correctAnswer === this.state.cAnswer) {
        a.style.border = '2px ridge red';
        a.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        b.style.border = '2px ridge red';
        b.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        c.style.border = '2px ridge green';
        c.style.boxShadow = '4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen';
        d.style.border = '2px ridge red';
        d.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
      } else {
        a.style.border = '2px ridge red';
        a.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        b.style.border = '2px ridge red';
        b.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        c.style.border = '2px ridge red';
        c.style.boxShadow = '4px 4px 6px red, 0 0 1em darkred, 0 0 0.2em darkred';
        d.style.border = '2px ridge green';
        d.style.boxShadow = '4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen';
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
        this.renderAnswers();
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
        this.renderAnswers();
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
        this.renderAnswers();
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
        this.renderAnswers();
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
        this.renderAnswers();
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
        this.renderAnswers();
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
        this.renderAnswers();
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
        this.renderAnswers();
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
    if (this.state.score > this.state.prevScore) {
      this.setState({
        show: true,
      });
      axios.post(`/collections/${this.props.user}/scores/${this.props.collectionName}`, options)
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            this.props.goBack();
          }, 3000);
        })
        .catch((err) => console.error());
    } else {
      axios.post(`/collections/${this.props.user}/scores/${this.props.collectionName}`, options)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.error());
      this.props.goBack();
    }
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
        success: this.state.success,
        fail: this.state.fail,
        answerDisplay: this.state.answerDisplay,
        score: this.state.score,
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
      success: this.state.success,
      fail: this.state.fail,
      answerDisplay: this.state.answerDisplay,
      score: this.state.score,
      prevScore: this.state.prevScore,
      show: false,
    });
    this.props.goBack();
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
          <StatsButton onClick={this.showStats}>
            Show Stats
          </StatsButton>
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
              <FailSuccessIndividualDiv onClick={this.selectAnswer} style={{gridColumn: '1', gridRow: '1', marginBottom: '2%'}}>
                <h5><u><b>A</b></u></h5>
                <AnswerSpans id="A">
                  {this.state.aAnswer}
                </AnswerSpans>
              </FailSuccessIndividualDiv>
              <FailSuccessIndividualDiv onClick={this.selectAnswer} style={{gridColumn: '1', gridRow: '2'}}>
                <h5><u><b>C</b></u></h5>
                <AnswerSpans id="C">
                  {this.state.cAnswer}
                </AnswerSpans>
              </FailSuccessIndividualDiv>
              <FailSuccessIndividualDiv onClick={this.selectAnswer} style={{gridColumn: '2', gridRow: '1', marginBottom: '2%'}}>
                <h5><u><b>B</b></u></h5>
                <AnswerSpans id="B">
                  {this.state.bAnswer}
                </AnswerSpans>
              </FailSuccessIndividualDiv>
              <FailSuccessIndividualDiv onClick={this.selectAnswer} style={{gridColumn: '2', gridRow: '2'}}>
                <h5><u><b>D</b></u></h5>
                <AnswerSpans id="D">
                  {this.state.dAnswer}
                </AnswerSpans>
              </FailSuccessIndividualDiv>
            </FailSuccessDiv>
            <FailSuccessDiv style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
              <FailSuccessDiv style={{display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
                <CheckAnswerButton onClick={this.checkAnswer}>Check Answer</CheckAnswerButton>
              </FailSuccessDiv>
              <FailSuccessDiv style={{display: 'flex', textAlign: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <h5>Grade:</h5>
                {`${this.state.grade}%`}
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
          <HighScoreDiv style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'none', backgroundImage: 'linear-gradient(to bottom, black, orangered, yellow)'}}>
            <ModalButton onClick={this.closeStats}>X</ModalButton>
            <h1><u>{`${this.props.user}'s Stats for ${this.props.collectionName}`}</u></h1>
            <h3 style={{marginTop: '1%'}}>
              {`High Score: ${this.state.highScore}`}
            </h3>
            <hr />
            <h3>
              {`Most Recent Score: ${this.state.prevScore}`}
            </h3>
            <hr />
            <h3>
              {`Average Score: ${this.state.averageScore}`}
            </h3>
            <hr />
            <div style={{width: '60%', height: '40%', backgroundColor: 'white'}}>
              <Stats totalScores={this.state.totalScores} />
            </div>
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
    );
  }
}

export default TestModeDifficult;