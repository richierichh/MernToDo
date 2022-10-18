import * as api from '../api'; 
export const readTodos  =  async ()=>{ 
    try { 
        const {data} = await api.readTodos() 
        return data;
    }
    catch (error){
        console.log(error)
    }
}

export const createTodos  =  async (newTodo)=>{ 
    try { 
        const {data} = await api.createTodo(newTodo) 
        return data;
    }
    catch (error){
        console.log(error)
    }
}

export const updateTodo =  async (newTodo)=>{ 
    try { 
        const {data} = await api.updateTodo(newTodo) 
        return data;
    }
    catch (error){
        console.log(error)
    }
}

export const deleteTodo =  async (id)=>{ 
    try { 
        await api.deleteTodo(id)
    }
    catch (error){
        console.log(error)
    }
}