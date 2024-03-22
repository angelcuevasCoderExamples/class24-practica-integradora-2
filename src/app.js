const express = require('express');
const port = 8080;
const app = express();
const usersRouter = require('./routes/users.router')
const viewsRouter = require('./routes/views.router')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose');
const { coursesRouter } = require('./routes/courses.router');
const initializePassport = require('./config/passport.config');
const passport = require('passport');
const { sessionsRouter } = require('./routes/sessions.router');
const cookieParser = require('cookie-parser');


//*---database connection--//
mongoose.connect(`mongodb+srv://angelpablocuevas1989:EghP7p3eTEtgWPyu@codercluster.5ny2sqo.mongodb.net/integracion`).then(()=>{
    console.log("connected successsfuly")
})

//*---views engine--//
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine','handlebars')

//*--middlewares --*//
initializePassport()
app.use(passport.initialize())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/users', usersRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/', viewsRouter)


//endpoins
app.get('/helloworld', (req, res)=>{
    res.send('hello world!')
})


app.listen(port,()=>console.log(`Up and running on port ${port}`))