//Install express server
const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());

// Serve only the static files from the dist directory
app.use(express.static('./dist/votations-frontend'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/votations-frontend/'}),
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
