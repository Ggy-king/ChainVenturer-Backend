const express = require('express')
const router = express.Router()
const { getEssayHot, getVariousEssay,getCarouselImg } = require('../controller/total')



router.get('/',(req,res,next) => {
    getVariousEssay(req,res,next)
})

router.get('/hot',(req,res,next) => {
    getEssayHot(req,res,next)
})

router.get('/carousel',(req,res,next) => {
    getCarouselImg(req,res,next)
})

module.exports = router