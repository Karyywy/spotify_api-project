const express = require('express')
const dotenv = require('dotenv');
const { spotifyClientId, spotifyClientSecret } = require('./gitignore.secret.js')

const port = 5000

dotenv.config()

const app = express();

app.get('/auth/login', (req, res) => {
});

app.get('/auth/callback', (req, res) => {
});

app.listen(port, () => {
  console.log(`Listening at http://127.0.0.1:${port}`)
})
