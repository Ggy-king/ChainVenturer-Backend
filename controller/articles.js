/**
 * @description 封装articles与WriteModel相关方法
 * @author 广源讲师
 */

const WriteModel = require('../model/WriteModel')
const { serverOrigin } = require('../config/config')

// 获取文章列表
const getArticlesDate = (req,res,next) => {
    const { page = 1, limit = 18 } = req.query
    WriteModel.find().sort({createdAt: -1}).skip((page - 1) * limit).limit(limit).exec()
    .then(data => {
        data.map(item => item.imgPath = serverOrigin + '/' + item.imgPath.replace(/\\/g, '/'))
        res.json({
            code: '3000',
            message: '查询成功',
            data
        })
        
    })
    .catch(err => {
        res.json({
            code: '3002',
            message: '查询失败',
            err: null
        })
    })
}

// 单个文章详情获取
const getEssayData = (req,res,next) => {
    WriteModel.find({_id: req.query.id}).exec()
    .then(data => {
        data[0].imgPath = serverOrigin + '/' + data[0].imgPath.replace(/\\/g, '/')
        res.json({
            code: '3000',
            message: '查询成功',
            data
        })
    })
    .catch(err => {
        res.json({
            code: '3002',
            message: '查询失败',
            err: null
        })
    })
}

// 获取某用户的文章情况
const getPersonArticle = (req,res,next) => {
    if(req.query.id) {
        WriteModel.find({_id: req.query.id}).exec()
        .then(data => {
            if(req.user.username === data[0].author){
                data[0].imgPath = serverOrigin + '/' + data[0].imgPath.replace(/\\/g, '/')
                return res.json({
                    code: '3000',
                    message: '查询成功',
                    data
                })
            }
            res.json({
                code: '2008',
                message: '用户账户不匹配',
                data: null
            })
        })
        .catch(err => {
            res.json({
                code: '3002',
                message: '查询失败',
                err: null
            })
        })
    } else {
        WriteModel.find({author: req.user.username}).sort({createdAt: -1}).limit(20).exec()
        .then(data => {
            data.map(item => item.imgPath = serverOrigin + '/' + item.imgPath.replace(/\\/g, '/'))
            res.json({
                code: '3000',
                message: '查询成功',
                data
            })
        })
        .catch(err => {
            res.json({
                code: '3002',
                message: '查询失败',
                err: null
            })
        })
    }
    
}

module.exports = {
    getArticlesDate,
    getEssayData,
    getPersonArticle
}