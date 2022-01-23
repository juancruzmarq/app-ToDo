const User = require('../models/User');
const jwt = require('jsonwebtoken')

const signin = async(req,res,next)=>{
    
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
    
        if(!user){
            return res.status(404).json({
                msg: 'Usuario no registrado'
            })
        }
        
        const validacion = await user.validacion(password);
    
        if(!validacion){
            return res.status(401).json({
                msg: `Usuario o contraseña incorrecta`,
                auth: false,
                token: null,
            })
        }
    
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY,{expiresIn: 60*60*24*180});
    
        res.json({auth:true, token: token});
    } catch (error) {
        res.json(error)
    }
   


}

module.exports = signin;
