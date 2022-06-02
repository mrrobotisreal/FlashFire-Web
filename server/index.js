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
  db.saveSignup(req.body, (err, cookie) => {
    if (err) {
      console.error(err);
    } else {
      let cookieObj = {
        cookie: cookie,
      }
      res.send(cookieObj);
    }
  });
});

app.post('/login', (req, res) => {
  db.checkLogin(req.body, (err, cookie, success) => {
    if (err) {
      console.error(err);
    } else {
      if (success) {
        let cookieObj = {
          cookie: cookie,
          success: success
        };
        res.send(cookieObj);
      } else {
        res.send({
          cookie: null,
          success: false
        });
      }
    }
  });
});

app.post('/check-cookie/:user', (req, res) => {
  db.checkCookie(req.params.user, req.body.cookie, (err, cookie) => {
    if (err) {
      console.error(err);
    } else {
      console.log('check-cookie server cookie -> ', cookie);
      let cookieObj = {
        cookie: cookie
      };
      res.send(cookieObj);
    }
  });
});

app.get('/collections/:user', (req, res) => {
  let user = db.users.findOne({'username': req.params.user});
  user.exec((err, doc) => {
    if (err) {
      console.error(err);
    } else {
      res.send(doc.collections);
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

app.post('/collections/:user/set-view-date-modes', (req, res) => {
  console.log('view date modes body -> ', req.body);
  db.setViewDateModes(req.params.user, req.body.collectionName, req.body.mode, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('date mode be like -> ', doc);
      res.send(doc);
    }
  });
});

app.post('/collections/:user/edit', (req, res) => {
  db.editCollection(req.params.user, req.body.collectionName, req.body.updatedCollection, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log('edit doc -> ', doc);
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