const mongoose = require('mongoose');

const userModule = mongoose.Schema({
    name:{type : String, required: [true, 'Name is required']},
    email:{type:String, required:[true,'Email is required'], unique: true},
    role:{type:String, required:[true,'Role is Required'],enum:['admin','customer']},
    isInactive:{type:Boolean, default:false},
    isDeleted:{type:Boolean, default:false}
},{timestamps:true});

module.exports = mongoose.model('users',userModule);