require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utility/database')
const app = express();

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));

const userRoutes = require('./router/user');

const staticPath = path.join(__dirname, "./view")
app.use(express.static(staticPath));

app.use('/user', userRoutes);

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        app.listen(process.env.PORT || 2000);
    })
    .catch(err => console.log(err))
