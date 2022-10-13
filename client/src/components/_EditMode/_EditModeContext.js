import React, { createContext, useState, useEffect, useContext } from 'react';
import { _MainMenuContext } from '../_MainMenu/_MainMenuContext.js';
import { _AppContext } from '../_App/_AppContext.js';

export const _EditModeContext = createContext(null);

export function _EditModeContextProvider({ children }) {
  const [cardListSlice, setCardListSlice] = useState(cardList.slice());
  const [totalCards, setTotalCards] = useState(cardList.length);
  const [currentCard, setCurrentCard] = useState(0);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [addAdded, setAddAdded] = useState('Add Card');
  const [removeRemoved, setRemoveRemoved] = useState('Remove Card');
  const [confirmConfirmed, setConfirmConfirmed] = useState('Confirm');
  const [prevKey, setPrevKey] = useState(keyPressed);

  const { cardList, collectionName, keyPressed, handleFlashKeydown } = useContext(_MainMenuContext);
  const { username } = useContext(_AppContext);

  useEffect(() => {
    let array = cardList.slice();
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    setCardList(prevState => array);
  }, []);

  useEffect(() => {
    if (keyPressed !== prevKey) {
      if (keyPressed === 'ArrowLeft') {
        prevCard();
        handleFlashKeydown('ArrowUp');
        setPrevKey(prevState => keyPressed);
      } else if (keyPressed === 'ArrowRight') {
        nextCard();
        handleFlashKeydown('ArrowUp');
        setPrevKey(prevState => keyPressed);
      } else {
        handleFlashKeydown('ArrowUp');
        setPrevKey(prevState => keyPressed);
        return;
      }
    }
  }, [keyPressed]);

  const handleQuestionEdit = (e) => {
    e.preventDefault();
    let cards = cardListSlice;
    cards[currentCard].question = e.target.value;
    setNewQuestion(prevState => e.target.value);
    setCardListSlice(prevState => cards);
  };

  const handleAnswerEdit = (e) => {
    e.preventDefault();
    let cards = tcardListSlice;
    cards[currentCard].answer = e.target.value;
    setNewQuestion(prevState => e.target.value);
    setCardListSlice(prevState => cards);
  };

  const handleAddCard = (e) => {
    let newCard = {
      question: '',
      answer: '',
      photo: null,
    };
    let newLength = cardListSlice.length;
    setCardListSlice(prevState => ...cardListSlice, newCard);
    setCurrentCard(prevState => newLength);
    setAddAdded(prevState => 'Added Card!')
    setTimeout(() => {
      setAddAdded(prevState => 'Add Card');
    }, 750);
  };

  const handleRemoveCard = (e) => {
    let updatedCardList = cardListSlice;
    if (currentCard === cardListSlice.length - 1) {
      updatedCardList.splice(currentCard, 1);
      this.setState({
        cardListSlice: updatedCardList,
        currentCard: this.state.currentCard -= 1,
        removeRemoved: 'Removed Card!',
      });
      setCardListSlice(prevState => updatedCardList);
      setCurrentCard(prevState => currentCard -= 1);
      setRemoveRemoved(prevState => 'Removed Card!');
      setTimeout(() => {
        setRemoveRemoved(prevState => 'Remove Card');
      }, 750);
    } else {
      updatedCardList.splice(currentCard, 1);
      setCardListSlice(prevState => updatedCardList);
      setRemoveRemoved(prevState => 'Removed Card!');
      setTimeout(() => {
        setRemoveRemoved(prevState => 'Remove Card');
      }, 750);
    }
  };

  const confirmChanges = (e) => {
    e.preventDefault();
    setConfirmConfirmed(prevState => 'Confirmed Changes!');
    setNewQuestion(prevState => '');
    setNewAnswer(prevState => '');
    setTimeout(() => {
      setConfirmConfirmed(prevState => 'Confirm');
    }, 750);
    let options = {
      collectionName: collectionName,
      updatedCollection: cardListSlice,
    };
    axios.post(`/collections/${username}/edit`, options)
      .then(({ data }) => {
        console.log('confirm data -> ', data);
      })
      .catch((err) => console.error(err));
  };

  const nextCard = () => {
    if (currentCard === totalCards - 1) {
      setCurrentCard(prevState => 0);
    } else {
      setCurrentCard(prevState => currentCard + 1);
  };

  const prevCard = () => {
    if (currentCard === 0) {
      setCurrentCard(prevState => totalCards - 1);
    } else {
      setCurrentCard(prevState => currentCard - 1)
    }
  };

  const value = {
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
  };

  return (
    <_EditModeContext.Provider value={value}>
      {children}
    </_EditModeContext.Provider>
  );
};
