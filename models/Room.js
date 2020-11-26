const bcrypt = require('bcryptjs')
const roomCollection = require('../db').db().collection("room")
const validator = require('validator')


let Room = function (data) {
    this.data = data
    this.errors = []
}

Room.prototype.cleanUp = function () {
    if (typeof (this.data.roomno) != "string") {
        this.data.roomno = ""

    }
    if (typeof (this.data.roomsize) != "string") {
        this.data.roomsize = ""

    }
    if (typeof (this.data.roomtype) != "string") {
        this.data.roomsize = ""

    }

   
    //get ride of any bogys properties
    this.data = {
        roomno: this.data.roomno,
        roomsize: this.data.roomsize,
        roomtype: this.data.roomtype
    }
}
Room.prototype.validate =  function(){
    return new Promise(async  (resolve, reject) =>{
        if (this.data.roomno == "") {
            this.errors.push("You must Provide a Room No.")
    
        }
        if (this.data.roomsize == "") {
            this.errors.push("You must Provide a Room Size")
        }
        if (this.data.roomtype == "") {
            this.errors.push("You must Provide a Room Type")
        }
      
        //Only is roomno is valid then check to see if it's already taken
        if(this.data.roomno.length > 3 && this.data.roomno  < 6 && validator.isAlphanumeric(this.data.roomno)){
            let roomExists = await roomCollection.findOne({room: this.data.room})
            console.log(roomExists)
            if(usernameExists){
                this.errors.push("That room No is already exist ")
            }
       }
            resolve()
    
    })
}
Room.prototype.addRoom = function(){
    return new Promise(async (resolve, reject)=> {
        // Step #1: Validate user data
        this.cleanUp()
        await this.validate()
    
        // Step #2: Only if there are no validation errors 
        // then save the user data into a database
         if (!this.errors.length) {
       
            await roomCollection.insertOne(this.data)
            resolve()
        }else{

            reject(this.errors)
        }
    
    })
}
Room.findRoom = function(req,res){
    return new Promise(async (resolve, reject)=> {
       
          let  room= await roomCollection.find().toArray()
          if(room){
              resolve(room)
          }else{
              reject()
          }
            }
        )
    }   
            

module.exports = Room