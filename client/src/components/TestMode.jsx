import React, { Component } from 'react';
import styled from 'styled-components';

class TestMode extends Component {
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

export default TestMode;