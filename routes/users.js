/**
 * @description users路由
 * @author 广源讲师
 */


const express = require('express')
const router = express.Router()

const {getUsersInfo,postUsersInfo} = require('../controller/users')


router.get('/', (req, res, next) => {

  getUsersInfo(req,res,next)
});

router.post('/',(req, res, next) => {
  
  postUsersInfo(req,res,next)
});




module.exports = router
