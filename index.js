const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const mydata = require('./data');

const app = express();

app.use(bodyParser.json());// for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded


const port = 3000;



app.get('/', function(req, res, next) {
    res.json(mydata.getAllInformation(mydata.user_scores));
});

app.get('/scores', function(req, res, next) {
    res.json(mydata.getAllInformation(mydata.user_scores, req.query));
});

app.get('/scores/:user', function(req, res, next) {
    res.json(mydata.getUserHighestScore(mydata.user_scores, req.params.user));
});


app.post('/scores/:user', function(req, res, next) {
    res.json(mydata.createNewUser(mydata.user_scores, req.params.user, req.query.scoreTime, req.query.scoreEat));
});


app.put('/scores/:user', function(req, res, next) {
    res.json(mydata.updateUser(mydata.user_scores, req.params.user, req.query.scoreTime, req.query.scoreEat));
});


app.delete('/scores/:user', function(req, res, next) {
    res.json(mydata.removeUser(mydata.user_scores, req.params.user));
});



app.use((req, res, next) => {
  res.status(404).send();
})

// starting server
http.createServer(app)
  .listen(port, () => {
    console.log(`Service was started successfully on port ${port}`);
  }).on('error', err => {
    // custom error handling to print more userfriendly error message
    // if port is already used by other app
    if (err.code === 'EADDRINUSE') {
      console.log(`Error: port address ${port} already in use`);
    } else {
      console.log(`Error: ${err.message}`);
    }
    process.exit(1);
  });