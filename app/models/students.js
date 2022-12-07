const mongoose = require('mongoose');

module.exports = mongoose.model('Student', {
    name: {type: String, default: ''},
    lastname : {type : String, default: ''},
    birthday : {type : String, default: ''},
    group : {type : String, default: ''}
});
