const express = require('express')
const router = express.Router()

const { getMarketContract,getContractSimple } = require('../controller/market')

router.get('/',(req,res,next) => {
    getMarketContract(req,res,next)
})
router.get('/simple',(req,res,next) => {
    getContractSimple(req,res,next)
})



module.exports = router