/**
 * @description write路由
 * @author 广源讲师
 */

const express = require('express')
const checkTokenMiddleware = require('../middleware/checkTokenMiddleware')
const { postWriteInfo } = require('../controller/write')
const router = express.Router()

router.post('/',checkTokenMiddleware,(req,res,next) => {
    
    postWriteInfo(req,res,next)
})

module.exports = router