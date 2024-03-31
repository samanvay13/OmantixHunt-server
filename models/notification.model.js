const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
    statement:{
        type: String,
        required: [true, "Notification is required"],
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Notification', NotificationSchema);