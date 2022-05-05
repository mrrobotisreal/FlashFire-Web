const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/flash-fire-webapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const { Schema } = mongoose;

const cardSchema = new Schema({
  question: String,
  answer: String
})
const cardListSchema = new Schema({
  name: String,
  category: String,
  cardList: [],
  creationDate: String
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

const hashlator = (str, max) => {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
}

const saveCollection = (newColl, user, cb = () => {}) => {
  console.log('newColl be like -> ', newColl);
  console.log('user be like -> ', user);
  let collection = new CardList({
    name: newColl.name,
    category: newColl.category,
    cardList: newColl.cardList,
    creationDate: newColl.creationDate
  });
  let oldColl = User.findOne({'username': user});
  oldColl.exec((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('collection be like -> ', collection);
      console.log('doc be like -> ', doc);
      console.log('doc collections be like -> ', doc.collections);
      let newCollections = doc.collections;
      newCollections.push(collection);
      console.log('newCollections be like -> ', newCollections);
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

// make appropriate edits to the code below!!!!
//
//                  v
//
// const saveCards = (cards, cb = () => {}) => {
//   console.log('words -> ', cards);
//   if (Array.isArray(card)) {
//     cards.forEach(card => {
//       let wordEntry = new Word({
//         cardId: hashlator(card.que, cards.length ** 2),
//         word: word.word,
//         meaning: word.meaning
//       });
//       Word.findOneAndDelete({wordId: word.wordId}, (err, success) => {
//         if (err) {
//           console.error('database error: ', err);
//         } else {
//           console.log('database success: ', success);
//         }
//       });
//       wordEntry.save();
//       cb();
//     })
//   } else {
//     let cardEntry = new Card({
//       wordId: hashlator(words.meaning, 10000),
//       word: words.word,
//       meaning: words.meaning
//     });
//     Word.findOneAndDelete({wordId: hashlator(words.meaning, 10000)}, (err, success) => {
//       if (err) {
//         console.error('database error: ', err);
//       } else {
//         console.log('database success: ', success)
//       }
//     });
//     wordEntry.save((err, success) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log('Great success!!!! ', success);
//         cb(null, success);
//       }
//     });

//   }
// };

const saveSignup = (signup, cb = () => {}) => {
  let newSignup = new User({
    name: signup.name,
    email: signup.email,
    username: signup.username,
    password: signup.password,
    collections: []
  });
  newSignup.save((err, success) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Success!!!');
      cb(null, 'Successful Signup in DB!');
    }
  })
};

// const deleteWord = (word, cb = () => {}) => {
//   Word.findOneAndDelete({word: word.word}, (err, success) => {
//     if (err) {
//       console.error('Db Delete error: ', err);
//     } else {
//       console.log('Db Delete success!');
//       cb(null, success);
//     }
//   });
// }

// const editMeaning = (word, cb = () => {}) => {
//   Word.findOneAndUpdate({meaning: word.prev}, {meaning: word.new}, {new: true}, (err, success) => {
//     if (err) {
//       console.error('Db edit error: ', err);
//     } else {
//       console.log('Db edit success!');
//       cb(null, success);
//     }
//   });
// }

module.exports.cards = Card;
module.exports.users = User;
module.exports.cardlists = CardList;
module.exports.saveCollection = saveCollection;
// module.exports.saveCards = saveCards;
module.exports.saveSignup = saveSignup;
// module.exports.deleteWord = deleteWord;
// module.exports.editMeaning = editMeaning;