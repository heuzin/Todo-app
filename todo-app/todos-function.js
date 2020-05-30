// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

// Save todos to local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = () => {
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

    filteredTodos.forEach((todo) => {
        document.querySelector('#todo').appendChild(generateTodoDOM(todo))
    })
}

// Remove a todo from the list
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
}

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('div')
    const textEl = document.createElement('span')
    const checkbox = document.createElement('input')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Setup todo text
    if (todo.text.length > 0) {
        textEl.textContent = todo.text
    } else {
        textEl.textContent = 'Unamed Todo'
    }

    todoEl.appendChild(textEl)

    // Setup remove button
    removeButton.textContent = 'Remove'
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', (e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todo').appendChild(summary)

    return summary
}