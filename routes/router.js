const User = require('../models/User');
const jwt = require('jsonwebtoken');
const verifyToken = require('../controllers/auth');
const router = require('express').Router();
const {check} = require('express-validator');
const signup = require('../controllers/signup');
const signin = require('../controllers/signin');
const validarCampos = require('../middleware/errores');

router.post('/signup', [
    check('email', 'El email es obligatorio').isEmail(),
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    check('password', 'La contrasena debe tener minimo 6 caracteres').isLength({min: 6}),
    validarCampos
    ],signup);

router.post('/signin',[
    check('email', 'El email es obligatorio').notEmpty(),
    check('email', 'No es un email valido').isEmail(),
    check('password', 'La contraseña es obligatoria'),
    validarCampos
],signin);

router.get('/me', verifyToken ,async(req,res,next )=>{
    

    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    console.log(decoded);
    
    const user = await User.findById(req.userId);

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
