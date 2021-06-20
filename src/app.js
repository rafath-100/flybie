const express=require("express");
const path=require("path");
require("./db/conn");
const bodyParser=require("body-parser");
const User = require("./models/usermessage");
const hbs=require("hbs");
const { registerPartial, registerPartials } = require("hbs");
const Form = require("./models/userform");
const { post } = require("jquery");

const app=express();
const port=process.env.PORT || 4npm run dev
000;

//setting the path
const staticpath=path.join(__dirname, "../public");
const templatepath=path.join(__dirname, "../templates/views");
const partialpath=path.join(__dirname, "../templates/partials");

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(bodyParser.json())

//app.use(bodyParser.json())

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);

//routing
//app.get(path, calling)
app.get("/detail",async(req,res)=>{
    try{
        const detail=await Form.find();
        res.status(200).send(detail)

    }
    catch(error){
        console.log("error");
    }
});
app.post("/detail",async(req,res)=>{
    try{
        console.log(req.body)
        const userData = new Form(req.body);
        
        const formdata= await userData.save();
        res.status(201).send(formdata);

    }catch(error){
        res.status(500)
    }
})
// //clear form
// let btnClear = online_ticketing.querySelector('button');
// let inputs = online_ticketing.querySelector('input');

// btnClear.addEventListener('clear form',()=>{
//     inputs.forEach(input=> input.value);
// })

// //
 
app.get("/data/:from/:to",async(req,res)=>{
    try{
        const from=req.params.from;
        const to=req.params.to;
        const index=await Form.findOne({from,to});
        res.send(index);
    }catch(error){
        res.status(500);
    }
});

app.get("/contact",async(req,res)=>{
    try{
        const usercontact=await User.find();
        res.send(usercontact);
    }
    catch(error){
        console.log("error");
    }
});
app.post("/contact",async(req,res)=>{
    try{
        
        const userData = new User(req.body);
        await userData.save();
        res.status(200).render("index");
    }catch(error){
        res.status(500).send(error);
    }
})

app.get("/",(req,res)=>{
    res.render("index");
})
app.post("/",async(req,res)=>{
    try{
        
        //const from=req.body.from;
        //console.log(from);
        const to=req.body.to;
        
        
        const formData=await Form.findOne({to:to})
        //console.log(formData);

        res.status(200)

        res.render("index",{
            from: formData.from,
            to: formData.to,
            date: formData.date,
            time: formData.time,
            price: formData.price
        });
    }catch(error){
        console.log(error);
    }
})

//server create
app.listen(port,()=>{
    console.log(`server is running on port no. ${port}`);
})


