const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})





userSchema.pre('save', async function(next){
    console.log("hi from inside");
    if(this.isModified('password')){
        this.password =await bcrypt.hash(this.password,12);
    }
    next();
})


const User = mongoose.model('USER', userSchema)


module.exports = User;