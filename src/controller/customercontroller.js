const customermodel = require('../model/customermodel')
//get , delete , post
const {isValid} = require('../validation/validator')


const get = async function(req,res){
    try {
        let query = req.query
        
        
        if(Object.keys(query).length == 0){
            let getall = await customermodel.find({isDeleted:false})
            if(getall.length == 0){
                return res.status(404).send({status:false , message:"Customer not founded!"})
            }
            return res.status(200).send({status:true , message:"Fetch all document" , data:getall})
        }
        let getquery = await customermodel.find({...query , isDeleted:false})
        if(!getquery.length == 0){
            return res.status(404).send({status:false , message:"Customer not founded!"})
        }
        return res.status(200).send({status:true , message:"Fetch all document of status active" , data:getquery})
    } catch (error) {
      return res.status(500).send({status:false , message:error.message})   
    }
} 

const deletecustomer = async function(req,res){
    try {
        let customerid = req.params.customerId
        let exist = await customermodel.findOne({_id:customerid,isDeleted:false})
        if(!exist){
            return res.status(404).send({status:false , message:"CUSTOMER does n't exists or already deleted!"})
        }
       let deletec = await customermodel.findOneAndUpdate({_id:customerid},{$set:{isDeleted:true}},{new:true})
       return res.status(200).send({status:true , message:"Customer Document deleted", data:deletec})

    } catch (error) {
        return res.status(500).send({status:false , message:error.message})   
    }
}

const createcustomer = async function(req,res){
    try {
      
        let data = req.body
        let {firstName , lastName ,mobileNumber ,DOB,emailID , address , status} = data

        if(!firstName){
            return res.status(400).send({status:false , message:"FirstName is required"})
        }
        if(!isValid(firstName)){
            return res.status(400).send({ status: false, message: "firstName is invalid!" })
        }
        if (!isValidName(firstName)) {
            return res.status(400).send({ status: false, message: "firstName should n't contain  any extraa charcter!" })
         }

         if(!lastName){
            return res.status(400).send({status:false , message:"lastName is required"})
        }
        if(!isValid(lastName)){
            return res.status(400).send({ status: false, message: "lastName is invalid!" })
        }
        if (!isValidName(lastName)) {
            return res.status(400).send({ status: false, message: "lastName should n't contain  any extraa charcter!" })
         }
    

         if(!mobileNumber){
            return res.status(400).send({status:false , message:"mobileNumber is required"})
        }
        if(!isValid(mobileNumber)){
            return res.status(400).send({ status: false, message: "mobileNumber is invalid!" })
        }
        if (!isvalidPhone(mobileNumber)) {
            return res.status(400).send({ status: false, message: "Mobile no. should be in correct format!" })
         }

         if(!DOB){
            return res.status(400).send({status:false , message:"DOB is required"})
        }
        if (!isValid(emailID)){
             return res.status(400).send({ status: false, message: "emailID is invalid" })
        }
        if (!emailID) {
            return res.status(400).send({ status: false, message: "emailID is required" })
        }
        if (!isValidEmail(emailID)) {
            return res.status(400).send({ status: false, message: "emailID should be in correct format" })
        }
        let dupluicate = await customermodel.findOne({ emailID: emailID })
        if (dupluicate) {
          return res.status(409).send({ status: false, message: "this email already exists!" })
        }
        if(!address){
            return res.status(400).send({status:false , message:"Address is required"})
        }
        if(!status){
            return res.status(400).send({status:false , message:"status is required"})
        }
        let create = await customermodel.create(data)
        return res.status(201).send({status:true , message:"Successfully created",data:create})
    } catch (error) {
        return res.status(500).send({status:false , message:error.message})  
    }
}

module.exports = {get ,deletecustomer ,createcustomer}