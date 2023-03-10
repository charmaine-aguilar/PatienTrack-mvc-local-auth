const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'userEmail', passwordField: 'userPassword'}, (userEmail, userPassword, done) => {
    User.findOne({ userEmail: userEmail.toLowerCase() }, (err, user) => {
      console.log(`Email ${userEmail} not found here inside passport.js.`);
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { msg: `Email ${userEmail} not found.` })
      }
      if (!user.userPassword) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }
      user.comparePassword(userPassword, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          return done(null, user)
        }
        return done(null, false, { msg: 'Invalid email or password.' })
      })
    })
  }))
  
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}