const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

router.post('/signup', async(req,res,next )=>{
    const {username, email, password} = req.body;
    console.log(username,email,password);


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
})

router.post('/signin', async(req,res,next )=>{
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


})

router.get('/me', async(req,res,next )=>{
    const token = req.headers['x-access-token']

    if(!token){
        return res.status(401).json({
            auth: false,
            msg: `No token provided`
        })
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    console.log(decoded);
    
    const user = await User.findById(decoded.id);

    if(!user){
        return res.status(404).json({
            msg: "usuario no encontrado"
        })
    }
    
    res.json({
        user 
    })
})


module.exports = router;
