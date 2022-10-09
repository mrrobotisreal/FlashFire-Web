import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FlashCards from './FlashCards.jsx';
import TestModeEasy from './TestModeEasy.jsx';
import TestModeDifficult from './TestModeDifficult.jsx';
// import CollectionStats from './CollectionStats.jsx';
import StudyStats from './StudyStats.jsx';
import EasyStats from './EasyStats.jsx';
import DifficultStats from './DifficultStats.jsx';
import EditMode from './EditMode.jsx';
import Settings from './Settings.jsx';
import './MainMenu2.css';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  MainMenuDiv,
  MainMenuTitle,
  CollectionsDiv,
  UserCollectionsDiv,
  UserCollections,
  TimeFormatDiv,
  ArrowDiv,
  UpButton,
  DownButton,
  CollectionsTitle,
  CreateCollectionButton,
  CreateCollectiosTitle,
  NewCollectionDiv,
  CollectionLabel,
  CollectionInput,
  CollectionTextArea,
  CardDiv,
  AddCardButton,
  TotalCardsSpan,
  FinishCollectionButton,
  CollCountSpan,
  LogoutDiv,
  LogoutButton,
  AddImageInput,
  AddImageDiv,
  LastViewSpan,
  ChooseDiv,
  ModesDiv,
  ChooseTitle,
  ModeTitles,
  StartButtons,
  ChoiceDivs,
  HighScoreDiv,
  ModalButton,
  ButtonDiv
} from './MainMenu2/MainMenu2StyledComponents.js';
import { _MainMenuContextProvider, _MainMenuContext } from './_MainMenu/_MainMenuContext.js';
const moment = require('moment');

