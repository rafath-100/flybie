const mongoose=require("mongoose");
const validator=require("validator");

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: 2
    },
    email:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("ISorry, Invalid email-id")
            }
        }
    },
    phone:{
        type: Number,
        required: true,
        min: 10
    },

    message:{
        type: String,
        required: true,
        minLength: 5
    },
})


// we need a collection
const User = new mongoose.model("User",userSchema);
module.exports= User;
