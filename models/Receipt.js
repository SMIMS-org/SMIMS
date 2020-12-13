const receiptCollection  =require('../db').db().collection("receipt")
const  ObjectId  = require('mongodb').ObjectID
const validator = require('validator')


let Receipt = function (data, requistedReceiptId) {
    this.data = data
    this.errors = []
    this.requistedReceiptId = requistedReceiptId
}

Receipt.prototype.cleanUp = function () {
    // if (typeof (this.data.fullname) != "string") {
    //     this.data.fullname = ""

    // }

       if (typeof (this.data.receiptNo) != "string") {
        this.data.receiptNo = ""

    }
    if (typeof (this.data.date) != "string") {
        this.data.date = ""

    }
   
    if (typeof (this.data.tenantName) != "string") {
        this.data.tenantName = ""

    }
    if (typeof (this.data.startDate) != "string") {
        this.data.startDate = ""

    }
    if (typeof (this.data.endDate) != "string") {
        this.data.endDate = ""
    }
    
     if (typeof (this.data.months) != "string") {
        this.data.months = ""

    }

    if (typeof (this.data.roomno) != "string") {
        this.data.roomno = ""

    }
    
    if (typeof (this.data.price) != "string") {
        this.data.price = ""

    }
    if (typeof (this.data.total) != "string") {
        this.data.total = ""

    }
    if (typeof (this.data.vat) != "string") {
        this.data.vat = ""

    }

    if (typeof (this.data.totalAmount) != "string") {
        this.data.totalAmount = ""

    }
    
    
    
    //get ride of any bogys properties
    this.data = {
        receiptNo: this.data.receiptNo,
        fullnameId: new ObjectId(this.data.tenantName),
        // tinnumber: this.data.tinnumber,
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        // roomsize: this.data.roomsize,
        roomnoId: new ObjectId(this.data.roomno),
        date: this.data.date,
        price: this.data.price,
        total: this.data.total,
        vat:this.data.vat,
        totalAmount: this.data.totalAmount,
        createdDate:  new Date()

    }

}
Receipt.prototype.validate =  function(){
    return new Promise(async  (resolve, reject) =>{
        if (this.data.receiptNo == "") {
            this.errors.push("You must Select a Receipt No.")
    
        }
        if (this.data.tenantName == "") {
            this.errors.push("You must Select a Full Name")
    
        }
        if (this.data.tinNumber == "") {
            this.errors.push("You must Provide a Tin Number")
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
        if (this.data.roomno == "") {
            this.errors.push("You must Provide a Room no")
        }
        if (this.data.price == "") {
            this.errors.push("You must Provide a Price")
        }
        if (this.data.total == "") {
            this.errors.push("You must Provide a Total")
        }
        if (this.data.vat == "") {
            this.errors.push("You must Provide a Vat")
        }

        if (this.data.totalAmount == "") {
            this.errors.push("You must Provide a Total Amount")
        }
    //Only is contractNo is valid then check to see if it's already taken
        if(this.data.receiptNo.length > 0 && this.data.receiptNo  < 30 ){
            console.log("ReceiptId")
            let ReceiptNoExists = await receiptCollection.findOne({receiptNo: this.data.receipt})
            console.log(receiptNo)
           
            if(ReceiptNoExists){
                this.errors.push("That Receipt No. is already taken ")
            }
       }
            
       resolve()     
    
    })
    
}
Receipt.prototype.addReceipt = function(){
    
    return new Promise(async (resolve, reject)=> {
        // Step #1: Validate user data
        this.cleanUp()
        await this.validate()
    console.log("hi1")
        // Step #2: Only if there are no validation errors 
        // then save the user data into a database
         if (!this.errors.length) {
            console.log("hi2")
            await receiptCollection.insertOne(this.data)
            
            resolve("Congrat")
        }else{
            console.log("errors")
            reject(this.errors)
        }
    
    })
}

Receipt.findAllReceipts = function(){   
    return new Promise(async (resolve, reject)=> {
       let receipts = await receiptCollection.aggregate([
           {$lookup: {from:"tenant", localField: "fullnameId", foreignField:"_id", as: "tenantDocument"}},
           {$lookup: {from:"room", localField: "roomnoId", foreignField:"_id", as: "roomDocument"}},
            {$project: {
                receiptNo: 1,
                date: 1,
                startDate :1,
                endDate :1,
                price :1,
                total :1,
                vat:1,
                totalAmount:1,
                fullnameId:{$arrayElemAt: ["$tenantDocument",0]},
                roomnoId: {$arrayElemAt: ["$roomDocument",0]}
            }}
       ]).toArray()
      
       //clean up tenant and rooms
       receipts = receipts.map(function (receipts){
        receipts.fullnameId= {
               _id: receipts.fullnameId._id,
               fullname: receipts.fullnameId.fullname
            },
            receipts.roomnoId={
               _id: receipts.roomnoId._id,
               roomno: receipts.roomnoId.roomno
           } 
           return receipts
        
       })
       if(receipts.length){
           console.log(receipts)
           resolve(receipts)  
           console.log("tenantDocument")

        }else{
            reject()

        }
    })
     
}

Receipt.findById = function(id){
    return new Promise(async (resolve, reject)=> {
        console.log("hi every 4one")
       if(typeof(id)!="string" || !ObjectId.isValid(id)){
        console.log("hi every 4one")

           reject()
           
           return
  
       }
       console.log("hi every 5one")
       let receipts = await receiptCollection.aggregate([
  
           {$match: {_id: new ObjectId(id)}},
           {$lookup: {from:"tenant", localField: "fullnameId", foreignField:"_id", as: "tenantDocument"}},
           {$lookup: {from:"room", localField: "roomnoId", foreignField:"_id", as: "roomDocument"}},
            {$project: {
                receiptNo: 1,
                date: 1,
                startDate :1,
                endDate :1,
                price :1,
                total :1,
                vat:1,
                totalAmount:1,
                fullnameId:{$arrayElemAt: ["$tenantDocument",0]},
                roomnoId: {$arrayElemAt: ["$roomDocument",0]}
            }}
       ]).toArray()
       receipts = receipts.map(function (receipts){
        receipts.fullnameId= {
               _id: receipts.fullnameId._id,
               fullname: receipts.fullnameId.fullname
            },
            receipts.roomnoId={
               _id: receipts.roomnoId._id,
               roomno: receipts.roomnoId.roomno
           } 
           return receipts
        
       })


       if(receipts.length){
           console.log(receipts[0])
           resolve(receipts[0])  
           console.log("tenantDocument")

        }else{
            reject()

        }
    })
    
     
}

Receipt.prototype.update = function(){
    return new Promise(async (resolve, reject) => {
        try{
            console.log("receipt")
            let receipt = await Receipt.findById(this.requistedReceiptId)
           if(receipt.length){
                console.log(receipt)
               let status =  await this.actuallyUpdate()
               console.log("receipt")
                resolve(status)

            }else{
                reject()
            }
        }catch{
            reject()
        }


    })
}

Receipt.prototype.actuallyUpdate = function(){
    return new Promise(async (resolve, reject)=>{
        this.cleanUp()
        this.validate()
        if(!this.errors.length){
           await receiptCollection.findOneAndUpdate({_id: new ObjectId(this.requistedReceiptId )}, 
            {$set: {receiptNo: this.data.receiptNo, fullnameId: this.data.tenantName,
            startDate: this.data.startDate, endDate: this.data.endDate, roomonId: this.data.roomno,
            date: this.data.date, price: this.data.price, total: this.data.total, vat: this.data.vat,
            totalAmount: this.data.totalAmount }})
            console.log("success")
            resolve("success")

        }else{
            console.log("error")
            reject("failure")

        }
    })
}
Receipt.delete = function(receiptIdToDelete){
    return new Promise(async(resolve, reject)=>{
        try{
            let receipt = await Receipt.findById(receiptIdToDelete)
            console.log(typeof(receipt))

             if(receipt){
            await  receiptCollection.deleteOne({_id: new ObjectId(receiptIdToDelete)})
           resolve()
          }
        //   else{

            // }
        }catch{
            reject()

        }
    })
}


module.exports = Receipt