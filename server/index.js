const express = require('express')
const dotenv = require('dotenv')
const request = require('request')
const open = require('open')

const port = 5000;

dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var spotify_redirect_uri = "http://127.0.0.1:3000/auth/callback";

let access_token = '';

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const app = express();

app.get(`/`, (req, res) => {
  res.send('Hello World!')
});

app.get('/auth/login', (req, res) => {
  var scope = "streaming \
                user-read-email \
               user-read-private"

  var state = "spotify_auth_state";

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/auth/callback', (req, res) => {
    var code = req.query.code;
  
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: spotify_redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
          var access_token = body.access_token;
          res.json(body);
      } else{
        res.status(response.statusCode).json({error:'Failed to get the access token'})
      }
    });
});

app.get('/auth/token', (req, res) => {
  res.json(
     {
        access_token: access_token
     });
})

app.listen(port, () => {
  console.log(`Listening at http://127.0.0.1:${port}`);
  open(`http://127.0.0.1:${port}/auth/login`)
})

