import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FlashCards from './FlashCards.jsx';

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
  font-family: 'Luckiest Guy', cursive;
  /* text-shadow: 1px 1px 2px red, 0 0 1em darkred, 0 0 0.2em darkred; */
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

const UserCollectionsDiv = styled.div`
  margin-top: 2%;
  margin-bottom: 4%;
  border: 2px ridge darkred;
  border-radius: 12px;
  padding: 2%;
  text-align: center;
  width: 40%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const UserCollections = styled.h4`
  padding: 2%;
  transition: .2s;
  width: fit-content;
  cursor: pointer;
  font-family: 'Bangers', cursive;
  &:hover {
    border-bottom: 3px ridge darkred;
    /* border-left: 1px ridge darkred;
    border-right: 1px ridge darkred; */
    border-radius: 12px;
    color: red;
    transform: scale(1.25);
  }
`;

const CollectionsTitle = styled.h3`
  text-align: center;
  color: white;
  background-color: black;
  padding: 1%;
  border-radius: 12px;
  font-family: 'Bangers', cursive;
`;

const CreateCollectionButton = styled.button`
  border-radius: 12px;
  width: fit-content;
  transition: .2s;
  margin-top: 4%;
  font-family: 'Bangers', cursive;
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

const CollCountSpan = styled.span`
  color: yellow;
`;

