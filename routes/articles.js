/**
 * @description articles路由
 * @author 广源讲师
 */

const express = require('express')
const router = express.Router()

router.post('/',(req,res,next) => {
    res.send('已收到')
})

module.exports = router