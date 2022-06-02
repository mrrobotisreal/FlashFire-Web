const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/flash-fire-webapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const { Schema } = mongoose;
const crypto = require('crypto');

const cardSchema = new Schema({
  question: String,
  answer: String
})
const cardListSchema = new Schema({
  name: String,
  category: String,
  cardList: [],
  creationDate: String,
  lastView: String,
  lastViewStudy: String,
  mostRecentScore: Number,
  totalScores: [],
  highScore: Number,
  lastViewEasy: String,
  mostRecentGradeEasy: Number,
  totalGradesEasy: [],
  highGradeEasy: Number,
  lastViewDifficult: String,
  mostRecentGradeDifficult: Number,
  totalGradesDifficult: [],
  highGradeDifficult: Number
});
const userSchema = new Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  collections: []
});

const Card = mongoose.model('Card', cardSchema);
const CardList = mongoose.model('CardList', cardListSchema);
const User = mongoose.model('User', userSchema);

const saveCollection = (newColl, user, cb = () => {}) => {
  console.log('newColl cardList be like -> ', newColl.cardList);
  console.log('user be like -> ', user);
  let collection = new CardList({
    name: newColl.name,
    category: newColl.category,
    cardList: newColl.cardList,
    creationDate: newColl.creationDate,
    lastView: newColl.lastView
  });
  let oldColl = User.findOne({'username': user});
  oldColl.exec((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      let newCollections = doc.collections;
      newCollections.push(collection);
      newCollections = newCollections;
      let updatedUser = User.findOneAndUpdate({'username': user}, {'collections': newCollections}, {new: true});
      updatedUser.exec((err, doc) => {
        if (err) {
          console.error(err);
        } else {
          console.log('successfully updated collections!');
          cb(null, doc);
        }
      });
    }
  });
};

 const setViewDate = (user, collection, cb = () => {}) => {
  let dis = User.findOne({'username': user});
  dis.exec((err, doc) => {
    let colls = doc.collections.slice();
    let updatedCollection;
    for (let i = 0; i < doc.collections.length; i++) {
      if (doc.collections[i].name === collection) {
        updatedCollection = doc.collections[i];
        updatedCollection.lastView = new Date().toString();
        colls.splice(i, 1, updatedCollection);
        break;
      }
    }
    let updatedUser = User.findOneAndUpdate({'username': user}, {'collections': colls}, {new: true});
    updatedUser.exec((err, doc) => {
      if (err) {
        console.error(err);
      } else {
        cb(null, doc);
      }
    });
  })
 };

 const setViewDateModes = (username, collectionName, mode, cb = () => {}) => {
   let user = User.findOne({'username': username});
   user.exec((err, doc) => {
     if (err) {
       console.error(err);
     } else {
       if (mode === 'easy') {
        let colls = doc.collections.slice();
        let updatedCollection;
        for (let i = 0; i < doc.collections.length; i++) {
          if (doc.collections[i].name === collection) {
            updatedCollection = doc.collections[i];
            updatedCollection.lastViewEasy = new Date().toString();
            colls.splice(i, 1, updatedCollection);
            break;
          }
        }
        let updatedUser = User.findOneAndUpdate({'username': user}, {'collections': colls}, {new: true});
        updatedUser.exec((err, doc) => {
          if (err) {
            console.error(err);
          } else {
            cb(null, doc);
          }
        });
       } else if (mode === 'difficult') {
        let colls = doc.collections.slice();
        let updatedCollection;
        for (let i = 0; i < doc.collections.length; i++) {
          if (doc.collections[i].name === collection) {
            updatedCollection = doc.collections[i];
            updatedCollection.lastViewDifficult = new Date().toString();
            colls.splice(i, 1, updatedCollection);
            break;
          }
        }
        let updatedUser = User.findOneAndUpdate({'username': user}, {'collections': colls}, {new: true});
        updatedUser.exec((err, doc) => {
          if (err) {
            console.error(err);
          } else {
            cb(null, doc);
          }
        });
       } else {
        let colls = doc.collections.slice();
        let updatedCollection;
        for (let i = 0; i < doc.collections.length; i++) {
          if (doc.collections[i].name === collection) {
            updatedCollection = doc.collections[i];
            updatedCollection.lastViewStudy = new Date().toString();
            colls.splice(i, 1, updatedCollection);
            break;
          }
        }
        let updatedUser = User.findOneAndUpdate({'username': user}, {'collections': colls}, {new: true});
        updatedUser.exec((err, doc) => {
          if (err) {
            console.error(err);
          } else {
            cb(null, doc);
          }
        });
       }
     }
   });
 };

 const editCollection = (username, collectionName, updatedCollection, cb = () => {}) => {
   let user = User.findOne({'username': username});
   user.exec((err, doc) => {
     if (err) {
       console.error(err);
     } else {
       let colls = doc.collections;
       for (let i = 0; i < doc.collections.length; i++) {
         if (doc.collections[i].name === collectionName) {
           colls[i].cardList = updatedCollection;
           break;
         }
       }
       let updated = User.findOneAndUpdate({'username': username}, {'collections': colls}, {new: true});
       updated.exec((err, doc) => {
         if (err) {
           console.error(err);
         } else {
           console.log('updated collection successfully');
           cb(null, doc);
         }
       });
     }
   });
 };

