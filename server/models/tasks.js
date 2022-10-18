const mongoose = require('mongoose'); 

const todoSchema = mongoose.Schema({
    title: {
    type: String, 
    required: true
},
    content : String 
},{timestamps:true}); 
module.exports = mongoose.model('toDo',todoSchema)