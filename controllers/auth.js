const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/')
  }
  res.render('auth/login', {
    title: 'Login'
  })
}

exports.postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.userEmail)) {
    console.log(`${req.body.userEmail} is invalid`);
    validationErrors.push({ msg: 'Please enter a valid email address.' })
  }
  console.log(`${req.body.userEmail} is valid`);

  if (validator.isEmpty(req.body.userPassword)) {
    console.log(`${req.body.userPassword} is blank`);
    validationErrors.push({ msg: 'Password cannot be blank.' })
  }


  // if (validator.isEmpty(req.body.userPassword)) validationErrors.push({ msg: 'Password cannot be blank.' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('/login')
  }
  req.body.userEmail = validator.normalizeEmail(req.body.userEmail, { gmail_remove_dots: false })


  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    console.log(user);
    if (!user) {
      req.flash('errors', info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      console.log('YOU ARE LOGGED IN!');
      req.flash('success', { msg: 'Success! You are logged in.' })
      res.redirect(req.session.returnTo || '/')
    })
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    res.redirect('/')
  })
}

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/')
  }
  res.render('auth/signup', {
    title: 'Create Account'
  })
}

exports.postSignup = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.userEmail)) validationErrors.push({ msg: 'Please enter a valid email address.' })
  if (!validator.isLength(req.body.userPassword, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
  if (req.body.userPassword !== req.body.userPasswordRepeat) validationErrors.push({ msg: 'Passwords do not match' })

  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('../signup')
  }
  req.body.userEmail = validator.normalizeEmail(req.body.userEmail, { gmail_remove_dots: false })

  const user = new User({
    userName: req.body.userName,
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword
  })

  User.findOne({$or: [
    {userEmail: req.body.userEmail},
    {userName: req.body.userName}
  ]}, (err, existingUser) => {
    if (err) { return next(err) }
    if (existingUser) {
      req.flash('errors', { msg: 'Account with that email address or username already exists.' })
      return res.redirect('../signup')
    }
    user.save((err) => {
      if (err) { return next(err) }
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect('/')
      })
    })
  })
}