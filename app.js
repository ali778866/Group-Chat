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

const User = require('./model/user');
const Chat = require('./model/chat')

const userRoutes = require('./router/user');
const chatRoutes = require('./router/chat')

const staticPath = path.join(__dirname, "./view")
app.use(express.static(staticPath));

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);

User.hasMany(Chat);
Chat.belongsTo(User)

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        app.listen(process.env.PORT || 2000);
    })
    .catch(err => console.log(err))
