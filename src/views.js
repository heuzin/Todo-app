import { getFilters } from './filters'
import { toggleTodo, getTodos, removeTodo, saveTodos } from './todos'

// Render application todos based on filters
const renderTodos = () => {
    const filters = getFilters()
    const todos = getTodos()

    let filteredTodos = todos.filter((todo) => {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })


    filteredTodos = filteredTodos.filter((todo) => {
        if (filters.hideCompleted) {
            return !todo.completed
        } else {
            return true
        }
    })

    const incompleteTodos = filteredTodos.filter((todo) => {
        return !todo.completed
    })

    document.querySelector('#todo').innerHTML = ''
    document.querySelector('#todo').appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            document.querySelector('#todo').appendChild(generateTodoDOM(todo))
        })    
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        document.querySelector('#todo').appendChild(messageEl)
    }
}

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todos = getTodos()

    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const textEl = document.createElement('span')
    const checkbox = document.createElement('input')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    // Setup todo text
    if (todo.text.length > 0) {
        textEl.textContent = todo.text
    } else {
        textEl.textContent = 'Unamed Todo'
    }

    containerEl.appendChild(textEl)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')       
    todoEl.appendChild(containerEl)
    

    // Setup remove button
    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', (e) => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    document.querySelector('#todo').appendChild(summary)

    return summary
}

export { renderTodos, generateTodoDOM, generateSummaryDOM }