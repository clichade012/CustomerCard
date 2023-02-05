const cardmodel = require('../model/cardmodel')



const getall = async function(req,res){
    try {
        const get = await cardmodel.find()
        if(!get){
            return res.status(404).send({status:false , send:"Data not found"})
        }
        return res.status(200).send({status:true , message:"Get all List", data:get})
    } catch (error) {
        return res.status(500).send({status:false , message:error.message})
    }
}

const create = async function(req,res){
    try{
        let data = req.body
        let { cardNumber ,cardType ,customerName ,status , vision ,  customerID } = data

        if(!cardNumber){
            return res.status(400).send({status:false , message:"cardNumber is required"})
        }
        if(!cardType){
            return res.status(400).send({status:false , message:"cardType is required"})
        }
        if(!customerName){
            return res.status(400).send({status:false , message:"customerName is required"})
        }
        if(!status){
            return res.status(400).send({status:false , message:"status is required"})
        }
        if(!vision){
            return res.status(400).send({status:false , message:"vision is required"})
        }
        if(!customerID){
            return res.status(400).send({status:false , message:"customerID is required"})
        }
        let create = await cardmodel.create(data)
        return res.status(201).send({status:true , message:"Card created Successfully", data:create})

    }catch{
        return res.status(500).send({status:false , message:error.message})
    }
}

module.exports = {getall , create}