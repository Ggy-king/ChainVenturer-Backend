//  简化路由
/**
 * @description 封装write与WriteModel相关方法
 * @author 广源讲师
 */

const WriteModel = require('../model/WriteModel')
const fs = require('fs')
const path = require('path')
const { URL } = require('url')
const sharp = require('sharp')

// 上传图片
let imgPath
const postUploadImg = async (req, res, next) => {
    try {
        const file = req.file
        if (!file) {
            return res.status(400).json({ code: '6001', message: '图片上传失败' })
        }

        // 使用原有的文件路径
        const originalPath = file.path
        const compressedPath = originalPath.replace(/\.[^/.]+$/, '.webp')

        // 压缩并保存图片
        await sharp(originalPath)
            .resize(1920, 1080, {  // 增加最大尺寸
                fit: 'inside',
                withoutEnlargement: true
            })
            .webp({ 
                quality: 90,  // 提高质量
                effort: 4,    // 降低压缩努力程度，提高处理速度
                lossless: false,
                nearLossless: true  // 启用接近无损压缩
            })
            .toFile(compressedPath)

        // 删除原始文件
        fs.unlinkSync(originalPath)

        // 使用压缩后的路径格式
        imgPath = compressedPath
        res.json({
            code: '6000',
            message: '图片上传成功',
            data: imgPath
        })
    } catch (error) {
        console.error('图片处理失败，详细错误:', error)
        res.status(500).json({ 
            code: '6002', 
            message: '图片处理失败',
            error: error.message
        })
    }
}

// 上传文章
const postWriteInfo = async (req, res, next) => {
    try {
        const { formObj } = req.body

        if (!imgPath) {
            return res.status(400).json({
                code: '3001',
                message: '缺少图片路径'
            })
        }

        const data = await WriteModel.create({
            ...formObj,
            imgPath,
            author: req.user.username
        })

        res.json({
            code: '3000',
            message: '文章创建成功',
            data
        })
    } catch (err) {
        res.json({
            code: '3003',
            message: '文章创建失败',
            err
        })
    }
}

// 更新文章
const patchWriteEdit = async (req, res, next) => {
    try {
        const { formObj } = req.body

        // 构建更新对象
        const updateObj = { ...formObj }
        
        // 只有当有新的图片路径时才更新图片
        if (imgPath) {
            updateObj.imgPath = imgPath
            // 删除旧图片
            if (formObj.originalUrl) {
                const urlObj = new URL(formObj.originalUrl)
                fs.unlinkSync(path.resolve(__dirname, `..${urlObj.pathname}`))
            }
        } else {
            // 如果没有新的图片路径，删除 imgPath 字段，这样数据库中的值就不会被更新
            delete updateObj.imgPath
        }

        const put_time = new Date().toLocaleString()
        const createdAt = new Date().toISOString()

        const data = await WriteModel.updateOne(
            { _id: formObj._id },
            { ...updateObj, put_time, createdAt }
        )

        res.json({
            code: '3000',
            message: '文章更新成功',
            data: null
        })
    } catch (err) {
        res.json({
            code: '3004',
            message: '文章更新失败',
            err: null
        })
    }
}

// 删除文章
const deleteWriteOne = (req, res, next) => {
    WriteModel.deleteOne({_id: req.query.id})
    .then(data => {
        const urlObj = new URL(req.query.imgUrl)
        fs.unlinkSync(path.resolve(__dirname,`..${urlObj.pathname}`))
        res.json({
            code: '3000',
            message: '文章删除成功',
            data: null
        })
    })
    .catch(err => {
        res.json({
            code: '3006',
            message: '文章删除失败',
            err: null
        })
    })
}

// 评论文章
const patchMarkAdd = (req, res, next) => {
    const newComment = {
        user: req.user.username,
        text: req.body.mark,
    }
    WriteModel.findByIdAndUpdate({_id: req.body._id},{$push:{comments: newComment}})
    .then(data => {
        res.json({
            code: '3000',
            message: '评论更新成功',
            data
        })
    })
    .catch(err => {
        res.json({
            code: '3004',
            message: '评论更新失败',
            err: null
        })
    })
}

module.exports = {
    postUploadImg,
    postWriteInfo,
    patchWriteEdit,
    deleteWriteOne,
    patchMarkAdd
}