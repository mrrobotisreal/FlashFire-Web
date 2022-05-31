import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FlashCards from './FlashCards.jsx';
import TestModeEasy from './TestModeEasy.jsx';
import TestModeDifficult from './TestModeDifficult.jsx';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import FlashAudioRecorder from './FlashAudioRecorder.jsx';
// import ChooseModal from './ChooseModal.jsx';
const moment = require('moment');

const MainMenuDiv = styled.div`
  text-align: center;
  top: 0;
  left: 0;
  position: relative;
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
  padding: 6%;
  text-align: center;
  width: 95%;
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
    border-radius: 12px;
    color: red;
    transform: scale(1.25);
  }
`;

const TimeFormatDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px ridge white;
  border-radius: 12px;
  padding: 2%;
  margin: 2%;
  transition: .2s;
  &:hover {
    transform: scale(1.15);
    box-shadow: 4px 4px 6px red, 0 0 1em white, 0 0 0.2em white;
  }
`;

const ArrowDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2%;
`;

const UpButton = styled.button`
  width: fit-content;
  padding: 1%;
  background-color: black;
  transition: .2s;
  margin: 4%;
  border-radius: 8px;
  color: white;
  &:hover {
    transform: scale(1.15);
    box-shadow: 4px 4px 6px yellow, 0 0 1em white, 0 0 0.2em white;
    color: yellow;
  }
`;

const DownButton = styled.button`
  width: fit-content;
  padding: 1%;
  background-color: black;
  margin: 4%;
  transition: .2s;
  border-radius: 8px;
  color: white;
  &:hover {
    transform: scale(1.15);
    box-shadow: 4px 4px 6px yellow, 0 0 1em white, 0 0 0.2em white;
    color: yellow;
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
  border: 2px ridge green;
  border-radius: 12px;
  background-color: black;
  color: white;
  width: fit-content;
  transition: .2s;
  margin-top: 4%;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
    color: green;
    box-shadow: 4px 4px 6px green, 0 0 1em darkgreen, 0 0 0.2em darkgreen;
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

const CollectionTextArea = styled.textarea`
  background-color: darkgrey;
  color: white;
  text-align: left;
  margin-bottom: 2%;
  width: 90%;
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
  width: 80%;
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

const LogoutDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoutButton = styled.button`
  border: 2px ridge darkred;
  border-radius: 12px;
  background-color: black;
  color: white;
  width: fit-content;
  transition: .2s;
  margin-top: 4%;
  font-family: 'Bangers', cursive;
  &:hover {
    transform: scale(1.15);
    color: red;
    box-shadow: 4px 4px 6px red, 0 0 1em orangered, 0 0 0.2em orangered;
  }
`;

const AddImageInput = styled.input``;

const AddImageDiv = styled.div``;

const LastViewSpan = styled.span`
  font-family: 'Shadows Into Light';
  color: yellow;
`;

const ChooseDiv = styled.div`
  background-image: linear-gradient(to bottom, black, orangered, yellow);
  color: white;
  font-family: 'Luckiest Guy';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5%;
  &:focus {
    outline: none;
  }
`;

const ModesDiv = styled.div`
  width: 60%;
  border: 2px ridge darkred;
  border-radius: 12px;
  background-color: black;
  padding-bottom: 4%;
  margin-top: 2%;
`;

const ChooseTitle = styled.h1`
  margin-top: 2%;
  text-shadow: 6px 6px 8px red, 0 0 1em orange, 0 0 0.2em orange;
`;

const ModeTitles = styled.h3`
  margin-top: 5%;
  text-shadow: 6px 6px 8px red, 0 0 1em orange, 0 0 0.2em orange;
`;

