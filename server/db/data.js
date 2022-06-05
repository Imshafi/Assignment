const mongoose = require('mongoose');


let dataSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    status : Number
});

module.exports = mongoose.model('seats',dataSchema); 