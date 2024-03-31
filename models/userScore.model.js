const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserScoreSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User reference is required"],
    },
    currentQuestion: {
        type: Number,
        required: [true, "Current question is required"],
        default:1,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('UserScore', UserScoreSchema);