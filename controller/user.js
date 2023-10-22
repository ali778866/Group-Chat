exports.signupUser = (req, res, next) => {
    const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        res.status(201).json({message: "User Signup Successfully!"})
}