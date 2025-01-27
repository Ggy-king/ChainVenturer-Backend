const jwt = require('jsonwebtoken')
const { secret } = require('../config/config')

module.exports = (req,res,next) => {
    const token = req.get('Authorization')
    if(!token) {
        return res.json({
            code: '2007',
            message: 'token 缺失',
            data: null
        })
    }
    jwt.verify(token,secret,(err,data) => {
        if(err) {
            return res.json({
                code: '2008',
                message: 'token 校验失败',
                data: err
            })
        }

        req.user = data  //向路由中添加当前用户信息
        // 校验成功
        next()
    })
}
