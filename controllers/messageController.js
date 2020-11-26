const Message = require('../models/Message')


exports.viewMessage = function (req, res) {

  //  res.render('tenantRegistration')
    res.render('tenant/viewMessage', {
        regErrors: req.flash('regErrors')
    })

}
exports.newMessage  = function (req, res) {

    //  res.render('tenantRegistration')
      res.render('tenant/newMessage', {
          regErrors: req.flash('regErrors')
      })
  
  }

exports.getTenantDashboard = function (req, res) {

    //  res.render('tenantRegistration')
      res.render('tenant/tenant-dashboard', {
          regErrors: req.flash('regErrors')
      })
  
  }
