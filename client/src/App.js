import React from "react";
import { useEffect, useState } from "react";
import { readTodos } from "./functions";
import Preloadder from "./components/Preloadder.js";
import { createTodo, deleteTodo, updateTodo } from "./api";

function App() {
  const [todo, setTodo] = useState({title:'', content:''});
  const [todos, setTodos] = useState(null);
  const [currentId,setCurrentId] = useState(0); 
  
  useEffect(()=>{
    let currentTodo = currentId && currentId!==0?todos.find(todo=>todo._id===currentId)
    :{title:'',content:''}
    setTodo(currentTodo);
  },[currentId])

  useEffect(()=> {  
    const fetchData = async () =>{ 
      const result = await readTodos(); 
      setTodos(result); 
    }
    fetchData()
  }, []) 

  const clear = ()=>{
    setCurrentId(0);
    setTodo({title:'',content:''})
  }
  useEffect(() => {
    const clearField = (e) => {
      if(e.keyCode === 27){
        clear()
      }
    }
    window.addEventListener('keydown', clearField)
  return () => window.removeEventListener('keydown', clearField)
},[])

  const onSubmitHandler = async(e)=>{ 
    e.preventDefault();
    if (currentId ===0){
      const result = await createTodo(todo)
      setTodos([...todos, result.data])
      clear();
    }
    else 
    { 
      await updateTodo(currentId,todo)
      clear();
    }
  }

  const removeTodo =  async(id)=> {
     await deleteTodo(id);
     let todosCopy= [...todos];
     todosCopy = todosCopy.filter(todo=>todo._id!==id);
     console.log(todosCopy);
     setTodos(todosCopy); 
     clear();
  }

  return (
<div className="container">
<div className="row">
<form className="col s12" onSubmit={onSubmitHandler}>
  <h1> To Do App </h1>
  <div className="row">
    <div className="input-field col s6">
      <i className="material-icons prefix">title</i>
      <input id="icon_prefix" type="text" className="validate"
      value= {todo.title}
      onChange = {e=>setTodo({...todo,title:e.target.value})} />
      <label htmlFor="icon_prefix">Task</label>
    </div>
    <div className="input-field col s6">
      <i className="material-icons prefix">textsms</i>
      <input id="description" type="tel" className="validate"
      value = {todo.content}
      onChange = {e=>setTodo({...todo,content:e.target.value})} />
      <label htmlFor="icon_telephone">Content</label>
    </div>
  </div>
  <div className ="row right-align"> 
    <button className="wave-effect.waves-light btn">Submit</button>
  </div>
</form>
{
  !todos? <Preloadder/>:todos.length>0?                                                                                                                                                                                                                                   
  <ul className="collection with-header">
  <li className="collection-header"><h4>Tasks</h4></li>
    {
    todos.map((newTodo, idx)=>(
  <li 
  onClick={()=>{setCurrentId(newTodo._id)}}
  key = {idx}
  className="collection-item"><div><h5>{newTodo.title}</h5><p>{newTodo.content}<a href="#!"
  onClick ={()=>removeTodo(newTodo._id)}
  className="secondary-content"><i className="material-icons">delete</i></a></p></div></li>
))}
  </ul>:
  <div><h5>Nothing to do</h5></div>
}
</div>
</div>
  )
}
export default App;
