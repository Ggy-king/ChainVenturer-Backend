/**
 * @description 汇率模型
 * @author 广源讲师
 */

const { mongoose } = require('../db/db')
const Schema = mongoose.Schema({
    currencyName: {
        type: String,
        required: true
    },
    currency: {
        type:String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    }
})


const RatesModel = mongoose.model('contracts-data',Schema)
module.exports = RatesModel