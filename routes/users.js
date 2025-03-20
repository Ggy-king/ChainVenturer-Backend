/**
 * @description users路由
 * @author 广源讲师
 */


const express = require('express')
const router = express.Router()

const { postUsersInfo,patchCollectEssay,getCollectEssay } = require('../controller/users')
const checkTokenMiddleware = require('../middleware/checkTokenMiddleware')

// 简单验证
router.get('/token',checkTokenMiddleware, (req, res, next) => {
  res.json({
    code: '1000',
    message: 'token验证成功',
    data: null
  })
})

// 注册登录
router.post('/',(req, res, next) => {
  postUsersInfo(req,res,next)
})

// 更新收藏
router.patch('/collect',checkTokenMiddleware, (req, res, next) => {
  patchCollectEssay(req,res,next)
})

// 拿到收藏列表
router.get('/collect',checkTokenMiddleware, (req, res, next) => {
  getCollectEssay(req,res,next)
})





module.exports = router
