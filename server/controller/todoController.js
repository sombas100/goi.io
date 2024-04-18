const Todo = require('../models/Todo')

const createTodo = async (req, res, next) => {
    try {
        const todo = new Todo(req.body)
        const createdTodo = await todo.save()
        if (!createdTodo) {
           return next(new ErrorHandler('Todo not found', 404))
        }
        res.status(201).json(createdTodo)
    } catch (error) {
        next(error)
    }
}

const getTodos = async (req, res, next) => {
    try {
        const todo = await Todo.find()
        res.json(todos);
    } catch (error) {
        next(error)
    }
}

const getTodoById = async (req, res, next) => {
    try {
        const todo = await Todo.findById()
        if (!todo) {
            return next(new ErrorHandler('Todo not found', 404))
        }
        res.json(todo)
    } catch (error) {
        next(error)
    }
}

const updateTodo = async (req, res, next) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedTodo) {
            return next(new ErrorHandler('Todo not found', 404))
        }
        res.json(updatedTodo)
    } catch (error) {
        next(error)
    }
}

const deleteTodo = async (req, res, next) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
        if (!deletedTodo) {
            return next(new ErrorHandler('Todo not found', 404))
        }
        res.json(deletedTodo)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
}