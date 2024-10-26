const express = require('express')
const app = express()
const mongoose =require('mongoose')
const bodyParser=require('body-parser')
const { type } = require('os')

app.use(bodyParser.json())

const mongoURI="mongodb://localhost:27017/foodhub_db";
mongoose.connect(mongoURI)

const userSignup=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
})

const user=mongoose.model('signup',userSignup)


// post api
app.post('/api/user/signup',async(req,res)=>{
    const{name,email,password,message}=req.body
    const newSignup = new user({
        name,
        email,
        password,
        message
    })

    await newSignup.save()
    res.status(200).json({user:newSignup})
})

//Login api
app.post('/api/user/login',async(req,res)=>{
    const{email,password}=req.body
    // const user = await user.findOne({ email });
    const exitinguser=await user.findOne({email});

    if(exitinguser.password!=password){
        return res.status(400).json({message:'Invalid password'});
    }else{
        res.status(200).json({message:'Login Successfully',user:exitinguser});
    }
})

app.listen(3000,()=>{
    console.log("Server is running on 3000")
})

