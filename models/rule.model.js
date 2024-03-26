const mongoose = require('mongoose')

const RuleSchema = new mongoose.Schema({
    statement:{
        type: String,
        required: [true, "Rule is required"],
    },
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Rule', RuleSchema);