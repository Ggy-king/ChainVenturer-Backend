/**
 * @description 封装articles与WriteModel相关方法
 * @author 广源讲师
 */

const WriteModel = require('../model/WriteModel')
const { serverOrigin } = require('../config/config')

// 获取文章列表
const getArticlesDate = (req,res,next) => {
    WriteModel.find().sort({createdA: -1}).limit(24).exec()
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

module.exports = {
    getArticlesDate,
    getEssayData
}