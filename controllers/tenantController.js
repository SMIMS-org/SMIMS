const Tenant = require('../models/Tenant')


exports.tenatRegister = function (req, res) {

  //  res.render('tenantRegistration')
    res.render('tenantRegistration', {
        regErrors: req.flash('regErrors')
    })

}
exports.postTenantRegister = function (req, res) {
    // console.log(req.body)
    let tenant = new Tenant(req.body,req.session.user._id)
    tenant.registerTenant().then(()=>{
        // req.session.user = {username: user.data.username}
        // req.session.save(function () {
            res.redirect('tenantRegistration')
        // })
    }).catch((regErrors)=>{
        regErrors.forEach(function (error) {
            req.flash('regErrors', error)

        })
        req.session.save(function () {
            res.redirect('tenantRegistration')
        })

    })
}
