const {Router} = require('express');
const { coursesDBManager } = require('../dao/dbManagers/courses');
const UsersManager = require('../dao/dbManagers/users');

const router = Router();

const usersManager = new UsersManager()
const coursesManager = new coursesDBManager();

router.get('/',async (req, res)=>{
    const users = await usersManager.getAll();
    res.render('users',{users:users})
})

router.get('/courses',async (req, res)=>{
    const courses = await coursesManager.getAll();
    res.render('courses',{courses})
})

router.get('/login', async(req, res)=>{
    res.render('login')
})

module.exports = router;