const express = require('express'); 
const { createTodos, readTodos, updateTodo, deleteTodo} = require('../controller/tasks.js'); 

const router = express.Router(); 
router.get('/',readTodos); 
router.post('/',createTodos);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);
module.exports = (router);
