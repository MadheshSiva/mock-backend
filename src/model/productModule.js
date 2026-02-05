const mongoose = require('mongoose');

const productModule = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    productName:{type : String, required: [true, 'Product Name is required']},
    price:{type:Number, required:[true,'Price is required']},
    quantity:{type:Number, required:[true,'Quantity is required']},
    purchaseDate:{type:Date, required:[true,'Purchase Date is required']}
},{timestamps:true})

module.exports = mongoose.model('products',productModule);