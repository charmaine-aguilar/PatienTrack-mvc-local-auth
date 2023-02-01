/****************
 * DEPENDENCIES *
 ****************/
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const path = require('path')

/***********
 * CONFIGS *
 ***********/
require('dotenv').config({path: './config/.env'})
// Passport config
require('./config/passport')(passport)

connectDB()

/**************
 * MIDDLEWARE *
 **************/


// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())


app.set('view engine', 'ejs')

// Used so we can use files in subfolders in the views folder
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/***************
 * ROUTE PATHS *
 ***************/
const homeRoutes = require('./routes/home')
const patientRoutes = require('./routes/patient')





/**********************
 * ROUTE FOR REQUESTS *
 **********************/
app.use('/', homeRoutes)
app.use('/patient', patientRoutes)


/******************
 * LISTEN ON PORT *
 ******************/
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    