const StartButtons = styled.button`
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

const ChoiceDivs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      selectedCollection: 0,
      lastView: '',
      photos: [],
      isChoosing: false,
      isEditing: false,
      isTesting: false,
      keyCount: 0,
      keyPressed: '',
      modesDisplayed: false,
      isDifficult: false,
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
    this.goBack = this.goBack.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.setPhotos = this.setPhotos.bind(this);
    this.setAudio = this.setAudio.bind(this);
    this.chooseStudyMode = this.chooseStudyMode.bind(this);
    this.chooseTestMode = this.chooseTestMode.bind(this);
    this.chooseEditMode = this.chooseEditMode.bind(this);
    this.handleFlashKeydown = this.handleFlashKeydown.bind(this);
  }

  componentDidMount() {
    axios.get(`/collections/${this.props.user}`)
      .then(({ data }) => {
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
            currentCollection: this.state.currentCollection,
            selectedCollection: this.state.selectedCollection,
            lastView: this.state.lastView,
            photos: this.state.photos,
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

  setPhotos(e) {
    if (e.target.files.length > 5) {
      alert('Please select up to 5 photos to upload');
      e.target.value = '';
      return;
    }

    this.setState({
      photos: [...e.target.files]
    });
  }

  setAudio(e) {
    this.setState({
      audio: e.target.files,
    })
  }

  chooseStudyMode() {
    this.setState({
      modesDisplayed: true,
      flash: true,
      isChoosing: false,
    });
  }

  chooseTestMode(difficulty) {
    if (difficulty === 'easy') {
      if (this.state.currentCollection.length < 4) {
        alert('You must have 4 or more cards in your collection to participate in Difficult mode.');
        return;
      }
      this.setState({
        modesDisplayed: true,
        isChoosing: false,
        isTesting: true,
      });
    } else {
      if (this.state.currentCollection.length < 6) {
        alert('You must have 6 or more cards in your collection to participate in Difficult mode.');
        return;
      }
      this.setState({
        modesDisplayed: true,
        isChoosing: false,
        isTesting: true,
        isDifficult: true,
      });
    }
  }

  chooseEditMode() {}

  chooseCollection(e) {
    this.setState({
      isChoosing: true,
    });

    let choice;
    let choiceName;
    let d = new Date();
    d = d.toString();

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
      // flash: true,
      currentCollection: choice,
      selectedCollection: this.state.selectedCollection,
      lastView: d,
      photos: this.state.photos
    });
    axios.post(`/collections/${this.props.user}/set-view-date`, {
      data: {
        lastView: d,
        collectionName: choiceName
      }
    })
      .then(({ data }) => {
      })
      .catch((err) => console.error(err));
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
      currentCollection: this.state.currentCollection,
      selectedCollection: this.state.selectedCollection,
      lastView: this.state.lastView,
      photos: this.state.photos
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
      currentCollection: this.state.currentCollection,
      selectedCollection: this.state.selectedCollection,
      lastView: this.state.lastView,
      photos: this.state.photos
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
      currentCollection: this.state.currentCollection,
      selectedCollection: this.state.selectedCollection,
      lastView: this.state.lastView,
      photos: this.state.photos
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
      currentCollection: this.state.currentCollection,
      selectedCollection: this.state.selectedCollection,
      lastView: this.state.lastView,
      photos: this.state.photos
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
      currentCollection: this.state.currentCollection,
      selectedCollection: this.state.selectedCollection,
      lastView: this.state.lastView,
      photos: this.state.photos
    });
  }

  submitCard() {
    let newCard;
    if (this.state.photos.length > 0) {
      const uploadURL = 'https://api.cloudinary.com/v1_1/dmb8pc511/image/upload';

      var data = new FormData();
      data.append('file', this.state.photos[0]);
      data.append('upload_preset', 'yoqsoi4s');

      axios.post(uploadURL, data)
        .then((response) => {
          newCard = {
            question: this.state.question,
            answer: this.state.answer,
            photo: response.data.url
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
            currentCollection: this.state.currentCollection,
            selectedCollection: this.state.selectedCollection,
            lastView: this.state.lastView,
            photos: []
          });
          document.getElementById('question').value = '';
          document.getElementById('answer').value = '';
        })
        .catch(err => console.log(err));
    } else {
      newCard = {
        question: this.state.question,
        answer: this.state.answer,
        photo: null
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
        currentCollection: this.state.currentCollection,
        selectedCollection: this.state.selectedCollection,
        lastView: this.state.lastView,
        photos: []
      });
      document.getElementById('question').value = '';
      document.getElementById('answer').value = '';
    }
  }

  finishCollection() {
    let d = new Date();
    d = d.toString();

    let newCollection = {
      name: this.state.collectionName,
      category: this.state.category,
      cardList: this.state.cardList,
      creationDate: d,
      lastView: d
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
          cardList: [],
          cardCount: 0,
          flash: this.state.flash,
          currentCollection: this.state.currentCollection,
          selectedCollection: this.state.selectedCollection,
          lastView: d,
          photos: this.state.photos
        });
        alert('Collection was added to your profile!');
        axios.get(`/collections/${this.props.user}`)
          .then(({ data }) => {
            console.log('res -> ', data);
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
              currentCollection: this.state.currentCollection,
              selectedCollection: this.state.selectedCollection,
              lastView: this.state.lastView,
              photos: this.state.photos
            })
          })
          .catch((err) => console.error(err));
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
      currentCollection: this.state.currentCollection,
      selectedCollection: this.state.selectedCollection,
      lastView: this.state.lastView,
      photos: this.state.photos
    });
  }

  goBack() {
    axios.get(`/collections/${this.props.user}`)
    .then(({ data }) => {
      this.setState({
        userCollections: data,
        isCreating: this.state.isCreating,
        collectionName: this.state.collectionName,
        category: this.state.category,
        question: this.state.question,
        answer: this.state.answer,
        cardList: this.state.cardList,
        cardCount: this.state.cardCount,
        modesDisplayed: false,
        flash: false,
        isChoosing: false,
        isEditing: false,
        isTesting: false,
        currentCollection: this.state.currentCollection,
        selectedCollection: this.state.selectedCollection,
        lastView: this.state.lastView,
        photos: this.state.photos
      });
    })
    .catch((err) => console.error(err));
  }

  moveUp() {
    if (this.state.selectedCollection  === 0) {
      this.setState({
        userCollections: this.state.userCollections,
        isCreating: this.state.isCreating,
        collectionName: this.state.collectionName,
        category: this.state.category,
        question: this.state.question,
        answer: this.state.answer,
        cardList: this.state.cardList,
        cardCount: this.state.cardCount,
        flash: this.state.flash,
        currentCollection: this.state.currentCollection,
        selectedCollection: this.state.userCollections.length - 1,
        lastView: this.state.lastView,
        photos: this.state.photos
      });
    } else {
      this.setState({
        userCollections: this.state.userCollections,
        isCreating: this.state.isCreating,
        collectionName: this.state.collectionName,
        category: this.state.category,
        question: this.state.question,
        answer: this.state.answer,
        cardList: this.state.cardList,
        cardCount: this.state.cardCount,
        flash: this.state.flash,
        currentCollection: this.state.currentCollection,
        selectedCollection: this.state.selectedCollection -= 1,
        lastView: this.state.lastView,
        photos: this.state.photos
      })
    }
  }

  moveDown() {
    if (this.state.selectedCollection === this.state.userCollections.length - 1) {
      this.setState({
        userCollections: this.state.userCollections,
        isCreating: this.state.isCreating,
        collectionName: this.state.collectionName,
        category: this.state.category,
        question: this.state.question,
        answer: this.state.answer,
        cardList: this.state.cardList,
        cardCount: this.state.cardCount,
        flash: this.state.flash,
        currentCollection: this.state.currentCollection,
        selectedCollection: 0,
        lastView: this.state.lastView,
        photos: this.state.photos
      });
    } else {
      this.setState({
        userCollections: this.state.userCollections,
        isCreating: this.state.isCreating,
        collectionName: this.state.collectionName,
        category: this.state.category,
        question: this.state.question,
        answer: this.state.answer,
        cardList: this.state.cardList,
        cardCount: this.state.cardCount,
        flash: this.state.flash,
        currentCollection: this.state.currentCollection,
        selectedCollection: this.state.selectedCollection += 1,
        lastView: this.state.lastView,
        photos: this.state.photos
      })
    }
  }

  handleFlashKeydown(key) {
    if (this.state.keyCount === 9) {
      this.setState({
        keyCount: 0,
      });
      return;
    } else {
      if (this.state.keyCount % 2 === 0) {
        this.setState({
          pressedKey: key,
          keyCount: this.state.keyCount += 1,
        });
      } else {
        this.setState({
          keyCount: this.state.keyCount += 1,
        })
        return;
      }
    }
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
                !this.state.modesDisplayed
                ?
                (
                  <>
                    <MainMenuTitle><b><u>Main Menu</u></b></MainMenuTitle>
                    <CollectionsDiv>
                      <CollectionsTitle>
                        <b><u>Total Collections<CollCountSpan>{` (${this.state.userCollections.length})`}
                        </CollCountSpan></u></b>
                      </CollectionsTitle>
                      <UserCollectionsDiv>
                        <ArrowDiv>
                          <UpButton onClick={this.moveUp}>{`⬆`}</UpButton>
                        </ArrowDiv>
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
                            <>
                              <TimeFormatDiv>
                                <UserCollections onClick={this.chooseCollection} id={this.state.userCollections[this.state.selectedCollection].name}>
                                  {
                                    `${this.state.selectedCollection + 1}. ${this.state.userCollections[this.state.selectedCollection].name}`
                                  }
                                </UserCollections>
                                <b><span style={{fontFamily: 'Shadows Into Light', color: 'yellow'}}>
                                      {`Created ${moment(this.state.userCollections[this.state.selectedCollection].creationDate, "dd MMM DD YYYY HH:mm:ss ZZ", "en").fromNow()}`}
                                </span></b>
                                <LastViewSpan>
                                  <b>{`Last Viewed ${moment(this.state.userCollections[this.state.selectedCollection].lastView, "dd MMM DD YYYY HH:mm:ss ZZ", "en").fromNow()}`}</b>
                                </LastViewSpan>
                              </TimeFormatDiv>
                              <Modal open={this.state.isChoosing}>
                                {/* <ChooseModal user={this.props.user} collectionName={this.state.collectionName} cardList={this.state.currentCollection} /> */}
                                <ChooseDiv>
                                  <ChooseTitle><u><b>Choose A Mode:</b></u></ChooseTitle>
                                  <ModesDiv style={{backgroundColor: 'black', border: '2px ridge darkred', borderRadius: '12px', width: '60%'}}>
                                    <ChoiceDivs style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                      <ModeTitles><b>Study Mode:</b></ModeTitles>
                                      <StartButtons onClick={this.chooseStudyMode}>Start</StartButtons>
                                    </ChoiceDivs>
                                    <ChoiceDivs style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                      <ModeTitles><b>Test Mode:</b></ModeTitles>
                                      <h4>Easy:</h4>
                                      <StartButtons onClick={() => this.chooseTestMode('easy')}>Start</StartButtons>
                                      <h4 style={{marginTop: '2%'}}>Difficult:</h4>
                                      <StartButtons onClick={() => this.chooseTestMode('difficult')}>Start</StartButtons>
                                    </ChoiceDivs>
                                    <ChoiceDivs style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                      <ModeTitles><b>Edit Mode:</b></ModeTitles>
                                      <StartButtons onClick={this.chooseEditMode}>Start</StartButtons>
                                    </ChoiceDivs>
                                  </ModesDiv>
                                  <LogoutButton onClick={this.goBack} style={{marginTop: '2%', padding: '1%'}}>
                                    Main Menu
                                  </LogoutButton>
                                </ChooseDiv>
                              </Modal>
                            </>
                          )
                        }
                        <ArrowDiv>
                          <DownButton onClick={this.moveDown}>{`⬇`}</DownButton>
                        </ArrowDiv>
                      </UserCollectionsDiv>
                      <CreateCollectionButton onClick={this.createCollection}>
                        Create New Collection
                      </CreateCollectionButton>
                    </CollectionsDiv>
                    <LogoutDiv>
                      <LogoutButton onClick={this.props.logout}>
                        Logout
                      </LogoutButton>
                    </LogoutDiv>
                  </>
                )
                :
                (
                  !this.state.isEditing
                  ?
                  (
                    !this.state.isTesting
                    ?
                    (
                      <FlashCards collectionName={this.state.collectionName} cardList={this.state.currentCollection} goBack={this.goBack} user={this.props.user} keydown={this.handleFlashKeydown} pressedKey={this.state.pressedKey} />
                    )
                    :
                    (
                      !this.state.isDifficult
                      ?
                      (
                        // easy test goes here
                        <TestModeEasy collectionName={this.state.collectionName} cardList={this.state.currentCollection} isDifficult={this.state.isDifficult} user={this.props.user} goBack={this.goBack} keydown={this.handleFlashKeydown} pressedKey={this.state.pressedKey} />
                      )
                      : (
                        // difficult test goes here
                        <TestModeDifficult collectionName={this.state.collectionName} cardList={this.state.currentCollection} isDifficult={this.state.isDifficult} user={this.props.user} goBack={this.goBack} keydown={this.handleFlashKeydown} pressedKey={this.state.pressedKey} />
                      )
                    )
                  )
                  :
                  (
                    // editing goes here
                    null
                  )
                  // <FlashCards collectionName={this.state.collectionName} cardList={this.state.currentCollection} goBack={this.goBack} user={this.props.user} keydown={this.handleFlashKeydown} pressedKey={this.state.pressedKey} />
                )
              }
            </>
          )
          :
          (
            <>
              <CreateCollectionsTitle style={{fontFamily: 'Luckiest Guy'}}>
                <b><u>Create Collection</u></b>
              </CreateCollectionsTitle>
              <NewCollectionDiv style={{fontFamily: 'Luckiest Guy'}}>
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
                  {/* <FlashAudioRecorder /> */}
                  <AddImageDiv>
                    <CollectionLabel>
                      <b>Add an image?</b>
                    </CollectionLabel>
                    <AddImageInput type="file" accept=".jpg, .png" id="image-input" onChange={this.setPhotos} style={{overflowWrap: 'break-word'}} />
                    {/* <CollectionLabel>
                      <b>Add audio?</b>
                    </CollectionLabel>
                    <input type="file" accept=".m4a" id="audio-input" onChange={this.setAudio} /> */}
                  </AddImageDiv>
                  <CollectionLabel style={{gridRow: '1'}}>
                    <b>Question:</b>
                  </CollectionLabel>
                  <CollectionTextArea type="text" id="question" style={{gridRow: '2'}} onChange={this.handleQuestion} />
                  <CollectionLabel style={{gridRow: '3'}}>
                    <b>Answer:</b>
                  </CollectionLabel>
                  <CollectionTextArea type="text" id="answer" style={{gridRow: '4'}} onChange={this.handleAnswer} />
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