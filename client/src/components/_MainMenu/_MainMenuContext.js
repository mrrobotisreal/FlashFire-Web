import React, { createContext, useState } from 'react';
import axios from 'axios';

export const _MainMenuContext = createContext(null);

export function _MainMenuContextProvider({ children }) {
  const [userCollections, setUserCollections] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [category, setCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [cardList, setCardList] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [flash, setFlash] = useState(false);
  const [currentCollection, setCurrentCollection] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(0);
  const [lastView, setLastView] = useState('');
  const [lastViewEasy, setLastViewEasy] = useState('');
  const [lastViewDifficult, setLastViewDifficult] = useState('');
  const [lastViewStudy, setLastViewStudy] = useState('');
  const [photos, _setPhotos] = useState([]);
  const [audio, _setAudio] = useState([]);
  const [isChoosing, setIsChoosing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isViewingCollectionStats, setIsViewingCollectionStats] = useState(false);
  const [isViewingOverallStats, setIsViewingOverallStats] = useState(false);
  const [keyCount, setKeyCount] = useState(0);
  const [keyPressed, setKeyPressed] = useState('');
  const [modesDisplayed, setModesDisplayed] = useState(false);
  const [isDifficult, setIsDifficult] = useState(false);
  const [highScoreStudy, setHighScoreStudy] = useState(0);
  const [highGradeEasy, setHighGradeEasy] = useState(0);
  const [highGradeDifficult, setHighGradeDifficult] = useState(0);
  const [recentScoreStudy, setRecentScoreStudy] = useState(0);
  const [recentScoreEasy, setRecentScoreEasy] = useState(0);
  const [recentScoreDifficult, setRecentScoreDifficult] = useState(0);
  const [totalScoresStudy, setTotalScoresStudy] = useState([]);
  const [totalScoresEasy, setTotalScoresEasy] = useState([]);
  const [totalScoresDifficult, setTotalScoresDifficult] = useState([]);
  const [tooltipUp, setTooltipUp] = useState(0);
  const [tooltipDown, setTooltipDown] = useState(0);
  const [settingsAreOpen, setSettingsAreOpen] = useState(false);

  const setPhotos = (e) => {
    if (e.target.files.length > 5) {
      alert('Please select up to 5 photos to upload');
      e.target.value = '';
      return;
    }
    _setPhotos(prevState => [prevState, ...e.target.files]);
  };

  const setAudio = (e) => {
    _setAudio(prevState => e.target.files);
  };

  const viewCollectionStats = () => {
    axios.get(`/collections/${this.props.user}/scores/${userCollections[selectedCollection].name}`)/* ^ don't forget this context (this.props.user) */
    .then(({ data }) => {
      setTotalScoresStudy(prevState => data.totalScores);
      setTotalScoresEasy(prevState => data.totalGradesEasy);
      setTotalScoresDifficult(prevState => data.totalGradesDifficult);
      setIsViewingCollectionStats(prevState => true);
    })
    .catch((err) => console.error(err));
  };

  const closeCollectionStats = () => {
    setIsViewingCollectionStats(prevState => false);
  };

  const chooseStudyMode = () => {
    setModesDisplayed(prevState => true);
    setFlash(prevState => true);
    setIsChoosing(prevState => false);
  };

  const chooseTestMode = (difficulty) => {
    if (difficulty === 'easy') {
      if (currentCollection.length < 4) {
        alert('You must have 4 or more cards in your collection to participate in Difficult mode.');
        return;
      }
      setModesDisplayed(prevState => true);
      setIsChoosing(prevState => false);
      setIsTesting(prevState => true);
      setIsDifficult(prevState => false);
    } else {
      if (currentCollection.length < 6) {
        alert('You must have 6 or more cards in your collection to participate in Difficult mode.');
        return;
      }
      setModesDisplayed(prevState => true);
      setIsChoosing(prevState => false);
      setIsTesting(prevState => true);
      setIsDifficult(prevState => true);
    }
  };

  const chooseEditMode = () => {
    setModesDisplayed(prevState => true);
    setIsChoosing(prevState => false);
    setIsEditing(prevState => true);
  };

  const chooseCollection = (e) => {
    setIsChoosing(prevState => true);

    let choice;
    let choiceName;
    let d = new Date();
    d = d.toString();

    for (let i = 0; i < userCollections.length; i++) {
      if (userCollections[i].name === e.target.id) {
        choice = userCollections[i].cardList;
        choiceName = userCollections[i].name;
      }
    }
    setCollectionName(prevState => choiceName);
    setCurrentCollection(prevState => choice);
    setLastView(prevState => d);
    axios.post(`/collections/${this.props.user}/set-view-date`, {
      data: {
        lastView: d,
        collectionName: choiceName
      }
    })/* <- don't forget this context (this.props.user) */
      .then(({ data }) => {
      })
      .catch((err) => console.error(err));
  };

  const createCollection = () => {
    setIsCreating(prevState => true);
  };

  const handleCollectionName = (e) => {
    setCollectionName(prevState => e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(prevState => e.target.value);
  };

  const handleQuestion = (e) => {
    setQuestion(prevState => e.target.value);
  };

  const handleAnswer = (e) => {
    setAnswer(prevState => e.target.value);
  };

  const submitCard = () => {
    let newCard;
    if (photos.length > 0) {
      const uploadURL = 'https://api.cloudinary.com/v1_1/dmb8pc511/image/upload';

      var data = new FormData();
      data.append('file', photos[0]);
      data.append('upload_preset', 'yoqsoi4s');

      axios.post(uploadURL, data)
        .then((response) => {
          newCard = {
            question: question,
            answer: answer,
            photo: response.data.url
          };
          let newCount = cardCount + 1;
          this.setState({
            question: '',
            answer: '',
            cardList: [newCard, ...cardList],
            cardCount: newCount,
            photos: []
          });
          document.getElementById('question').value = '';
          document.getElementById('answer').value = '';
        })
        .catch(err => console.log(err));
    } else {
      newCard = {
        question: question,
        answer: answer,
        photo: null
      };
      let newCount = cardCount + 1;
      this.setState({
        question: '',
        answer: '',
        cardList: [newCard, ...cardList],
        cardCount: newCount,
        photos: []
      });
      document.getElementById('question').value = '';
      document.getElementById('answer').value = '';
    }
  };

  const finishCollection = () => {
    let d = new Date();
    d = d.toString();

    let newCollection = {
      name: collectionName,
      category: category,
      cardList: cardList,
      creationDate: d,
      lastView: d
    };
    axios.post(`/collections/${this.props.user}/add`, newCollection)/* <- don't forget this context (this.props.user) */
      .then((res) => {
        console.log('New collection created!');
        setIsCreating(prevState => false);
        setCardList(prevState => []);
        setCardCount(prevState => 0);
        setLastView(prevState => d);
        updateTooltips();
        alert('Collection was added to your profile!');
        axios.get(`/collections/${this.props.user}`)/* <- don't forget this context (this.props.user) */
          .then(({ data }) => {
            console.log('res -> ', data);
            setUserCollections(prevState => data);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const goToMainMenu = () => {
    setIsCreating(prevState => false);
  };

  const goBack = () => {
    axios.get(`/collections/${this.props.user}`)/* <- don't forget this context (this.props.user) */
      .then(({ data }) => {
        setUserCollections(prevState => data);
        setModesDisplayed(prevState => false);
        setFlash(prevState => false);
        setIsChoosing(prevState => false);
        setIsEditing(prevState => false);
        setIsTesting(prevState => false);
        setSettingsAreOpen(prevState => false);
        setLastViewStudy(prevState => data[selectedCollection].lastViewStudy);
        setLastViewEasy(prevState => data[selectedCollection].lastViewEasy);
        setLastViewDifficult(prevState => data[selectedCollection].lastViewDifficult);
        setTotalScoresStudy(prevState => data[selectedCollection].totalScores);
        setTotalScoresEasy(prevState => data[selectedCollection].totalGradesEasy);
        setTotalScoresDifficult(prevState => data[selectedCollection].totalGradesDifficult);
      })
      .catch((err) => console.error(err));
  };

  const moveUp = () => {
    if (selectedCollection  === 0) {
      axios.get(`/collections/${this.props.user}/scores/${userCollections[userCollections.length - 1].name}`)/* ^ don't forget this context (this.props.user) */
      .then(({ data }) => {
        setTotalScoresStudy(prevState => data.totalScores);
        setTotalScoresEasy(prevState => data.totalGradesEasy);
        setTotalScoresDifficult(prevState => data.totalGradesDifficult);
        setSelectedCollection(prevState => userCollections.length - 1);
        setCollectionName(prevState => userCollections[userCollections.length - 1].name);
      })
      .catch((err) => console.error(err));
      // this.setState({
      //   selectedCollection: this.state.userCollections.length - 1,
      //   collectionName: this.state.userCollections[this.state.userCollections.length - 1].name,
      // });
      setTimeout(() => {
        updateTooltips();
      }, 150);
    } else {
      axios.get(`/collections/${this.props.user}/scores/${userCollections[selectedCollection - 1].name}`)/* ^ don't forget this context (this.props.user) */
      .then(({ data }) => {
        setTotalScoresStudy(prevState => data.totalScores);
        setTotalScoresEasy(prevState => data.totalGradesEasy);
        setTotalScoresDifficult(prevState => data.totalGradesDifficult);
        setSelectedCollection(prevState => selectedCollection - 1);
        setCollectionName(prevState => userCollections[selectedCollection - 1].name);
      })
      .catch((err) => console.error(err));
      // this.setState({
      //   selectedCollection: this.state.selectedCollection - 1,
      //   collectionName: this.state.userCollections[this.state.selectedCollection - 1].name,
      // });
      setTimeout(() => {
        updateTooltips();
      }, 150);
    }
  };

  const moveDown = () => {
    if (selectedCollection === userCollections.length - 1) {
      axios.get(`/collections/${this.props.user}/scores/${userCollections[0].name}`)/* <- don't forget this context (this.props.user) */
      .then(({ data }) => {
        setTotalScoresStudy(prevState => data.totalScores);
        setTotalScoresEasy(prevState => data.totalGradesEasy);
        setTotalScoresDifficult(prevState => data.totalGradesDifficult);
        setSelectedCollection(prevState => 0);
        setCollectionName(prevState => userCollections[0].name);
      })
      .catch((err) => console.error(err));
      // this.setState({
      //   selectedCollection: 0,
      //   collectionName: this.state.userCollections[0].name,
      // });
      setTimeout(() => {
        updateTooltips();
      }, 150);
    } else {
      axios.get(`/collections/${this.props.user}/scores/${userCollections[selectedCollection + 1].name}`)/* ^ don't forget this context (this.props.user) */
      .then(({ data }) => {
        setTotalScoresStudy(prevState => data.totalScores);
        setTotalScoresEasy(prevState => data.totalGradesEasy);
        setTotalScoresDifficult(prevState => data.totalGradesDifficult);
        setSelectedCollection(prevState => selectedCollection + 1);
        setCollectionName(prevState => userCollections[selectedCollection + 1].name);
      })
      .catch((err) => console.error(err));
      // this.setState({
      //   selectedCollection: this.state.selectedCollection + 1,
      //   collectionName: this.state.userCollections[this.state.selectedCollection + 1].name,
      // });
      setTimeout(() => {
        updateTooltips();
      }, 150);
    }
  };

  const updateTooltips = () => {
    if (userCollections.length > 2) {
      if (selectedCollection === 0) {
        setTooltipUp(prevState => userCollections.length - 1);
        setTooltipDown(prevState => selectedCollection + 1);
      } else if (selectedCollection === userCollections.length - 1) {
        this.setState({
          tooltipUp: this.state.selectedCollection - 1,
          tooltipDown: 0,
        });
        setTooltipUp(prevState => selectedCollection - 1);
        setTooltipDown(prevState => 0);
      } else {
        this.setState({
          tooltipUp: this.state.selectedCollection - 1,
          tooltipDown: this.state.selectedCollection + 1,
        });
        setTooltipUp(prevState => selectedCollection - 1);
        setTooltipDown(prevState => selectedCollection + 1);
      }
    } else if (userCollections.length === 2) {
      if (selectedCollection === 0) {
        setTooltipUp(prevState => 1);
        setTooltipDown(prevState => 1);
      } else {
        setTooltipUp(prevState => 0);
        setTooltipDown(prevState => 0);
      }
    } else {
      return;
    }
  };

  const handleFlashKeydown = (key) => {
    if (keyCount === 9) {
      setKeyCount(prevState => 0);
      return;
    } else {
      if (keyCount % 2 === 0) {
        setKeyPressed(prevState => key);
        setKeyCount(prevState => keyCount += 1);
      } else {
        setKeyCount(prevState => keyCount += 1);
        return;
      }
    }
  };

  const openSettings = () => {
    setSettingsAreOpen(prevState => true);
  };

  const viewOverallStats = () => {};

  const value = {
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
  };

  return (
    <_MainMenuContext.Provider value={value}>{ children }</_MainMenuContext.Provider>
  );
};
