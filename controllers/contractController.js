const Contract = require('../models/Contract')
const Room = require('../models/Room')
const tenantCollection = require('../db').db().collection("tenant")
const roomCollection = require('../db').db().collection("room")
const Tenant = require('../models/Tenant')
const collectiont = require('../db').db('shoppingMall')



exports.getContract = async function (req, res) {
    let Collectiontenants = []
    let Collectionrooms = []
   
     tenantCollection.find().toArray(function (err, tenants) {
        if (err) {
            throw err
        } else {
            for (i = 0; i < tenants.length; i++) {
                Collectiontenants[i] = tenants[i]

            }
            
        }
       //  console.log(tenants) 
    
    roomCollection.find().toArray(function(err,rooms){

        if(err){
            throw err;
        }else{
            for (i=0; i<rooms.length; i++) {
                Collectionrooms[i] = rooms[i];
              }
            //  console.log(Collectionrooms)
        }


        res.render('contract', {
            
            tenants: Collectiontenants,
            room: Collectionrooms ,
            regErrors: req.flash('regErrors')  
})
})
}) 


}   

exports.postContractRegister = function (req, res) {
    // console.log(req.body)
    let contract = new Contract(req.body, req.session.user._id)
 
    contract.addContract().then(()=>{
       
            res.redirect('contract')
            console.log("congratulation")
        // })
    }).catch((regErrors)=>{
        regErrors.forEach(function (error) {
            req.flash('regErrors', error)
            console.log("error")

        })
        req.session.save(function () {
            res.redirect('contract')
        })

    })
}

exports.viewAllContract = async function(req, res){
    console.log("hi every one")
   // res.render('editContract')
    const id = req.params.id;

    try{
        console.log("hi every 2one")
        let contracts = await Contract.findAll()
        console.log("try")
        res.render('allcontracts', {contract: contracts,  regErrors: req.flash('regErrors')})
       

    }catch{
        res.render('404')

    }
    }

exports.viewSingle = async function(req, res){
    console.log("hi every one")
   // res.render('editContract')
    const id = req.params.id;

    try{
        console.log("hi every 2one")
         Contract.findById(id)
         .then(contracts =>{
             Tenant.findTenant().then(tenants =>{
                 Room.findRoom().then(rooms =>{
                    console.log("Find Single")
                    res.render('editContract', {contract: contracts, tenant: tenants, room:rooms,regErrors: req.flash('regErrors')})

                 })
             })
             
         })
    }catch{
        res.render('404')

    }
    }

exports.UpdateContract = function(req, res){
    let contract = new Contract(req.body, req.params.id)
    contract.update().then((status) => {
        //the post was successfully updated in the database
        //or user did have permission , but there were validation errors
        if(status=="success"){
        console.log("success")
        req.flash("success", "Contract successfully updated.")
        req.session.save(function(){
            res.redirect(`/contract/${req.params.id}`)
        })

        }else{
            contract.errors.forEach(function(error){
                req.flash("errors", error)
            })
            req.session.save(function(){
                res.redirect(`/contract/${req.params.id}`)
            })
        }


    }).catch(()=>{
        //if a post with the requested id doesn't exist
        // if the current visitor is not the owner of the requested contract
        req.flash("errors", "You do not have permission to perform that action ")
        req.session.save(function(){
            res.redirect("/")
        })
    })
    
}
exports.DeleteContract = function(req, res){
    Contract.delete(req.params.id)
    .then(()=>{
        req.flash("success", "Contract successfully Deleted. ")
        req.session.save(()=> {
            res.redirect('/allcontracts')
        })

    }).catch(()=>{
        req.flash("errors","You do not have permission to perform that action ")
        req.session.save(()=>{ res.redirect("/")})

    })
}



    
