/**
 * @description mongodb创建
 * @author 广源讲师
 */


const mongoose = require('mongoose')

const dbHOST = 'mongodb://127.0.0.1'
const dbPORT = '27017'
const dbNAME = 'ChainVenturer'

mongoose.connect(`${dbHOST}:${dbPORT}/${dbNAME}`,{})

const db = mongoose.connection   // 创建对象

db.on('error',err => {
    console.log('数据库连接错误，原因如下')
    console.log('连接错误',err)
})

db.once('open',() => {
    console.log('数据库连接成功');
    console.log('----------------------------');
    console.log('开始执行');
})

module.exports = mongoose