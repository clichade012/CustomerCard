const mongoose = require('mongoose')


const customerSchema = new mongoose.Schema({
    firstName :{
        type:String,
        require:true
    },
lastName:{
  type:String,
  require:true
},

mobileNumber:{
     type:String,
     require:true
 },
 
DOB :{
    type:Number,
    require:true
},
emailID :{
    type:String,
    require:true
 },
address :{
    type:String,
    require:true},


status:{
    type:String,
    enum:["Active", "Unactive"]
},
isDeleted:{
    type:Boolean,
    default:false
}

},{timestamps:true})


module.exports = mongoose.model("customer",customerSchema)