export default function _MainMenu() {
  const {
    userCollections,
    setUserCollections,
    isCreating,
    setIsCreating,
    collectionName,
    setCollectionName,
    category,
    setCategory,
    question,
    setQuestion,
    answer,
    setAnswer,
    cardList,
    setCardList,
    cardCount,
    setCardCount,
    flash,
    setFlash,
    currentCollection,
    setCurrentCollection,
    selectedCollection,
    setSelectedCollection,
    lastView,
    setLastView,
    lastViewEasy,
    setLastViewEasy,
    lastViewDifficult,
    setLastViewDifficult,
    lastViewStudy,
    setLastViewStudy,
    photos,
    _setPhotos,
    audio,
    _setAudio,
    isChoosing,
    setIsChoosing,
    isEditing,
    setIsEditing,
    isTesting,
    setIsTesting,
    isViewingCollectionStats,
    setIsViewingCollectionStats,
    isViewingOverallStats,
    setIsViewingOverallStats,
    keyCount,
    setKeyCount,
    keyPressed,
    setKeyPressed,
    modesDisplayed,
    setModesDisplayed,
    isDifficult,
    setIsDifficult,
    highScoreStudy,
    setHighScoreStudy,
    highGradeEasy,
    setHighGradeEasy,
    highGradeDifficult,
    setHighGradeDifficult,
    recentScoreStudy,
    setRecentScoreStudy,
    recentScoreEasy,
    setRecentScoreEasy,
    recentScoreDifficult,
    setRecentScoreDifficult,
    totalScoresStudy,
    setTotalScoresStudy,
    totalScoresEasy,
    setTotalScoresEasy,
    totalScoresDifficult,
    setTotalScoresDifficult,
    tooltipUp,
    setTooltipUp,
    tooltipDown,
    setTooltipDown,
    settingsAreOpen,
    setSettingsAreOpen,
    setPhotos,
    setAudio,
    viewCollectionStats,
    closeCollectionStats,
    chooseStudyMode,
    chooseTestMode,
    chooseEditMode,
    chooseCollection,
    createCollection,
    handleCollectionName,
    handleCategory,
    handleQuestion,
    handleAnswer,
    submitCard,
    finishCollection,
    goToMainMenu,
    goBack,
    moveUp,
    moveDown,
    updateTooltips,
    handleFlashKeydown,
    openSettings,
    viewOverallStats
  } = useContext(_MainMenuContext);

  return (
    <_MainMenuContextProvider>
      <MainMenuDiv>
        <>
          {
            !isCreating
            ?
            (
              <>
                {
                  !modesDisplayed
                  ?
                  (
                    <>
                      <MainMenuTitle><b><u>Main Menu</u></b></MainMenuTitle>
                      <CollectionsDiv>
                        <CollectionsTitle>
                          <b><u>Total Collections<CollCountSpan>{` (${userCollections.length})`}
                          </CollCountSpan></u></b>
                        </CollectionsTitle>
                        <UserCollectionsDiv>
                          <ArrowDiv className="tooltipUp">
                            <span className="tooltipTextUp">
                              {
                                userCollections.length === 0
                                ?
                                'Empty'
                                :
                                userCollections[tooltipUp].name
                              }
                            </span>
                            <UpButton onClick={moveUp}>{`⬆`}</UpButton>
                          </ArrowDiv>
                          {
                            // map over the collections
                            userCollections.length === 0
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
                                  <UserCollections className="collection tooltipUp" onClick={chooseCollection} id={userCollections[selectedCollection].name}>
                                  <span className="tooltipTextUp">
                                    {
                                      userCollections.length === 0
                                      ?
                                      'Empty'
                                      :
                                      `${userCollections[selectedCollection].cardList.length} cards`
                                    }
                                  </span>
                                    {
                                      `${selectedCollection + 1}. ${userCollections[selectedCollection].name}`
                                    }
                                  </UserCollections>
                                  <b><span style={{fontFamily: 'Shadows Into Light', color: 'yellow'}}>
                                        {`Created ${moment(userCollections[selectedCollection].creationDate, "dd MMM DD YYYY HH:mm:ss ZZ", "en").fromNow()}`}
                                  </span></b>
                                  <LastViewSpan>
                                    <b>{`Last Viewed ${moment(userCollections[selectedCollection].lastView, "dd MMM DD YYYY HH:mm:ss ZZ", "en").fromNow()}`}</b>
                                  </LastViewSpan>
                                </TimeFormatDiv>
                                <Modal open={isChoosing}>
                                  <ChooseDiv>
                                    <ChooseTitle><u><b>Choose A Mode:</b></u></ChooseTitle>
                                    <ModesDiv style={{backgroundColor: 'black', border: '2px ridge darkred', borderRadius: '12px', width: '60%'}}>
                                      <ChoiceDivs style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <ModeTitles><b>Study Mode:</b></ModeTitles>
                                        <LastViewSpan>
                                          {/* <b>{`Last Studied ${moment(this.state.userCollections[this.state.selectedCollection].lastViewStudy, "dd MMM DD YYYY HH:mm:ss ZZ", "en").fromNow()}`}</b> */}
                                          {
                                            lastViewStudy === '' || lastViewStudy === undefined
                                            ?
                                            (
                                              <b>{'Have Not Studied Yet'}</b>
                                            )
                                            :
                                            (
                                              <b>{`Last Studied ${moment(userCollections[selectedCollection].lastViewStudy, "dd MMM DD YYYY HH:mm:ss ZZ", "en").fromNow()}`}</b>
                                            )
                                          }
                                        </LastViewSpan>
                                        <StartButtons onClick={chooseStudyMode}>Start</StartButtons>
                                      </ChoiceDivs>
                                      <ChoiceDivs style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <ModeTitles><b>Test Mode:</b></ModeTitles>
                                        <LastViewSpan>
                                          {/* <b>{`Last Tested (Easy) ${moment(this.state.userCollections[this.state.selectedCollection].lastViewEasy, "dd MMM DD YYYY HH:mm:ss ZZ", "en").fromNow()}`}</b> */}
                                          {
                                            lastViewEasy === '' || lastViewEasy === undefined
                                            ?
                                            (
                                              <b>{'Have Not Tested (Easy) Yet'}</b>
                                            )
                                            :
                                            (
                                              <b>{`Last Tested (Easy) ${moment(userCollections[selectedCollection].lastViewEasy, "dd MMM DD YYYY HH:mm:ss ZZ", "en").fromNow()}`}</b>
                                            )
                                          }
                                        </LastViewSpan>
                                        <h4>Easy:</h4>
                                        <StartButtons onClick={() => this.chooseTestMode('easy')}>Start</StartButtons>
                                        <h4 style={{marginTop: '2%'}}>Difficult:</h4>
                                        <LastViewSpan>
                                          {/* <b>{`Last Tested (Difficult) ${moment(this.state.userCollections[this.state.selectedCollection].lastViewDifficult, "dd MMM DD YYYY HH:mm:ss ZZ", "en").fromNow()}`}</b> */}
                                          {
                                            lastViewDifficult === '' || lastViewDifficult === undefined
                                            ?
                                            (
                                              <b>{'Have Not Tested (Difficult) Yet'}</b>
                                            )
                                            :
                                            (
                                              <b>{`Last Tested (Difficult) ${moment(userCollections[selectedCollection].lastViewDifficult, "dd MMM DD YYYY HH:mm:ss ZZ", "en").fromNow()}`}</b>
                                            )
                                          }
                                        </LastViewSpan>
                                        <StartButtons onClick={() => chooseTestMode('difficult')}>Start</StartButtons>
                                      </ChoiceDivs>
                                      <ChoiceDivs style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <ModeTitles><b>Edit Mode:</b></ModeTitles>
                                        <StartButtons onClick={chooseEditMode}>Start</StartButtons>
                                      </ChoiceDivs>
                                    </ModesDiv>
                                    <LogoutButton onClick={goBack} style={{marginTop: '2%', padding: '1%'}}>
                                      Main Menu
                                    </LogoutButton>
                                  </ChooseDiv>
                                </Modal>
                              </>
                            )
                          }
                          <ArrowDiv className="tooltipDown">
                            <span className="tooltipTextDown">
                              {
                                userCollections.length === 0
                                ?
                                'Empty'
                                :
                                userCollections[tooltipDown].name
                              }
                            </span>
                            <DownButton onClick={moveDown}>{`⬇`}</DownButton>
                          </ArrowDiv>
                        </UserCollectionsDiv>
                        <ButtonDiv>
                          <CreateCollectionButton onClick={viewCollectionStats}>
                            {`View ${state.collectionName} Stats`}
                          </CreateCollectionButton>
                          <CreateCollectionButton onClick={viewOverallStats}>
                            View Overall Stats
                          </CreateCollectionButton>
                          <CreateCollectionButton onClick={createCollection}>
                            Create New Collection
                          </CreateCollectionButton>
                          <CreateCollectionButton onClick={openSettings}>
                          ⚙️-Settings-⚙️
                          </CreateCollectionButton>
                          <Modal open={isViewingCollectionStats}>
                            <HighScoreDiv style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'none', backgroundImage: 'linear-gradient(to bottom, black, orangered, yellow)'}}>
                              <ModalButton onClick={closeCollectionStats}>X</ModalButton>
                              <h1><u>{`${this.props.user}'s Stats for ${collectionName}`}</u></h1>
                              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '4%'}}>
                                <h3 style={{marginTop: '1%'}}>
                                  {`Study Scores`}
                                </h3>
                                <hr />
                                <div style={{width: '20%', height: '14%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <StudyStats totalScoresStudy={totalScoresStudy} />
                                </div>
                                <h3>
                                  {`Test Grades (Easy)`}
                                </h3>
                                <hr />
                                <div style={{width: '20%', height: '14%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <EasyStats totalScoresEasy={totalScoresEasy} />
                                </div>
                                <h3>
                                  {`Test Grades (Difficult)`}
                                </h3>
                                <hr />
                                <div style={{width: '20%', height: '14%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <DifficultStats totalScoresDifficult={totalScoresDifficult} />
                                </div>
                              </div>
                            </HighScoreDiv>
                          </Modal>
                          <Modal open={isViewingOverallStats}>
                            <HighScoreDiv style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'none', backgroundImage: 'linear-gradient(to bottom, black, orangered, yellow)'}}>
                            </HighScoreDiv>
                          </Modal>
                          <Modal open={settingsAreOpen}>
                            <HighScoreDiv style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: 'none', backgroundImage: 'linear-gradient(to bottom, black, orangered, yellow)'}}>
                              <Settings goBack={goBack} />
                            </HighScoreDiv>
                          </Modal>
                        </ButtonDiv>
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
                    !isEditing
                    ?
                    (
                      !isTesting
                      ?
                      (
                        <FlashCards collectionName={collectionName} cardList={currentCollection} goBack={goBack} user={this.props.user} keydown={handleFlashKeydown} pressedKey={pressedKey} />
                      )
                      :
                      (
                        !isDifficult
                        ?
                        (
                          // easy test goes here
                          <TestModeEasy collectionName={collectionName} cardList={currentCollection} isDifficult={isDifficult} user={this.props.user} goBack={goBack} keydown={handleFlashKeydown} pressedKey={pressedKey} />
                        )
                        : (
                          // difficult test goes here
                          <TestModeDifficult collectionName={collectionName} cardList={currentCollection} isDifficult={isDifficult} user={this.props.user} goBack={goBack} keydown={handleFlashKeydown} pressedKey={pressedKey} />
                        )
                      )
                    )
                    :
                    (
                      // editing goes here
                      <EditMode collectionName={collectionName} cardList={currentCollection} isDifficult={isDifficult} user={this.props.user} goBack={goBack} keydown={handleFlashKeydown} pressedKey={pressedKey} />
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
                  <CollectionInput id="collectionName" style={{gridRow: '2'}} onChange={handleCollectionName} />
                  <CollectionLabel style={{gridRow: '3'}}>
                    <b>Category:</b>
                  </CollectionLabel>
                  <CollectionInput id="category" style={{gridRow: '4'}} onChange={handleCategory} />
                  <CollectionLabel style={{gridRow: '5'}}>
                    <b>Add Cards:</b>
                  </CollectionLabel>
                  <CardDiv style={{gridRow: '6'}}>
                    {/* <FlashAudioRecorder /> */}
                    <AddImageDiv>
                      <CollectionLabel>
                        <b>Add an image?</b>
                      </CollectionLabel>
                      <AddImageInput type="file" accept=".jpg, .png" id="image-input" onChange={setPhotos} style={{overflowWrap: 'break-word'}} />
                      {/* <CollectionLabel>
                        <b>Add audio?</b>
                      </CollectionLabel>
                      <input type="file" accept=".m4a" id="audio-input" onChange={this.setAudio} /> */}
                    </AddImageDiv>
                    <CollectionLabel style={{gridRow: '1'}}>
                      <b>Question:</b>
                    </CollectionLabel>
                    <CollectionTextArea type="text" id="question" style={{gridRow: '2'}} onChange={handleQuestion} />
                    <CollectionLabel style={{gridRow: '3'}}>
                      <b>Answer:</b>
                    </CollectionLabel>
                    <CollectionTextArea type="text" id="answer" style={{gridRow: '4'}} onChange={handleAnswer} />
                    <AddCardButton style={{gridRow: '5'}} onClick={submitCard}>
                      <b>{`Add Card:`}</b>
                    </AddCardButton>
                    <TotalCardsSpan>
                      <b>{`Total Cards: ${cardCount}`}</b>
                    </TotalCardsSpan>
                  </CardDiv>
                  <FinishCollectionButton style={{gridRow: '7', gridColumn: '1'}} onClick={finishCollection}>
                    <b>Finish Collection</b>
                  </FinishCollectionButton>
                  <FinishCollectionButton style={{gridRow: '7', gridColumn: '2'}} onClick={goToMainMenu}>
                    <b>Back to Main Menu</b>
                  </FinishCollectionButton>
                </NewCollectionDiv>
              </>
            )
          }
        </>
      </MainMenuDiv>
    </_MainMenuContextProvider>
  );
};

