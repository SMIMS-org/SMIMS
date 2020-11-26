const Receipt = require('../models/Receipt')
const tenantCollection = require('../db').db().collection("tenant")
const roomCollection = require('../db').db().collection("room")
const Tenant = require('../models/Tenant')
const Room = require('../models/Room')


exports.getReceipt = async function (req, res) {
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

        res.render('receipt', {
            tenants: Collectiontenants,
            room: Collectionrooms ,
            regErrors: req.flash('regErrors')  
})
})
})
} 

exports.postReceipt = function (req, res) {
    // console.log(req.body)
    let receipt = new Receipt(req.body)
    receipt.addReceipt().then(()=>{
       
            res.redirect('receipt')
            console.log("congratulation")
        
    }).catch((regErrors)=>{
        regErrors.forEach(function (error) {
            req.flash('regErrors', error)
            console.log("error")

        })
        req.session.save(function () {
            res.redirect('receipt')
        })

    })
}

exports.getAllReceipts = async function(req, res){

    console.log("hi every one")
    //const id = req.params.id;
 
     try{
         console.log("hi every 2one")
         let receipts = await Receipt.findAllReceipts()
         console.log("try")
         res.render('allreceipts', {receipt: receipts,  regErrors: req.flash('regErrors')})
        
 
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
        Receipt.findById(id)
        .then(receipts =>{
            Tenant.findTenant().then(tenants =>{
                Room.findRoom().then(rooms =>{
                    res.render('editReceipt', {receipt: receipts, tenant: tenants, room:rooms,regErrors: req.flash('regErrors')})
    
                })     
    
            })
        })
           
    
    }catch{
        res.render('404')
    
    }
    
}
exports.UpdateReceipt = function(req, res){
    let receipt = new Receipt(req.body, req.params.id)
    receipt.update().then((status) => {
        //the post was successfully updated in the database
        //or user did have permission , but there were validation errors
        if(status=="success"){
        //post was updated in db
        req.flash("success", "Contract successfully updated.")
        req.session.save(()=>{
            res.redirect(`/receipt/${req.params.id}`)
        })

        }else{
            contract.errors.forEach(function(error){
                req.flash("errors", error)
            })
            req.session.save(function(){
                res.redirect(`/receipt/${req.params.id}`)
            })
        }


    }).catch(()=>{
        //if a post with the requested id doesn't exist
        // if the current visitor is not the owner of the requested contract
        req.flash("errors", "You do not have permission to permorm that action ")
        req.session.save(function(){
            res.redirect("/")
        })
    })
    
}
exports.DeleteReceipt = function(req, res){
    Receipt.delete(req.params.id)
    .then(()=>{
        req.flash("success", "Contract successfully Deleted. ")
        req.session.save(()=> {
            res.redirect('/allreceipts')
        })

    }).catch(()=>{
        req.flash("errors","You do not have permission to perform that action ")
        req.session.save(()=>{ res.redirect("/")})

    })
}





    
    
