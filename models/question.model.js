const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true, "question is required"],
    },
    answer:{
        type: String,
        required: [true, "Answer is required"],
    },

},
{
    timestamps: true
})

module.exports = mongoose.model('Question', QuestionSchema);