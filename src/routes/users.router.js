const {Router} = require('express');
const { coursesDBManager } = require('../dao/dbManagers/courses');
const Users = require('../dao/dbManagers/users');


const router = Router();
const usersManager = new Users()
const coursesManager = new coursesDBManager();


router.get('/',async (req, res)=>{
    const users  = await usersManager.getAll()
    res.send({status:'success', payload: users})
})

router.post('/', async (req, res)=>{

    if(!req.body.first_name){
        return res.status(400).send({status:'error', error:'Incomplete data'})
    }

    let result = await usersManager.saveUser(req.body)
    res.send({status:'success', payload: result})
})

router.post('/:uid/courses/:cid', async (req, res)=>{
    const {uid, cid} = req.params; 

    //user exists?
    const user = await usersManager.getById(uid);
    if(!user) return res.status(400).send({status:'error', error:'User not found'})

    //course exists?
    const course = await coursesManager.getById(cid);
    if(!course) return  res.status(400).send({status:'error', error:'Course not found'})

    //user already on course? 
    if(user.courses.some(c=>c._id.toString() === cid)){
        return res.status(400).send({status:'error', error:'User is already on that course.'})
    }

    user.courses.push(course._id);
    course.students.push(user._id);

    await usersManager.updateUser(uid, user);
    await coursesManager.updateCourse(cid, course);

    res.send({status:'success', message:'user added to course successfuly'})
})

module.exports = router;