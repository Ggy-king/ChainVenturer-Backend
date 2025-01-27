//  简化路由
/**
 * @description 封装write与WriteModel相关方法
 * @author 广源讲师
 */


const WriteModel = require('../model/WriteModel')

const postWriteInfo = (req,res,next) => {
    const {formObj} = req.body
    WriteModel.create({...formObj,author:req.user.username})
    .then(data => {
        res.json({
            code: '3000',
            message: '文章创建成功',
            data:data
        })
    })
    .catch(err => {
        res.json({
            code: '3003',
            message: '文章创建失败',
            err
        })
    })
    
}

module.exports = {
    postWriteInfo
}