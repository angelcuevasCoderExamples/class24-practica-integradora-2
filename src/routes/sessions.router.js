const {Router} = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/register', 
    passport.authenticate('register',{
        session:false, 
        failureRedirect:'/api/sessions/failedRegister'
    }),
    (req, res)=>{
        res.send({status:'success', message:'User registered successfuly'})
    })

router.get('/failedRegister',(req, res)=>{
    res.status(400).send({status:'error', error:'There has been a problem with the register process'})
})

/** login */

router.post('/login', 
    passport.authenticate('login',{
        session:false, 
        failureRedirect:'/api/sessions/failedLogin'
    }),
    (req, res)=>{
        const {_id, first_name, last_name, dni, role, email} = req.user; 
        const serializableUser = {
            _id,
            first_name,
            last_name,
            dni,
            role,
            email
        }

        const token = jwt.sign(serializableUser, 'tokenSecret',{expiresIn:'1h'})
        res.cookie('coderCookie', token, {maxAge: 60 * 60 * 1000 })

        res.send({status:'success', message:'User logged successfuly',payload: token})
    })

router.get('/failedLogin',(req, res)=>{
    res.status(400).send({status:'error', error:'There has been a problem with the login process'})
})

module.exports = {
    sessionsRouter: router
};