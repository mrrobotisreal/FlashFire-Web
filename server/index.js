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
      res.send('success from server!');
    }
  });
});

app.post('/login', (req, res) => {
  db.checkLogin(req.body, (err, success) => {
    if (err) {
      console.error(err);
    } else {
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
});

app.post('/collections/:user/set-view-date', (req, res) => {
  console.log('server data be like -> ', req.body);
  db.setViewDate(req.params.user, req.body.data.collectionName, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('date doc be like -> ', doc);
      res.send(doc);
    }
  });
});

app.get('/collections/:user/scores/:collection', (req, res) => {
  db.getScores(req.params.user, req.params.collection, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('scores doc be like -> ', doc);
      res.send(doc);
    }
  });
});

app.post('/collections/:user/scores/:collection', (req, res) => {
  db.storeScores(req.params.user, req.params.collection, req.body, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('doc  be like -> ', doc);
      res.send(doc);
    }
  });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);