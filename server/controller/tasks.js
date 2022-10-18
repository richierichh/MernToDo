const toDo = require("../models/tasks.js") ;
const mongoose = require('mongoose'); 

const readTodos = async (req,res)=>{ 
    try { 
        const todos = await toDo.find(); 
        //success
        res.status(200).json(todos); 
    } catch (error){ 
        //not found 
        res.status(404).json({error:error.message})
    }
}

const createTodos = async(req,res)=>{
    const todo = new toDo(req.body);  
    try { 
        await todo.save(); 
        //created resource
        res.status(201).json(todo); 
    } catch (error){ 
        //conflict with current state of server 
        res.status(409).json({error:error.message})
    }
}

const updateTodo = async(req,res)=>{  
    const {id} = req.params; 
    const {title,content} = req.body; 
    if (!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send(`The id ${id} is not valid`);
    }
    const todo = {title,content,_id:id}; 
    await toDo.findbyIdAndUpdate(id,todo,{new:true})
    res.json(todo);
}

const deleteTodo = async(req,res)=>{  
    const {id} = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send(`The id ${id} is not valid`);
    }
    await toDo.findByIdAndRemove(id);
    res.json({message: 'Todo deleted successfully'});
}
module.exports = {
    readTodos,
    createTodos,
    updateTodo, 
    deleteTodo
}