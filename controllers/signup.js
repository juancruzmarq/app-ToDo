const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async(req,res, next ) => {


    const {username, email, password} = req.body;


    try {

        const user = new User({
            username: username,
            email: email,
            password: password
        })

        user.password = await user.encriptacion(user.password);
        await user.save();
        
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {
            expiresIn: 60*60*24*180
        })


        res.json({auth: true, token});
        
    } catch (error) {
        console.error(error)
    }

};

module.exports = signup;