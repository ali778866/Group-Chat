const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
app.use(cors());

const userRoutes = require('./router/user');

const staticPath = path.join(__dirname, "./view")
app.use(express.static(staticPath));

app.use('/user', userRoutes);

app.listen(process.env.PORT || 4500);
