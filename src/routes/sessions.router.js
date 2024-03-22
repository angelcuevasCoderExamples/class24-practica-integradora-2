const {Router} = require('express');
const passport = require('passport');

const router = Router();

router.post('/register', 
    passport.authenticate('register',{
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
        failureRedirect:'/api/sessions/failedLogin'
    }),
    (req, res)=>{
        const {_id, first_name, last_name, role, email} = req.user; 
        req.session.user = {
            id: _id, 
            first_name,
            last_name,
            role, 
            email
        }
        res.send({status:'success', message:'User logged successfuly'})
    })

router.get('/failedLogin',(req, res)=>{
    res.status(400).send({status:'error', error:'There has been a problem with the login process'})
})

module.exports = {
    sessionsRouter: router
};