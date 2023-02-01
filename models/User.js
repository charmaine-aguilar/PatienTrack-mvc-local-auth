const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName:       { type: String, unique: true },
    userFirstName:  { type: String, required: true },
    userLastName:   { type: String, required: true },
    userEmail:      { type: String, unique: true },
    userPassword:   { type: String }
})


// Password hash middleware.

UserSchema.pre('save', function save(next) {
    const user = this
    if (!user.isModified('userPassword')) { return next() }
    bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
        bcrypt.hash(user.userPassword, salt, (err, hash) => {
            if (err) { return next(err) }
            user.userPassword = hash
            next()
        })
    })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.userPassword, (err, isMatch) => {
    cb(err, isMatch)
    })
}


module.exports = mongoose.model('User', UserSchema)