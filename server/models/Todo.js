const mongoose = require('mongoose')
const { Schema } = mongoose

const todoSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo