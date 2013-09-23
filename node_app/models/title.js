var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var titleSchema = new Schema({
    file: {type: String, trim : true},
    startGuess: {type: Number, default:0},
    endGuess: {type: Number, default:30},
    startAnswer: {type: Number, default:30},
    endAnswer: {type: Number, default:60},
    id3info: {type:Schema.Types.Mixed},
    locked: {type: Boolean, default : false }
});
mongoose.model('Title', titleSchema);