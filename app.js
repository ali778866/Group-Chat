require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utility/database')
const http = require('http');
const app = express();

const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));


io.on('connection', (socket) => {
    // socket.on('join-group', (id) => {
    //     socket.join(id);
    // })
    socket.on('user-message', (message) => {
        // if(groupId === '') {
            socket.broadcast.emit('message', message)
        // }else {
            // socket.to(groupId).emit('message', message);
        // }
    })
});

const User = require('./model/user');
const Chat = require('./model/chat');
const Group = require('./model/group');

const userRoutes = require('./router/user');
const chatRoutes = require('./router/chat');
const groupRoutes = require('./router/group')

const staticPath = path.resolve("./view")
app.use(express.static(staticPath));

app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/group', groupRoutes);

User.hasMany(Chat);
Chat.belongsTo(User);

Group.hasMany(Chat);
Chat.belongsTo(Group);

User.belongsToMany(Group, { through: 'group_users' });
Group.belongsToMany(User, { through: 'group_users' });

sequelize
    // .sync({force: true})
    .sync()
    .then(()=> {
        return Group.findByPk(1);
    })
    .then(group => {
        if (!group) {
            return Group.create({groupname: "Main Group"});
        }
        return group;
    })
    .then(result => {
        server.listen(process.env.PORT || 2000);
    })
    .catch(err => console.log(err))
