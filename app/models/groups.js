const mongoose = require('mongoose');

module.exports = mongoose.model('Group', {
    name : {type : String, default: ''}
});