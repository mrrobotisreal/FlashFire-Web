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
  lastView: String
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

 const setViewDate = (data, user, cb = () => {}) => {
  let dis = User.findOne({'username': user});
  dis.exec((err, doc) => {
    console.log('dis be like -> ', doc.collections);
    let theUser = doc;
    let theColl = doc.collections;
    let newCreation = doc.collections[0];
    newCreation.lastView = new Date().toString();
    theColl[0] = newCreation;
    theUser.collections = theColl;
    let userUpdate = User.findOneAndUpdate({'username': user}, {'collections': theColl}, {new: true});
    userUpdate.exec((err, doc) => {
      cb(null, doc);
    })
  })
 };

const cryptofy = (password) => {
  let salt = 'winter';
  let shasum = crypto.createHash('sha256');
  shasum.update(password + salt);
  return shasum.digest('hex');
};

const saveSignup = (signup, cb = () => {}) => {
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
      cb(null, 'Successful Signup in DB!');
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
      if (attempt === doc.password) {
        cb(null, true);
      } else {
        cb(null, false);
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

module.exports.cards = Card;
module.exports.users = User;
module.exports.cardlists = CardList;
module.exports.saveCollection = saveCollection;
module.exports.setViewDate = setViewDate;
module.exports.saveSignup = saveSignup;
module.exports.checkLogin = checkLogin;
