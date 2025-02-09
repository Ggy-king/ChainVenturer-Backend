/**
 * @description articles路由
 * @author 广源讲师
 */

const express = require('express')
const router = express.Router()

const { getArticlesDate,getEssayData,getPersonArticle } = require('../controller/articles')

const checkTokenMiddleware = require('../middleware/checkTokenMiddleware')

router.get('/',(req,res,next) => {
    getEssayData(req,res,next)
})

router.get('/main/:num',(req,res,next) => {
    getArticlesDate(req,res,next)
})

router.get('/user',checkTokenMiddleware,(req,res,next) => {
    getPersonArticle(req,res,next)
})


module.exports = router