require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require('./db.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/dist")));

app.post('/signup', (req, res) => {
  db.saveSignup(req.body, (err, cookie) => {
    if (err) {
      console.error(err);
    } else {
      let cookieObj = {
        cookie: cookie,
      }
      res.cookie('username', req.body.username).send(cookieObj);
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
  db.checkCookie(req.params.user, req.body.cookie, req.body.jwt, (err, cookie) => {
    if (err) {
      console.error(err);
    } else {
      let cookieObj = {
        cookie: cookie
      };
      res.cookie('username', req.params.user).send(cookieObj);
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
      res.send(doc);
    }
  });
});

app.post('/collections/:user/set-view-date', (req, res) => {
  db.setViewDate(req.params.user, req.body.data.collectionName, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      res.send(doc);
    }
  });
});

app.post('/collections/:user/set-view-date-modes', (req, res) => {
  db.setViewDateModes(req.params.user, req.body.collectionName, req.body.mode, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
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
      res.send(doc);
    }
  });
});

app.post('/collections/:user/scores/:collection/:mode', (req, res) => {
  console.log('req params mode is -> ', req.params.mode);
  db.storeScores(req.params.user, req.params.collection, req.body, req.params.mode, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      res.send(doc);
    }
  });
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);