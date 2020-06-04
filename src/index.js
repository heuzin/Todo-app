import { renderTodos } from "./views";
import { createTodo, loadTodos } from "./todos";
import { setFilters } from './filters'

renderTodos()

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    let text = e.target.elements.addTodo.value.trim()
    e.preventDefault()

    createTodo(text)
    e.target.elements.addTodo.value = ''
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})