//  简化路由
/**
 * @description 封装developer与DeveloperModel相关方法
 * @author 广源讲师
 */

// const DeveloperModel = require('../model/DeveloperModel')
const fs = require('fs')
const path = require('path')

const { serverOrigin } = require('../config/config')

// 获取developer数据
const getDeveloperDate = async (req,res,next) => {
    const directoryPath = path.resolve(__dirname,'../public/images/my')
    const urlImgPath = serverOrigin + '/public/images/my'
    // fs.readdir(directoryPath,(err,data) => {
    //     if(err) {
    //         res.json({
    //             code: '1004',
    //             message: '图片获取失败',
    //             err: null
    //         })
    //     }
    //     const imgsPath = data.map(item => item = serverOrigin + '/public/images/my' + item)
    //     res.json({
    //         code: '1100',
    //         message: '数据请求成功',
    //         data: imgsPath
    //     })
    // })
    res.json({
        code: '1100',
        message: '资源已找到',
        data: urlImgPath
    })
    
}



module.exports = {
    getDeveloperDate
}