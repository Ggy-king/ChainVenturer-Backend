// 单个文章详情获取
/**
 * @description 封装articles与WriteModel相关方法
 * @author 广源讲师
 */

const WriteModel = require('../model/WriteModel')
const { serverOrigin } = require('../config/config')

const getCarouselImg = async(req,res,next) => {
    WriteModel.aggregate([
        {$sample:{size: 4}},
        { $project: { _id: 1, imgPath: 1, title:1 } }
    ]).exec()
    .then(data => {
        data.map(item => item.imgPath = serverOrigin + '/' + item.imgPath.replace(/\\/g, '/'))
        res.json({
            code: '3000',
            message: '轮播图查询成功',
            data
        })
    })
    .catch(err => {
        res.json({
           code: '3002',
           message: '轮播图查询失败',
           err: null
        })
    })
}


const getEssayHot = async(req,res,next) => {
    WriteModel.find().sort({ view_num: -1 }).limit(12).exec()
    .then(data => {
        data.map(item => item.imgPath = serverOrigin + '/' + item.imgPath.replace(/\\/g, '/'))
        res.json({
            code: '3000',
            message: '最热文章获取成功',
            data
        })
    })
    .catch(err => {
        res.json({
           code: '3002',
           message: '最热文章获取失败',
           err: null
        })
    })
}

const getVariousEssay = async (req,res,next) => {
    try {
        // 要做随机的话以后说
        if(req.query.topic) {
            const data = await WriteModel.find({topic: req.query.topic}).limit(12).exec()
            data.map(item => item.imgPath = serverOrigin + '/' + item.imgPath.replace(/\\/g, '/'))
            
            return res.json({
                code: '3000',
                message: '文章获取成功',
                data
            })
            
        }
        if(req.query.technology) {
            const data = await WriteModel.find({technology: req.query.technology}).limit(12).exec()
            data.map(item => item.imgPath = serverOrigin + '/' + item.imgPath.replace(/\\/g, '/'))
            
            return res.json({
                code: '3000',
                message: '文章获取成功',
                data
            })
        }
        if(req.query.currency) {
            const data = await WriteModel.find({currency: req.query.currency}).limit(12).exec()
            data.map(item => item.imgPath = serverOrigin + '/' + item.imgPath.replace(/\\/g, '/'))
            console.log(req.query.currency)
            return res.json({
                code: '3000',
                message: '文章获取成功',
                data
            })
        }
    } catch (error) {
        res.json({
            code: '3002',
            message: '文章获取失败',
            err: null
        })
    }
    
}

module.exports = {
    getEssayHot,
    getVariousEssay,
    getCarouselImg
}