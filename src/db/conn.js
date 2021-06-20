const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://rafathali:rafathali@rafathali.jgdp3.mongodb.net/rafathali?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successfull :)");
}).catch((error)=>{
    console.log("error");
})