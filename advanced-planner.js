const Input = document.querySelector('.task-input');
const AddTaskBtn = document.querySelector('.add-task-btn');
const RemoveTaskBtn = document.querySelector('.remove-task-btn');
const RemoveAll = document.querySelector('.remove-all');
const list = document.querySelector('.todo-list');

const searchInput = document.querySelector('.search-input');

let searchQuery = ''

let filter = "all"

function createTodoStore() {
    let todos = []

    return {

        add(text) {
            todos.push({
                id: Date.now(),
                text,
                completed: false
            })
            this.save()
},

toggle(id) {
    todos = todos.map(todo =>
        todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ) 
    this.save()
    },

    remove(id) {
        todos = todos.filter(todo => todo.id !== id)
        this.save()
    },

    getTodos() {
        return todos
    },

    removeAll() {
        todos = []
        this.save()
    },

    save() {
        localStorage.setItem("todos", JSON.stringify(todos))
    },

    load() {
        const data = localStorage.getItem("todos")
        todos = data ? JSON.parse(data) : []
    }
}
}

const store = createTodoStore()

function render() {
    list.innerHTML = ""

    let todos = store.getTodos()

    if (filter === "active") {
        todos = todos.filter(todo => !todo.completed)
    } else if (filter === "completed") {
        todos = todos.filter(todo => todo.completed)
    }

    todos = todos.filter(todo => todo.text.toLowerCase().includes(searchQuery.toLowerCase()))

    todos.forEach(todo => {
        const li = document.createElement("li")

        li.innerHTML = `<span>${todo.text}</span>
        <button class="delete-btn">×</button>`
        li.dataset.id = todo.id
        if (todo.completed) {
            li.classList.add("completed")
        }
        list.appendChild(li)
    })
}

AddTaskBtn.addEventListener("click", () => {
    const text = Input.value.trim()
    if (!text) return

    store.add(text)
    render()
    Input.value = ''
})

list.addEventListener("click", (e) => {
    const li = e.target.closest("li")
    if (!li) return

    const id = Number(li.dataset.id)

    if (e.target.classList.contains("delete-btn")) {
        store.remove(id)
        render()
        return
    } 
    store.toggle(id)
    render()
    }
)

RemoveTaskBtn.addEventListener('click', () => {
    const todos = store.getTodos()
    if (todos.length === 0) return
    
    const lastId = todos[todos.length - 1].id
    store.remove(lastId)
    render()
})

RemoveAll.addEventListener("click", () => {
    store.removeAll()
    render()
})

searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value
    render()
})

document.querySelector(".filters").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        filter = e.target.dataset.filter
        render()
    }
})

const li = document.createElement("li")

store.load()
render()