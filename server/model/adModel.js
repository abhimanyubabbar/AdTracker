
// Model For the Ads in the system.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AdSchema = new Schema({

    name: {type: String},
    campaignName: {type: String},
    picture: {type: String},
    isActive: {type: Boolean , default: false},
    impressions: {type: Number, default: 0},
    spend: {type: Number, default:0},
    description: {type: String},
    created: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Ad', AdSchema);
