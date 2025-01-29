/**
 * @description write路由
 * @author 广源讲师
 */

const express = require('express')
const router = express.Router()
const { postWriteInfo,postUploadImg } = require('../controller/write')
const checkTokenMiddleware = require('../middleware/checkTokenMiddleware')
const uploadImgMiddleware = require('../middleware/uploadImgMiddleware')
const { storagePath } = require('../config/config')


router.post('/',checkTokenMiddleware,(req,res,next) => {
    
    postWriteInfo(req,res,next)
})

router.post('/cover-img',checkTokenMiddleware,uploadImgMiddleware(storagePath),(req,res,next) => {
    postUploadImg(req,res,next)
    
})


module.exports = router