/**
 * @description articles路由
 * @author 广源讲师
 */

const express = require('express')
const router = express.Router()

const { getArticlesDate } = require('../controller/articles')
const { getEssayData } = require('../controller/articles')

router.get('/',(req,res,next) => {
    getEssayData(req,res,next)
})

router.get('/:id',(req,res,next) => {
    getArticlesDate(req,res,next)
})

module.exports = router