import React from 'react'
import { useState, useEfefct } from 'react'

const TodoList = () => {
    const [todos, SetTodos] = useState([])

    useEffect(() => {
        fetchTodos();
    }, [])

    const fetchTodos = async () => {
        try {
            const res = await axios.get('/api/todos');
            SetTodos(res.data)
            
        } catch (error) {
            console.error('There was an error fetching the todos...', error)
        }
    }
  return (
    <div>
        <h1>Lets get on it!</h1>
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    </div>
  )
}

export default TodoList