import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MainMenuDiv = styled.div`
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
`;

const MainMenuTitle = styled.h2`
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 3%;
  text-align: center;
`;

const CollectionsDiv = styled.div`
  background-color: black;
  border: 2px ridge darkred;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2%;
`;

const CollectionsTitle = styled.h3`
  text-align: center;
  color: white;
  background-color: black;
  padding: 1%;
  border-radius: 12px;
`;

const CreateCollectionButton = styled.button`
  border-radius: 12px;
  width: fit-content;
  transition: .2s;
  margin-top: 4%
  &:hover {
    transform: scale(1.15);
  }
`;

const CreateCollectionsTitle = styled.h2`
  text-align: center;
  grid-column: 1;
  grid-row: 1;
  margin-bottom: 3%;
`;

const NewCollectionDiv = styled.div`
  background-color: black;
  background-image: url('https://thumbs.gfycat.com/ConfusedMetallicBellfrog-size_restricted.gif');
  background-size: cover;
  border: 2px ridge darkred;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2%;
`;

const CollectionLabel = styled.label`
  width: fit-content;
  background-color: black;
  border-radius: 12px;
  grid-column: 1;
  text-align: center;
  padding: 1%;
`;

const CollectionInput = styled.input`
  background-color: darkgrey;
  color: white;
  text-align: left;
  margin-bottom: 2%;
`;

const CardDiv = styled.div`
  background-image: linear-gradient(to bottom, black, orangered);
  border: 2px ridge darkred;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4%;
`;

const AddCardButton = styled.button`
  border-radius: 12px;
  color: white;
  background-color: black;
  transition: .2s;
  margin-top: 8%;
  &:hover {
    transform: scale(1.15);
    background-color: orangered;
  }
`;

const TotalCardsSpan = styled.span`
  color: white;
  text-align: center;
`;

const FinishCollectionButton = styled.button`
  border-radius: 12px;
  color: white;
  background-color: black;
  transition: .2s;
  margin-top: 4%;
  &:hover {
    transform: scale(1.15);
    background-color: orangered;
  }
`;

const MainMenu = ({ user }) => {
  const [ userCollections, setUserCollections ] = useState([]);
  const [ isCreating, setIsCreating ] = useState(false);
  const [ collectionName, setCollectionName ] = useState('');
  const [ category, setCategory ] = useState('');
  const [ question, setQuestion ] = useState('');
  const [ answer, setAnswer ] = useState('');
  const [ cardList, setCardList ] = useState([]);
  const [ currentCard, setCurrentCard ] = useState('');
  const [ cardCount, setCardCount ] = useState(0);

  let addCardText = 'Add Card';

  const createCollection = () => {
    setIsCreating(true);
  };

  const handleCollectionName = (e) => {
    setCollectionName(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const submitCard = () => {
    let newCard = {
      question: question,
      answer: answer
    };
    let cardsArray = [];
    cardsArray.push(newCard);
    setCurrentCard(newCard);
    setCardList(cardsArray);
    setQuestion('');
    setAnswer('');
    addCardText = 'Card Added ✅';
    cardCount += 1;
    setTimeout(() => {
      addCardText = 'Add Card';
    }, 1000);
  };

  const finishCollection = () => {
    // send new collection to /collections/:user/add-collection server route
    let newCollection = {
      name: collectionName,
      category: category,
      cardList: cardList
    };
    axios.post(`/collections/${user}/add`, newCollection)
      .then((res) => {
        console.log('New collection created!');
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log('user -> ', user);
    // axios.get(`/collections/${user}`)
    //   .then((collections) => {
    //     // set user collection list
    //     console.log('collections -> ', collections);
    //     // setUserCollections(collections);
    //   })
    //   .catch((err) => console.error(err));
  }, [cardList, addCardText, cardCount, currentCard]);

  return (
    <MainMenuDiv>
      <>
        {
          !isCreating
          ?
          (
            <>
              <MainMenuTitle><b><u>Main Menu</u></b></MainMenuTitle>
              <CollectionsDiv>
                <CollectionsTitle><b><u>Collections:</u></b></CollectionsTitle>
                {
                  // map over the collections
                  userCollections.length === 0
                  ?
                  (
                    <>
                      <span>You don't have any collections yet!</span>
                      <span>Click the button below to create a collection</span>
                    </>
                  )
                  :
                  (
                    userCollections.map((collection, index) => {
                      return (
                        <li key={index + collection.name}>{collection.name}</li>
                      )
                    })
                  )
                }
                <CreateCollectionButton onClick={createCollection}>
                  Create New Collection
                </CreateCollectionButton>
              </CollectionsDiv>
            </>
          )
          :
          (
            <>
              <CreateCollectionsTitle><b><u>Create Collection</u></b></CreateCollectionsTitle>
              <NewCollectionDiv>
                <CollectionLabel style={{gridRow: '1'}}>
                  <b>Collection Name:</b>
                </CollectionLabel>
                <CollectionInput style={{gridRow: '2'}} onChange={handleCollectionName} />
                <CollectionLabel style={{gridRow: '3'}}>
                  <b>Category:</b>
                </CollectionLabel>
                <CollectionInput style={{gridRow: '4'}} onChange={handleCategory} />
                <CollectionLabel style={{gridRow: '5'}}>
                  <b>Add Cards:</b>
                </CollectionLabel>
                <CardDiv style={{gridRow: '6'}}>
                  <CollectionLabel style={{gridRow: '1'}}>
                    <b>Question:</b>
                  </CollectionLabel>
                  <CollectionInput style={{gridRow: '2'}} onChange={handleQuestion} />
                  <CollectionLabel style={{gridRow: '3'}}>
                    <b>Answer:</b>
                  </CollectionLabel>
                  <CollectionInput style={{gridRow: '4'}} onChange={handleAnswer} />
                  <AddCardButton style={{gridRow: '5'}} onClick={submitCard}>
                    <b>{addCardText}</b>
                  </AddCardButton>
                  <TotalCardsSpan>
                    <b>{`Total Cards: ${cardCount}`}</b>
                  </TotalCardsSpan>
                </CardDiv>
                <FinishCollectionButton style={{gridRow: '7'}} onClick={finishCollection}>
                  <b>Finish Collection</b>
                </FinishCollectionButton>
              </NewCollectionDiv>
            </>
          )
        }
      </>
    </MainMenuDiv>
  )
};

export default MainMenu;