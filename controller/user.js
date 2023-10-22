const User  = require('../model/user');
const bcrypt = require('bcrypt');

exports.signupUser = async (req, res, next) => {
    try {const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const existingUser = await User.findOne({ where: {email: email}})
        if(existingUser){
            res.json({message : "User Already Exist!"})
        }else {
            bcrypt.hash(password, 10, async (err, hash) => {
                  console.log('err', err);
                  await User.create({
                    name: name,
                    email: email, 
                    phone: phone,
                    password: hash
                })
                res.status(201).json({message : "User Signup Successfully!"})
            })
        }
    } catch { err => console.log(err) }
}