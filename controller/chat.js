const Chat = require('../model/chat');
const User  = require('../model/user');
const { Op } = require("sequelize");

exports.postChat = async (req, res, next) => {
    try {
        const chat = req.body.message;
        const name = req.body.name;
        const userId = req.body.userId;
        const message = await Chat.create({message: chat,name: name, userId: userId});
        res.status(201).json({message: message.message})
    } catch (err) {
        console.log("Error in postChat", err);
    }
}

exports.getChat = async (req, res, next) =>{
    try{
        lastMsgId = parseFloat(req.query.lastmsgid)
        // const allChat = await Chat.findAll()
        const newChat = await Chat.findAll({where: {id: {[Op.gt]:lastMsgId}}});
        const nChat = newChat.map(chat => ({
            id: chat.dataValues.id,
            message: chat.dataValues.message,
            name: chat.dataValues.name,
          }));
          
        //   console.log(nChat, newChat);
        res.status(200).json({allMessage: nChat})
    } catch (err) {
        console.log('Error While Getting Chat!', err);
    }
}