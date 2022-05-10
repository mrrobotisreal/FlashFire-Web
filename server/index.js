require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require('./db.js');
const bodyParser = require('body-parser');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.post('/signup', (req, res) => {
  console.log('signup req -> ', req.body);
  db.saveSignup(req.body, (err, success) => {
    if (err) {
      console.error(err);
    } else {
      console.log(success);
      res.send('success from server!');
    }
  });
});

app.post('/login', (req, res) => {
  db.checkLogin(req.body, (err, success) => {
    if (err) {
      console.error(err);
    } else {
      // console.log('successful login');
      console.log('success === ', success);
      res.send(success);
    }
  });
});

app.get('/collections/:user', (req, res) => {
  let user = db.users.find({'username': req.params.user});
  user.exec((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      // console.log('doc in general -> ', doc);
      // console.log('collections doc -> ', doc[0].collections);
      // console.log('cardList -> ', doc[0].collections[0].cardList);
      // if (doc.length === 0) {
      //   res.send(false);
      // }
      res.send(doc[0].collections);
    }
  });
});

app.post('/collections/:user/add', (req, res) => {
  db.saveCollection(req.body, req.params.user, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('new collection sent back');
      console.log('the doc be like -> ', doc);
      res.send(doc);
    }
  });
  // let user = db.users.find({'username': req.params.user});
  // user.exec((err, doc) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log('post doc be like -> ', doc[0]);
  //     res.send(doc[0]);
  //   }
  // })
});

app.post('/collections/:user/set-view-date', (req, res) => {
  console.log('server data be like -> ', req.body);
  db.setViewDate(req.body, req.params.user, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('date doc be like -> ', doc);
      res.send(doc);
    }
  });
});

// app.post('/cards', (req, res) => {
//   console.log('Successfully POSTed! searchyyy -> ', req.body);
//   let search = req.body.search;
//   if (search) {
//     console.log(`It's true!`);
//     let glossary = db.cards.find({word: {$regex: search, $options: 'i'}}).sort({card: -1});
//     glossary.exec((err, docs) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log('get ressie -> ', docs);
//         res.send(docs);
//       }
//     })
//   } else {
//     db.saveCards(req.body, (err, success) => {
//       if (err) {
//         console.error(err);
//       } else {
//         let glossary = db.cards.find().sort({card: -1});
//         glossary.exec((err, docs) => {
//           if (err) {
//             console.error(err);
//           } else {
//             console.log('post ressie -> ', docs);
//             res.send(docs);
//           }
//         })
//       }
//     });
//   }
// })

// app.get('/words', (req, res) => {
//   console.log('Successfully GETted!');
//   let glossary = db.words.find().sort({word: -1});
//   glossary.exec((err, docs) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('get ressie -> ', docs);
//       res.send(docs);
//     }
//   })
// });

// app.delete('/words', (req, res) => {
//   console.log('Successfully DELETEd!');
//   console.log('req body -> ', req.body);
//   db.deleteWord(req.body, (err, success) =>{
//     if (err) {
//       console.error(err);
//     } else {
//       let glossary = db.words.find().sort({word: -1});
//       glossary.exec((err, docs) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log('delete ressie -> ', docs);
//           res.send(docs);
//         }
//       })
//     }
//   });
// });

// app.patch('/words', (req, res) => {
//   console.log('Successfully PATCHed!');
//   console.log('req body -> ', req.body);
//   db.editMeaning(req.body, (err, success) => {
//     if (err) {
//       console.error(err);
//     } else {
//       let glossary = db.words.find().sort({word: -1});
//       glossary.exec((err, docs) => {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log('patch ressie -> ', docs);
//           res.send(docs);
//         }
//       })
//     }
//   });
// })

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);