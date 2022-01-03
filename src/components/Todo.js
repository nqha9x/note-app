import React, { Fragment, useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import axios from 'axios'

import { v4 as uuidv4 } from 'uuid'

const Todo = () => {
  const [todoState, setTodoState] = useState([])

  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/todos?_limit=5'
        )
        // console.log(res.data)
        setTodoState(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    getTodo()
  }, [])

  const markComplete = id => {
    const newTodo = todoState.map(todo => {
      if (todo.id === id) todo.completed = !todo.completed
      return todo
    })

    setTodoState(newTodo)
  }

  const deleteTodo = async id => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      const newTodo = todoState.filter(todo => todo.id !== id)
      setTodoState(newTodo)
    } catch (error) {
      console.log(error.message)
    }
  }

  const addTodo = async title => {
    try {
      const res = await axios.post(
        'https://jsonplaceholder.typicode.com/todos',
        {
          title,
          completed: false
        }
      )
      console.log(res.data)
      const newTodo = [...todoState, res.data]
      setTodoState(newTodo)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Fragment>
      <AddTodo addTodoFunc={addTodo} />
      {todoState.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todoProps={todo}
            markCompleteFunc={markComplete}
            deleteTodoFunc={deleteTodo}
          />
        )
      })}
    </Fragment>
  )
}

export default Todo