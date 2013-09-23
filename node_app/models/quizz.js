
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var quizzSchema = new Schema({
    name: {type: String, trim : true},
    titles: {type: [{type : Schema.Types.ObjectId, ref : 'Title'}]}
});
mongoose.model('Quizz', quizzSchema);