const bcrypt = require('bcryptjs')
const usersCollection = require('../db').db().collection("users")
const validator = require('validator')
const tenatCollection = require('../db').db().collection('tenant')

let User = function (data) {
    this.data = data
    this.errors = []
}
User.prototype.cleanUp = function () {
    if (typeof (this.data.username) != "string") {
        this.data.username = ""

    }
    if (typeof (this.data.fullname) != "string") {
        this.data.fullname = ""

    }
    if (typeof (this.data.password) != "string") {
        this.data.password = ""

    }
    if (typeof (this.data.phonenumber) != "string") {
        this.data.phonenumber = ""

    }
    //get ride of any bogys properties
    this.data = {
        fullname: this.data.fullname.toLowerCase(),
        phonenumber: this.data.phonenumber,
        address: this.data.address,
        username: this.data.username.trim().toLowerCase(),
        password: this.data.password,
        role: this.data.role

    }

}

User.prototype.validate =  function(){
    return new Promise(async  (resolve, reject) =>{
        if (this.data.fullname == "") {
            this.errors.push("You must Provide a Full Name")
    
        }
        if (this.data.phonenumber == "") {
            this.errors.push("You must Provide a phonenumber")
        }
        if (this.data.address == "") {
            this.errors.push("You must Provide a Address")
        }
        if (this.data.username == "") {
            this.errors.push("You must Provide a User Name")
        }
        if (this.data.password == "") {
            this.errors.push("You must Provide a valid Password")
        }
        if (this.data.password.length > 0 && this.data.password.length < 12) {
            this.errors.push("Password must be at least 12 charachters")
        }
        if (this.data.password.length > 50) { 
            this.errors.push("Password can not  exceed 50 characters")
        }
        if (this.data.fullname.length > 0 && this.data.fullname.length < 5) {
            this.errors.push("Full Name must be at least 5 charachters")
        }
        if (this.data.fullname.length > 50) {
            this.errors.push("Full Name  can not  exceed 100 characters")
        }
        if (this.data.username.length > 0 && this.data.username.length < 5) {
            this.errors.push("User Name must be at least 5 charachters")
        }
        if (this.data.username.length > 10) {
            this.errors.push("User Name  can not  exceed 10 characters")
        }
        if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
            this.errors.push("User name can only contain letters and numbers")
        }
        //Only is username is valid then check to see if it's already taken
        if(this.data.username.length > 2 && this.data.username  < 31 && validator.isAlphanumeric(this.data.username)){
            let usernameExists = await usersCollection.findOne({username: this.data.username})

            if(usernameExists){
                this.errors.push("That username is already taken ")
            }
        }
            resolve()
    
    })
}
User.prototype.login = function () {

    return new Promise((resolve, reject) => {
        this.cleanUp();
        usersCollection.findOne({
            username: this.data.username,
            role: this.data.role
           

        }).then((attemptedUser) => {
            // console.log(role)
            if (attemptedUser && this.data.role == attemptedUser.role  && bcrypt.compareSync(this.data.password, attemptedUser.password) ) {
                resolve("Congrat!!!")
                           
                console.log(role)

            } else {
                console.log("reject")
                reject("Invalide Username and password")

            }
        }).catch(function () {
            reject("Please try again later ")
        })

    })


}
User.prototype.register = function(){
    return new Promise(async (resolve, reject)=> {
        // Step #1: Validate user data
        this.cleanUp()
        await this.validate()
    
        // Step #2: Only if there are no validation errors 
        // then save the user data into a database
         if (!this.errors.length) {
        //    
        //     if(!this.errors.length){
        //         userCollection.insertOne(this.data)
        //     }
         //hash user password
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
            resolve()
        }else{

            reject(this.errors)
        }
    
    })
}


module.exports = User