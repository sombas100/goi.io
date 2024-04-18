const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController')

router.post('/todos/create', todoController.createTodo);
router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodoById);
router.put('/todos/:id/edit', todoController.updateTodo);
router.delete('todos/:id/delete');

module.exports = router