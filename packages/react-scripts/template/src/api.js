var express = require('express');
var jwt = require('express-jwt');
require('dotenv').config();

var app = express();

if (!process.env.REACT_APP_AUTH0_CLIENT_ID || !process.env.AUTH0_CLIENT_SECRET) {
  throw new Error('Please define `REACT_APP_AUTH0_CLIENT_ID` and `AUTH0_CLIENT_SECRET` in your .env file');
}

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.REACT_APP_AUTH0_CLIENT_ID
});

app.get('/api/public', function(request, response) {
  response.json({message: 'Hello from a public endpoint! You can <a href="/login">login to edit your profile</a>.'});
});

app.get('/api/private', authenticate, function(request, response) {
  response.json({message: 'Thanks for logging in with Auth0. You can <a href="/profile/edit">view and edit your profile</a>.'});
});

app.listen(3001);

console.log('Listening on http://localhost:3001');
