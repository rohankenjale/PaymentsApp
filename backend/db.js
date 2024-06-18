const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL)

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