const cryptofy = (password, salt) => {
  salt = salt || 'winter';
  let shasum = crypto.createHash('sha256');
  shasum.update(password + salt);
  return shasum.digest('hex');
};

const saveSignup = (signup, cb = () => {}) => {
  let cookie = cryptofy(signup.username, signup.email);
  let newSignup = new User({
    name: signup.name,
    email: signup.email,
    username: signup.username,
    password: cryptofy(signup.password),
    collections: []
  });
  newSignup.save((err, success) => {
    if (err) {
      console.error(err);
    } else {
      cb(null, cookie);
    }
  })
};

const checkLogin = (userInfo, cb = () => {}) => {
  let attempt = cryptofy(userInfo.password);
  let user = User.findOne({'username': userInfo.username});
  user.exec((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('user email -> ', doc.email);
      let cookie = cryptofy(userInfo.username, doc.email);
      if (attempt === doc.password) {
        cb(null, cookie, true);
      } else {
        cb(null, null, false);
      }
    }
  });
};

const changePassword = () => {
  let user = User.findOneAndUpdate({'username': 'security'}, {'password': 'password'}, {new: true});
  user.exec((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('password has changed: ', doc);
    }
  });
};
// changePassword();

const storeScores = (username, collection, scores, cb = () => {}) => {
  console.log('db scores -> ', scores);
  console.log('db collection -> ', collection);
  console.log('db user -> ', username);
  let user = User.findOne({'username': username});
  user.exec((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      let collections = doc.collections;
      let chosenCollection;
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].name === collection) {
          chosenCollection = collections[i];
          break;
        }
      }
      chosenCollection.totalScores = [...chosenCollection.totalScores, scores.score];
      chosenCollection.mostRecentScore = scores.score;
      chosenCollection.highScore = Math.max(...chosenCollection.totalScores);
      for (let j = 0; j < collections.length; j++) {
        if (collections[j].name === collection) {
          collections.splice(j, 1, chosenCollection);
          break;
        }
      }
      let update = User.findOneAndUpdate({'username': username}, {'collections': collections}, {new: true});
      update.exec((err, doc) => {
        if (err) {
          console.error(err);
        } else {
          cb(null, doc);
        }
      });
    }
  });
};

const getScores = (username, collection, cb = () => {}) => {
  let user = User.findOne({'username': username});
  user.exec((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('get doc -> ', doc);
      let collections = doc.collections;
      let scoresObj = {};
      for (let i = 0; i < collections.length; i++) {
        if (collections[i].name === collection) {
          scoresObj.highScore = collections[i].highScore;
          scoresObj.mostRecentScore = collections[i].mostRecentScore;
          scoresObj.totalScores = collections[i].totalScores;
          break;
        }
      }
      console.log('scoresObj -> ', scoresObj);
      cb(null, scoresObj);
    }
  });
};

const checkCookie = (username, cookie, cb = () => {}) => {
  console.log('checkCookie username -> ', username);
  console.log('checkCookie incoming cookie -> ', cookie);
  let user = User.findOne({'username': username});
  user.exec((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('checkCookie doc -> ', doc);
      let email = doc.email;
      console.log('checkCookie doc email -> ', email);
      let checkedCookie = cryptofy(username, email);
      console.log('checkCookie checkedCookie -> ', checkedCookie);
      cb(null, checkedCookie);
    }
  });
};

module.exports.cards = Card;
module.exports.users = User;
module.exports.cardlists = CardList;
module.exports.saveCollection = saveCollection;
module.exports.setViewDate = setViewDate;
module.exports.setViewDateModes = setViewDateModes;
module.exports.saveSignup = saveSignup;
module.exports.checkLogin = checkLogin;
module.exports.storeScores = storeScores;
module.exports.getScores = getScores;
module.exports.checkCookie = checkCookie;
module.exports.editCollection = editCollection;
