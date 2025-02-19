// 快讯获取
/**
 * @description 封装news与NewsModel相关方法
 * @author 广源讲师
 */

const WriteModel = require('../model/WriteModel')

const getNewsDate = (req,res,next) => {
    try {
        switch (req.query.type) {
            case last:
                WriteModel.find(
                    {topic: {$nin:['投资领域','交易心得']}},  //不包含
                    {title: 1,summarize: 1,put_time: 1}   // 投影部分 就是返回什么属性
                ).limit(20).sort({createdAt: -1}).exec()
                .then(data => {
                    res.json({
                        code: '3000',
                        message: '快讯查询成功',
                        data
                    })
                })
                break;
        
            default:
                break;
        }
    } catch (error) {
        res.json({
            code: '3002',
            message: '快讯查询错误',
            err: null
        })
    }
    
}

module.exports = {
    getNewsDate
}