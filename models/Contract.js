const contractCollection  =require('../db').db().collection("contract");
const { ObjectId } = require('mongodb');
const validator = require('validator');
const Tenant  = require('../db').db().collection("contract");
const objectId = require('mongodb').ObjectID

let Contract = function (data,requestedContractId) {
    this.data = data
    // this.userid= userid
    this.errors = []
    this.requestedContractId = requestedContractId
}

Contract.prototype.cleanUp = function () {
    // if (typeof (this.data.fullname) != "string") {
    //     this.data.fullname = ""

    // // }
    // if (typeof (this.data.fullnameId) != "string") {
    //     this.data.fullnameId = ""

   // }
    if (typeof (this.data.startDate) != "string") {
        this.data.startDate = ""

    }
    if (typeof (this.data.endDate) != "string") {
        this.data.endDate = ""
    }
   
    if (typeof (this.data.contractNo) != "string") {
        this.data.contactNo = ""

    }
    if (typeof (this.data.date) != "string") {
        this.data.date = ""

    }
    if(typeof(this.data.price) !="string"){
        this.data.price=""

    }
    if(typeof(this.data.advance) !="string"){
        this.data.advance=""

    }
    //get ride of any bogys properties
    this.data = {
        contractNo: this.data.contractNo,
        date: this.data.date,
        fullnameId: new objectId(this.data.tenantName),
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        roomnoId:new objectId(this.data.roomno) ,
        price:this.data.price,
        advance:this.data.advance,
        createdDate:  new Date(),

    }
    
    
    
}
Contract.prototype.validate =  function(){
    return new Promise(async  (resolve, reject) =>{
        if (this.data.contractNo == "") {
            this.errors.push("You must Select a Contract No.")
    
        }
        if (this.data.tenantName == "") {
            this.errors.push("You must Select a Full Name")
    
        }
     
        if (this.data.startDate == "") {
            this.errors.push("You must Provide a Contract Start Date")
        }
        if (this.data.endDate == "") {
            this.errors.push("You must Provide a Contract End Date")
        }
        if (this.data.date == "") {
            this.errors.push("You must Provide a Contract Date")
        }
        if (this.data.price == "") {
            this.errors.push("You must Provide a Price")
        }
        if (this.data.advance == "") {
            this.errors.push("You must Provide a Advance")
        }
       
    //Only is contractNo is valid then check to see if it's already taken
        if(this.data.contractNo.length > 0 && this.data.contractNo  < 30 && validator.isAlphanumeric(this.data.contractNo)){
            console.log("contractId")
            let ContractNoExists = await contractCollection.findOne({contractNo: this.data.contractNo})
            
            

            if(ContractNoExists){
                this.errors.push("That Contract No. is already taken ")
            }else{
                console.log("ContractNoExists")

            }
       }
            
       resolve()     
    
    })
    
}
Contract.prototype.addContract = function(){

    
    return new Promise(async (resolve, reject)=> {
        // Step #1: Validate user data
        this.cleanUp()
        await this.validate()
    console.log("hi1")
        // Step #2: Only if there are no validation errors 
        // then save the user data into a database
         if (!this.errors.length) {
            console.log("hi2")
            await contractCollection.insertOne(this.data)
            
            resolve("Congrat")
        }else{
            console.log("errors")
            reject(this.errors)
        }
    
    })
}

Contract.prototype.update = function(){
    return new Promise(async (resolve, reject) => {
        try{
            let contract = await Contract.findById(this.requestedContractId)
            if(contract){
                console.log(contract[0])
               let status =  await this.actuallyUpdate()
                resolve(status)

            }else{
                reject()
            }
        }catch{
            reject()
        }

    })
}
Contract.prototype.actuallyUpdate = function(){
    return new Promise(async (resolve, reject)=>{
        this.cleanUp()
        this.validate()
        if(!this.errors.length){
           await contractCollection.findOneAndUpdate({_id: new ObjectId(this.requestedContractId)}, 
            {$set: {contractNo: this.data.contractNo, date: this.data.date,
            startDate: this.data.startDate, endDate: this.data.endDate,
             price: this.data.price, advance: this.data.advance}})
             console.log(typeof(fullnameId))
            resolve("success")
        }else{
            reject("failure")

        }
    })
}

Contract.findAll = function(){
    console.log("hi every 3one")
    return new Promise(async (resolve, reject)=> {
      
       let contracts = await contractCollection.aggregate([
           {$lookup: {from:"tenant", localField: "fullnameId", foreignField:"_id", as: "tenantDocument"}},
           {$lookup: {from:"room", localField: "roomnoId", foreignField:"_id", as: "roomDocument"}},
            {$project: {
                contractNo: 1,
                date: 1,
                startDate :1,
                endDate :1,
                price :1,
                advance :1,
                fullnameId:{$arrayElemAt: ["$tenantDocument",0]},
                roomnoId: {$arrayElemAt: ["$roomDocument",0]}
            }}
       ]).toArray()
       console.log(contracts)
       //clean up tenant and rooms
       contracts = contracts.map(function (contract){
        contract.fullnameId= {
               _id: contract.fullnameId._id,
               fullname: contract.fullnameId.fullname
            },
            contract.roomnoId={
               _id: contract.roomnoId._id,
               roomno: contract.roomnoId.roomno
           } 
           return contract
        
       })
       if(contracts.length){
           console.log(contracts)
           resolve(contracts)  
           console.log("tenantDocument")

        }else{
            reject()

        }
    })
     
}

Contract.findById = function(id){
    console.log("hi every 3one")
    return new Promise(async (resolve, reject)=> {
        console.log("hi every 3one")
       if(typeof(id)!="string" || !objectId.isValid(id)){
        
           reject()
           return
       }
       let contracts = await contractCollection.aggregate([
           {$match: {_id: new objectId(id)}},
           {$lookup: {from:"tenant", localField: "fullnameId", foreignField:"_id", as: "tenantDocument"}},
           {$lookup: {from:"room", localField: "roomnoId", foreignField:"_id", as: "roomDocument"}},
            {$project: {
                contractNo: 1,
                date: 1,
                startDate :1,
                endDate :1,
                price :1,
                advance :1,
                fullnameId:{$arrayElemAt: ["$tenantDocument",0]},
                roomnoId: {$arrayElemAt: ["$roomDocument",0]}
            }}
       ]).toArray()

       //clean up tenant and rooms
       contracts = contracts.map(function (contract){
        contract.fullnameId= {
               _id: contract.fullnameId._id,
               fullname: contract.fullnameId.fullname
            },
            contract.roomnoId={
               _id: contract.roomnoId._id,
               roomno: contract.roomnoId.roomno
           } 
           return contract
        
       })
       

       if(contracts.length){
           console.log(contracts[0])
           resolve(contracts[0])  
           console.log("tenantDocument")

        }else{
            reject()

        }
    })
     
}
Contract.delete = function(contractIdToDelete){
    return new Promise(async(resolve, reject)=>{
        try{
            let contract = await Contract.findById(contractIdToDelete)
           // console.log(typeof(contract))

             if(contract){
            await  contractCollection.deleteOne({_id: new ObjectId(contractIdToDelete)})
           resolve()
          }
        //   else{

            // }
        }catch{
            reject()

        }
    })
}


module.exports = Contract