import uuidv4 from 'uuid/v4'
import { renderTodos } from './views'

let todos = []

// Fetch existing todos from localStorage
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

// Save todos to local storage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => todos

const createTodo = (text) => {
    if (text.length > 0) {
        todos.push({
            id: uuidv4(),
            text: text,
            completed: false
        })
        saveTodos()
        renderTodos()
    }
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo !== undefined) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

loadTodos()

export { getTodos, createTodo, removeTodo, toggleTodo, loadTodos }