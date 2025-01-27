//  简化路由
/**
 * @description 封装users与UsersModel相关方法
 * @author 广源讲师
 */

const UsersModel = require('../model/UsersModel')
const { secret } = require('../config/config')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// 获取用户信息 登录操作
const getUsersInfo = (req,res,next) => {

    // UsersModel.find().sort({ data: -1 }).limit(2).exec()
    // .then(data => {
    //     res.json({
    //         code: '钱利521',
    //         message: '成功',
    //         data:data
    //     })


    // }).catch(err => {
    //     res.json({
    //         code: '1002',
    //         message: '失败',
    //         data:err
    //     })
    // })
    res.send('123')
}


// 获取用户信息 登录操作

const postUsersInfo = async (req,res,next) => {
    // 登录 没有则注册
    const {username,password} = req.body

    const user = await UsersModel.findOne({username}) //查找数据库中是否有这个账户

    if(user) {
        // 登录
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            // 密码验证成功，返回成功响应（这里可以发送JWT令牌等）
            const token = jwt.sign({
                username,
                _id: user._id
            },secret,{
                expiresIn: 60 * 60 * 24 * 7
            })
            res.json({ code: '2000',message: '登录成功',token:token });
        } else {
            // 密码验证失败
            res.json({ code: '2006',message: '身份验证失败' });
        }

    } else {
        // 注册
        // 盐值 二次加密至数据库
        
        const salt = await bcrypt.genSalt(10)
        const receivedPass = await bcrypt.hash(password, salt)

        UsersModel.create({username,password:receivedPass})
        .then(data => {
            res.json({
                code: '3000',
                message: '用户注册成功',
                data: data
            })
        })
        .catch(err => {
            res.json({
                code: '3003',
                message: '用户注册失败',
                err
            })
        })
            

    }

    
}

module.exports = {
    getUsersInfo,
    postUsersInfo
}