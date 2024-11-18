
const express = require('express');
const cors = require('cors');
const bodyParser  = require('body-parser');
const path = require('path');

const router = require('./app/routes/index.route');

const app = express();

// Cấu hình thư mục tĩnh
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads/')));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

router.route(app);

module.exports = app;
