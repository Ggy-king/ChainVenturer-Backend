//  简化路由
/**
 * @description 封装write与WriteModel相关方法
 * @author 广源讲师
 */

const WriteModel = require('../model/WriteModel')

let imgPath

const postUploadImg = async (req,res,next) => {
    const file = req.file
    if (!file) {
      return res.status(400).json({ code:'6001',message: '图片上传失败' })
    }
    imgPath = file.path
    res.json({
        code: '6000',
        message: '图片上传成功',
        data: imgPath
    })
}

const postWriteInfo = (req,res,next) => {
    const { formObj } = req.body
    WriteModel.create({...formObj,imgPath,author:req.user.username})
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
    postUploadImg,
    postWriteInfo,
}