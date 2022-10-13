import React, { useContext, useState } from 'react';
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
import { _EditModeContext, _EditModeContextProvider } from './_EditModeContext.js';
import { _MainMenuContext } from '../_MainMenu/_MainMenuContext.js';

const theme = createTheme({
  palette: {
    primary: {
      main: '#040004',
      darker: '#952800',
    }
  }
});

export default function _EditMode() {

  const {
    cardList,
    cardListSlice,
    setCardListSlice,
    totalCards,
    setTotalCards,
    currentCard,
    setCurrentCard,
    newQuestion,
    setNewQuestion,
    newAnswer,
    setNewAnswer,
    addAdded,
    setAddAdded,
    removeRemoved,
    setRemoveRemoved,
    confirmConfirmed,
    setConfirmConfirmed,
    collectionName,
    handleQuestionEdit,
    handleAnswerEdit,
    handleAddCard,
    handleRemoveCard,
    confirmChanges,
    nextCard,
    prevCard
  } = useContext(_EditModeContext);
  const { goToMainMenu } = useContext(_MainMenuContext);

  return (
    <>
      <CollectionNameTitle>
        {
          collectionName
        }
      </CollectionNameTitle>
      <CollectionDiv>
        <CardNumber>
          {
            `Card ${currentCard + 1} of ${cardListSlice.length}`
          }
        </CardNumber>
        <FlashCardDiv>
          {
            cardListSlice[currentCard].photo
            ?
            (
              <ImageDiv>
                <Image src={cardListSlice[currentCard].photo} />
              </ImageDiv>
            )
            :
            (
              null
            )
          }
          <QuestionAndAnswerDiv style={{fontFamily: 'Noto Serif SC' || 'Luckiest Guy', fontSize: '2rem'}}>
            <b>{
              cardListSlice[currentCard].question
            }</b>
          </QuestionAndAnswerDiv>
          <QuestionAndAnswerDiv style={{fontFamily: 'Noto Serif SC' || 'Luckiest Guy', fontSize: '2rem'}}>
            <textarea value={newQuestion} type="text" onChange={(e) => handleQuestionEdit(e)} style={{color: 'white'}} placeholder="Edit Question" />
          </QuestionAndAnswerDiv>
          <QuestionAndAnswerDiv style={{display: 'flex',   backgroundImage: 'linear-gradient(to bottom, black, green)', border: '2px ridge darkgreen', fontFamily: 'Ubuntu', fontSize: '2rem'}} id="answer">
            <b>{
              cardListSlice[currentCard].answer
            }</b>
          </QuestionAndAnswerDiv>
          <QuestionAndAnswerDiv style={{display: 'flex',   backgroundImage: 'linear-gradient(to bottom, black, green)', border: '2px ridge darkgreen', fontFamily: 'Ubuntu', fontSize: '2rem'}} id="answer">
            <textarea value={newAnswer} type="text" onChange={handleAnswerEdit} style={{color: 'white'}} placeholder="Edit Answer" />
          </QuestionAndAnswerDiv>
          <MainMenuDiv>
            {/* <RevealButton type="button" onClick={(e) => this.handleAddCard(e)}>
              {this.state.addAdded}
            </RevealButton> */}
            {
              addAdded === 'Add Card'
              ?
              <RevealButton type="button" onClick={(e) => handleAddCard(e)}>
                {addAdded}
              </RevealButton>
              :
              <RevealButton style={{color: 'green', border: '2px ridge green'}} type="button" onClick={(e) => handleAddCard(e)}>
                {addAdded}
              </RevealButton>
            }
            {/* <RemoveCardButton type="button" onClick={(e) => this.handleRemoveCard(e)}>
              {this.state.removeRemoved}
            </RemoveCardButton> */}
            {
              removeRemoved === 'Remove Card'
              ?
              <RemoveCardButton type="button" onClick={(e) => handleRemoveCard(e)}>
                {removeRemoved}
              </RemoveCardButton>
              :
              <RemoveCardButton style={{color: 'red', border: '2px ridge red'}} type="button" onClick={(e) => handleRemoveCard(e)}>
                {removeRemoved}
              </RemoveCardButton>
            }
            {/* <RevealButton type="button" onClick={(e) => this.confirmChanges(e)} autoFocus>
              {this.state.confirmConfirmed}
            </RevealButton> */}
            {
              confirmConfirmed === 'Confirm'
              ?
              <RevealButton type="button" onClick={(e) => confirmChanges(e)} autoFocus>
                {confirmConfirmed}
              </RevealButton>
              :
              <RevealButton style={{color: 'green', border: '2px ridge green'}} type="button" onClick={(e) => confirmChanges(e)} autoFocus>
                {confirmConfirmed}
              </RevealButton>
            }
          </MainMenuDiv>
        </FlashCardDiv>
        <MainMenuDiv>
          <ThemeProvider theme={theme}>
            <Button onClick={goToMainMenu} variant="contained" size="large" color="primary" style={{border: '2px ridge red'}}>
              Main Menu
            </Button>
          </ThemeProvider>
        </MainMenuDiv>
      </CollectionDiv>
      <PrevNextDiv>
        <PrevButton onClick={prevCard}>
          <b>{`<`}</b>
        </PrevButton>
        <NextButton onClick={nextCard}>
          <b>{`>`}</b>
        </NextButton>
      </PrevNextDiv>
  </>
  );
};
