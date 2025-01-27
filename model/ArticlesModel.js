/**
 * @description 文章模型
 * @author 广源讲师
 */

const mongoose = require('../db/db.jd')

const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        
    }
})
