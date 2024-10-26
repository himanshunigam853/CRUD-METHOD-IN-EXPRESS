const express=require('express')
const app=express()
const mongoose = require('mongoose')
const bodyParser=require('body-parser')
const { type } = require('os')

app.use(bodyParser.json())

const mongoURI="mongodb://localhost:27017/foodhub_db";
mongoose.connect(mongoURI)

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requred:true,
        unique:true
    },
    number:{
        type:Number,
        required:true
    },
    dob:{
        type:Number,
        required:true
    },
    weekened:{
        type:String,
        required:true
    }

})

    const registraion = mongoose.model('registraion',userSchema);


 // Post APIS
 app.post('/api/user/registration',async(req,res)=>{
     
        const{first_name,last_name,email,number,dob,weekened} = req.body

        const newUser = new registraion({
            first_name,
            last_name,
            email,
            number,
            dob,
            weekened
        });

        await newUser.save()
        res.status(200).json({message:'User created Successfull',user:newUser})
  
 })   

//  Get APIs
app.get('/api/user/registration',async(req,res)=>{
    const getData = await registraion.find()
    res.status(200).json(getData)
})

// Delete APIs
app.delete('/api/user/registration/:id',async(req,res)=>{
    const {id}=req.params
    const deleteUser = await registraion.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully", user: deleteUser })
})

// Edit APIs
app.put('/api/user/registration/:id',async(req,res)=>{
    const {id}=req.params;
    const updatedata=req.body;
    const updateUserData=await registraion.findByIdAndUpdate(id,updatedata,{new:true,runValidators:true})
    res.status(200).json({user:updateUserData})

})


app.listen(3000,()=>{
    console.log("server is running on 3000");
})