const express = require('express')
const router = express.Router()

const {get ,deletecustomer ,createcustomer} = require('../controller/customercontroller')

const {getall , create} = require('../controller/cardcontroller')

router.get('/get/:customerId',get)

router.delete('/delete/:customerId',deletecustomer)

router.post('/create',createcustomer)

router.get('/getall',getall)

router.post('/create/card',create)


module.exports = router;