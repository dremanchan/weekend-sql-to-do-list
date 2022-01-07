const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve "static assets"
app.use(express.static('server/public'));

const PORT = 5000;
app.listen(PORT, () => {
    console.log('/listening in port', PORT);
});
