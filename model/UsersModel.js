/**
 * @description 用户模型
 * @author 广源讲师
 */
const mongoose = require('../db/db')


const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const UsersModel = mongoose.model('users-info',Schema)

module.exports = UsersModel