const User = require('../models/User')

exports.register = function (req, res) {
    res.render('registration', {
        regErrors: req.flash('regErrors')
    })


}
exports.logout = function (req, res) {
    req.session.destroy(function () {
        res.redirect('/')
    })

}
exports.mustBeLoggedIn = function(req, res, next){
    if(req.session.user){
        next()

    }else{
        req.flash("errors", "You must be logged in to perform that action")
        req.session.save(function(){
            res.redirect('/')
        })
    }

}

exports.login = function (req, res) {
    res.render('login', {
        errors: req.flash('errors')
    })

}
exports.postlogin = function (req, res) {

    let user = new User(req.body)
    user.login().then(
        function (result) {
            req.session.user = {
                favColor: "blue",
                username: user.data.username,
                _id: user.data._id,
                role: user.data.role
            }

            req.session.save(function () {
                res.redirect('/')
               

            })

        }).catch(function (err) {
        // res.send(err)
        req.flash('errors', err)
        req.session.save(() => {

        })
        res.redirect('/login')

    })




}
exports.postRegister = function (req, res) {
    // console.log(req.body)
    let user = new User(req.body)
    user.register().then(()=>{
        req.session.user = {username: user.data.username, _id:user.data._id, role: user.data.role}
        req.session.save(function () {
            res.redirect('register')
        })
    }).catch((regErrors)=>{
        regErrors.forEach(function (error) {
            req.flash('regErrors', error)

        })
        req.session.save(function () {
            res.redirect('register')
        })

    })
}
exports.home = function (req, res) {

    if (req.session.user && req.session.user.role === 'employee') {
        res.render('employee-dashboard')
    } else if (req.session.user && req.session.user.role === "admin") {
        //res.render('admin')
        res.render('admin')

    } 
    else if (req.session.user && req.session.user.role === "tenant") {
        //res.render('admin')
        res.render('tenant/tenant-dashboard')

    }
    else if (req.session.user && req.session.user.role === "manager") {
        //res.render('admin')
        res.render('manager/manager-dashboard')

    }
    
    else {
        res.render('home-guest',)
    }
}