
const express = require('express');
const cors = require('cors');
const bodyParser  = require('body-parser');

const router = require('./app/routes/index.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

router.route(app);

module.exports = app;
