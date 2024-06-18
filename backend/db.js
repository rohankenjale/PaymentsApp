const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rohankenjale50:YWUhF86NTxIdr3Gt@cluster0.cyes1cb.mongodb.net/')

const UserSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    username :String,
    password : String,
}
)

const AccountSchema = new mongoose.Schema({
        userId: String,
        balance: Number
    
})

const Account = mongoose.model('Account',AccountSchema)
const User = mongoose.model('User',UserSchema);

module.exports = {
    User,
    Account
}