class MainMenu2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCollections: [],
      isCreating: false,
      collectionName: '',
      category: '',
      question: '',
      answer: '',
      cardList: [],
      cardCount: 0,
      flash: false,
      currentCollection: [],
    };
    this.chooseCollection = this.chooseCollection.bind(this);
    this.createCollection = this.createCollection.bind(this);
    this.handleCollectionName = this.handleCollectionName.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.submitCard = this.submitCard.bind(this);
    this.finishCollection = this.finishCollection.bind(this);
    this.goToMainMenu = this.goToMainMenu.bind(this);
  }

  componentDidMount() {
    axios.get(`/collections/${this.props.user}`)
      .then(({ data }) => {
        console.log('component did res -> ', data);
        if (data.length !== 0) {
          this.setState({
            userCollections: data,
            isCreating: this.state.isCreating,
            collectionName: this.state.collectionName,
            category: this.state.category,
            question: this.state.question,
            answer: this.state.answer,
            cardList: this.state.cardList,
            cardCount: this.state.cardCount,
            flash: this.state.flash,
            currentCollection: this.state.currentCollection
          })
        } else if (!data) {
          // Say sorry, that user does not exist, please create an account
        }
      })
      .catch((err) => console.error(err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isCreating !== this.state.isCreating) {
      console.log('state is changed');
    }
  }

  chooseCollection(e) {
    console.log('id collection is -> ', e.target.id);
    let choice;
    let choiceName;
    for (let i = 0; i < this.state.userCollections.length; i++) {
      if (this.state.userCollections[i].name === e.target.id) {
        choice = this.state.userCollections[i].cardList;
        choiceName = this.state.userCollections[i].name;
      }
    }
    this.setState({
      userCollections: this.state.userCollections,
      isCreating: this.state.isCreating,
      collectionName: choiceName,
      category: this.state.category,
      question: this.state.question,
      answer: this.state.answer,
      cardList: this.state.cardList,
      cardCount: this.state.cardCount,
      flash: true,
      currentCollection: choice
    });
  }

  createCollection() {
    this.setState({
      userCollections: this.state.userCollections,
      isCreating: true,
      collectionName: this.state.collectionName,
      category: this.state.category,
      question: this.state.question,
      answer: this.state.answer,
      cardList: this.state.cardList,
      cardCount: this.state.cardCount,
      flash: this.state.flash,
      currentCollection: this.state.currentCollection
    });
  }

  handleCollectionName(e) {
    this.setState({
      userCollections: this.state.userCollections,
      isCreating: this.state.isCreating,
      collectionName: e.target.value,
      category: this.state.category,
      question: this.state.question,
      answer: this.state.answer,
      cardList: this.state.cardList,
      cardCount: this.state.cardCount,
      flash: this.state.flash,
      currentCollection: this.state.currentCollection
    });
  }

  handleCategory(e) {
    this.setState({
      userCollections: this.state.userCollections,
      isCreating: this.state.isCreating,
      collectionName: this.state.collectionName,
      category: e.target.value,
      question: this.state.question,
      answer: this.state.answer,
      cardList: this.state.cardList,
      cardCount: this.state.cardCount,
      flash: this.state.flash,
      currentCollection: this.state.currentCollection
    });
  }

  handleQuestion(e) {
    this.setState({
      userCollections: this.state.userCollections,
      isCreating: this.state.isCreating,
      collectionName: this.state.collectionName,
      category: this.state.category,
      question: e.target.value,
      answer: this.state.answer,
      cardList: this.state.cardList,
      cardCount: this.state.cardCount,
      flash: this.state.flash,
      currentCollection: this.state.currentCollection
    });
  }

  handleAnswer(e) {
    this.setState({
      userCollections: this.state.userCollections,
      isCreating: this.state.isCreating,
      collectionName: this.state.collectionName,
      category: this.state.category,
      question: this.state.question,
      answer: e.target.value,
      cardList: this.state.cardList,
      cardCount: this.state.cardCount,
      flash: this.state.flash,
      currentCollection: this.state.currentCollection
    });
  }

  submitCard() {
    let newCard = {
      question: this.state.question,
      answer: this.state.answer
    };
    let newCount = this.state.cardCount + 1;
    this.setState({
      userCollections: this.state.userCollections,
      isCreating: this.state.isCreating,
      collectionName: this.state.collectionName,
      category: this.state.category,
      question: '',
      answer: '',
      cardList: [newCard, ...this.state.cardList],
      cardCount: newCount,
      flash: this.state.flash,
      currentCollection: this.state.currentCollection
    });
    document.getElementById('question').value = '';
    document.getElementById('answer').value = '';
  }

  finishCollection() {
    // send new collection to /collections/:user/add-collection server route
    let newCollection = {
      name: this.state.collectionName,
      category: this.state.category,
      cardList: this.state.cardList
    };
    axios.post(`/collections/${this.props.user}/add`, newCollection)
      .then((res) => {
        console.log('New collection created!');
        this.setState({
          userCollections: this.state.userCollections,
          isCreating: false,
          collectionName: this.state.collectionName,
          category: this.state.category,
          question: this.state.question,
          answer: this.state.answer,
          cardList: this.state.cardList,
          cardCount: this.state.cardCount,
          flash: this.state.flash,
          currentCollection: this.state.currentCollection
        });
        alert('Collection was added to your profile!');
        // axios.get(`/collections/${this.props.user}`)
        //   .then((res) => {
        //     console.log('res -> ', res);
        //   })
        //   .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  goToMainMenu() {
    this.setState({
      userCollections: this.state.userCollections,
      isCreating: false,
      collectionName: this.state.collectionName,
      category: this.state.category,
      question: this.state.question,
      answer: this.state.answer,
      cardList: this.state.cardList,
      cardCount: this.state.cardCount,
      flash: this.state.flash,
      currentCollection: this.state.currentCollection
    });
    axios.get(`/collections/${this.props.user}`)
      .then((res) => {
        this.setState({
          userCollections: res,
          isCreating: this.state.isCreating,
          collectionName: this.state.collectionName,
          category: this.state.category,
          question: this.state.question,
          answer: this.state.answer,
          cardList: this.state.cardList,
          cardCount: this.state.cardCount,
          flash: this.state.flash,
          currentCollection: this.state.currentCollection
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <MainMenuDiv>
      <>
        {
          !this.state.isCreating
          ?
          (
            <>
              {
                !this.state.flash
                ?
                (
                  <>
                    <MainMenuTitle><b><u>Main Menu</u></b></MainMenuTitle>
                    <CollectionsDiv>
                      <CollectionsTitle>
                        <b><u>Total Collections<CollCountSpan>{` (${this.state.userCollections.length})`}
                        </CollCountSpan>:</u></b>
                      </CollectionsTitle>
                      <UserCollectionsDiv>
                        {
                          // map over the collections
                          this.state.userCollections.length === 0
                          ?
                          (
                            <>
                              <span style={{fontFamily: 'Shadows Into Light'}}>You don't have any collections yet!</span>
                              <span style={{fontFamily: 'Shadows Into Light'}}>Click the button below to create a collection</span>
                            </>
                          )
                          :
                          (
                            this.state.userCollections.map((collection, index) => {
                              let collString = collection.name;
                              return (
                                <UserCollections key={index + collection.name} onClick={this.chooseCollection} id={collString}>
                                  {collection.name}
                                </UserCollections>
                              )
                            })
                          )
                        }
                      </UserCollectionsDiv>
                      <CreateCollectionButton onClick={this.createCollection}>
                        Create New Collection
                      </CreateCollectionButton>
                    </CollectionsDiv>
                  </>
                )
                :
                (
                  <FlashCards collectionName={this.state.collectionName} cardList={this.state.currentCollection} />
                )
              }
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
                <CollectionInput id="collectionName" style={{gridRow: '2'}} onChange={this.handleCollectionName} />
                <CollectionLabel style={{gridRow: '3'}}>
                  <b>Category:</b>
                </CollectionLabel>
                <CollectionInput id="category" style={{gridRow: '4'}} onChange={this.handleCategory} />
                <CollectionLabel style={{gridRow: '5'}}>
                  <b>Add Cards:</b>
                </CollectionLabel>
                <CardDiv style={{gridRow: '6'}}>
                  <CollectionLabel style={{gridRow: '1'}}>
                    <b>Question:</b>
                  </CollectionLabel>
                  <CollectionInput id="question" style={{gridRow: '2'}} onChange={this.handleQuestion} />
                  <CollectionLabel style={{gridRow: '3'}}>
                    <b>Answer:</b>
                  </CollectionLabel>
                  <CollectionInput id="answer" style={{gridRow: '4'}} onChange={this.handleAnswer} />
                  <AddCardButton style={{gridRow: '5'}} onClick={this.submitCard}>
                    <b>{`Add Card:`}</b>
                  </AddCardButton>
                  <TotalCardsSpan>
                    <b>{`Total Cards: ${this.state.cardCount}`}</b>
                  </TotalCardsSpan>
                </CardDiv>
                <FinishCollectionButton style={{gridRow: '7', gridColumn: '1'}} onClick={this.finishCollection}>
                  <b>Finish Collection</b>
                </FinishCollectionButton>
                <FinishCollectionButton style={{gridRow: '7', gridColumn: '2'}} onClick={this.goToMainMenu}>
                  <b>Back to Main Menu</b>
                </FinishCollectionButton>
              </NewCollectionDiv>
            </>
          )
        }
      </>
    </MainMenuDiv>
    )
  }
};

export default MainMenu2;