class MainMenu2 extends React.Component {
  componentDidMount() {
    axios.get(`/collections/${this.props.user}`)
      .then(({ data }) => {
        if (data.length !== 0) {
          this.setState({
            userCollections: data,
            lastViewStudy: data[0].lastViewStudy,
            lastViewEasy: data[0].lastViewEasy,
            lastViewDifficult: data[0].lastViewDifficult,
            highScoreStudy: data[0].highScore,
            highGradeEasy: data[0].highGradeEasy,
            highGradeDifficult: data[0].highGradeDifficult,
            recentScoreStudy: data[0].mostRecentScore,
            recentScoreEasy: data[0].mostRecentGradeEasy,
            recentScoreDifficult: data[0].mostRecentGradeDifficult,
            totalScoresStudy: data[0].totalScores,
            totalScoresEasy: data[0].totalGradesEasy,
            totalScoresDifficult: data[0].totalGradesDifficult,
            collectionName: data[0].name,
            tooltipUp: data.length - 1,
            tooltipDown: (
              data.length === 1
              ?
              data.length - 1
              :
              1
            ),
          });
          this.updateTooltips();
          // console.log('data testing -> ', data[0])
          // if ((data[0].lastViewEasy || data[0].lastViewDifficult) || data[0].lastViewStudy) {
          //   this.setState({
          //     userCollections: data,
          //     lastViewStudy: data[0].lastViewStudy,
          //     lastViewEasy: data[0].lastViewEasy,
          //     lastViewDifficult: data[0].lastViewDifficult,
          //   });
          // } else {
          //   this.setState({
          //     userCollections: data,
          //     lastViewStudy: 'Have Not Studied',
          //     lastViewEasy: 'Have Not Tested (Easy)',
          //     lastViewDifficult: 'Have Not Tested (Difficult)',
          //   });
          // }
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
};
