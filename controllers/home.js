const User = require('../models/User')

module.exports = {
    getHomePage: async (req,res) =>{
        // res.render('home.ejs')

        try {
            const user = await User.findOne({
                userEmail: req.body.userEmail
            })

            res.render('home.ejs', { user: req.user })
        }catch(err){
            console.log(err)
        }
    }  
}