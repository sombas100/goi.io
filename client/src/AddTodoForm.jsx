import React from 'react'
import axios from 'axios'

const AddTodoForm = ({ onAdd }) => {
const [text, setText] = useState('')

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post('/api/todos/create', { text });
        const newTodo = res.data;
        onAdd(newTodo)
        setText('')
    } catch (error) {
        console.error('Error adding todo:', error)
    }
}
  return (
    <form>
        <input type='text' value={text} onChange={(e) => setText(e.target.value)}
        placeholder='Enter todo text' required
        />
        <button type='submit'>add Task</button>
    </form>
  )
}

export default AddTodoForm