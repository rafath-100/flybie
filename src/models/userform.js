const mongoose=require("mongoose");

const formSchema=mongoose.Schema({
        from:{
            type: String,
            
        },
        to:{
            type: String,
            
        },
        date:{
            type: String,
            
        },
        time:{
            type: String,
            
        },
        price:{
            type: String,
            
        },    
})

const Form= new mongoose.model("details",formSchema);
module.exports=Form;