const express = require('express')
const router = express.Router()

const { getMarketContract } = require('../controller/market')

router.get('/',(req,res,next) => {
    getMarketContract(req,res,next)
})


module.exports = router