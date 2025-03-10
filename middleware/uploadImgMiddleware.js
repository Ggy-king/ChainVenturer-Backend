// const multer = require('multer')
// const path = require('path')

// module.exports = (storagePath) => {
//    return (req,res,next) => {
//         // 配置存储设置
//         const storage = multer.diskStorage({
//             destination: function (req, file, cb) {
//                 cb(null, `./${storagePath}`)  // 保存文件的目录
//             },
//             filename: function (req, file, cb) {
//                 cb(null, req.user.username + '-' + Date.now() + path.extname(file.originalname)); // 文件名
//             }
//         })
        
//         const upload = multer({ storage: storage })
//         upload.single('file')(req, res, (err) => {
//             if (err) {
//                 console.error('图片上传错误:', err)
//                 return res.status(400).send('图片上传错误')
//             }
            
//             next()
//         })
//     }
// }
const multer = require('multer')
const path = require('path')

module.exports = (storagePath) => {
   return (req,res,next) => {
        // 配置存储设置
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, `./${storagePath}`)  // 保存文件的目录
            },
            filename: function (req, file, cb) {
                cb(null, req.user.username + '-' + Date.now() + path.extname(file.originalname)); // 文件名
            }
        })
        
        const upload = multer({ 
            storage: storage,
            limits: {
                fileSize: 2 * 1024 * 1024 // 限制文件大小为2MB
            }
        })

        upload.single('file')(req, res, (err) => {
            if (err) {
                console.error('图片上传错误:', err)
                let errorMessage = '图片上传错误'
                if (err.code === 'LIMIT_FILE_SIZE') {
                    errorMessage = '文件大小超过2MB限制'
                } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    errorMessage = '文件数量超过限制'
                }
                return res.status(400).json({
                    code: '4001',
                    message: errorMessage,
                    error: err.message
                })
            }
            
            // 确保文件已上传
            if (!req.file) {
                return res.status(400).json({
                    code: '4002',
                    message: '未接收到文件'
                })
            }

            // 记录上传成功信息
            console.log('文件上传成功:', req.file)
            next()
        })
    }
}