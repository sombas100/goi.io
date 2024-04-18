import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const[editText, setEditText] = useState('')

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('/api/todos');
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/todos/create', { text });
      const newTodo = res.data;
      setTodos([...todos, newTodo]);
      setText(''); // Clear the input field after adding todo
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
        await axios.delete(`/api/todos/delete/${id}`);
        const updatedTodos = todos.filter(todo => todo._id !==id);
        setTodos(updatedTodos);
    } catch (error) {
        console.error('There was an error deleting the todo:', error)
    }
  }

  const handleEditTodo = async (id) => {
    try {
        await axios.put(`/api/todos/edit/${id}`);
        const updatedTodos = todos.map(todo => 
        todo._id === id ? {...todo, text: editText } : todo
    );
    setTodos(updatedTodos);
    setEditId(null);
    setEditText('')
    } catch (error) {
        console.error('There was an error updating the task:', error)
    }
  }

  return (
    <div className='todo-list-container'>
      <h1 className='todo-list-header'>Lets get on it!</h1>
      <form className='todo-form' onSubmit={handleAddTodo}>
        <input className='todo-input'
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task"
          required
        />
        <button className='todo-submit-btn' type="submit">Add Task</button>
      </form>
      <ul className='todo-item'>
        {todos.map(todo => (
            <li key={todo._id}>
                {editId === todo._id ? (
                    <>
                    <input type='text' value={editText} onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => handleEditTodo(todo._id)}>Save</button>
                    </>
                ) : (
                    <div className='edit-buttons'>
                      {todo.text}
                      <button className='edit-btn' onClick={() => { setEditId(todo._id); setEditText(todo.text); }}><FaEdit className='icon'/></button>
                      <button onClick={() => handleDeleteTodo(todo._id)}><FaTrash className='icon'/></button>
                    </div>
                )
                }
            </li>
        ))}
        
      </ul>
    </div>
  );
};

export default TodoList;