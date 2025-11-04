const todoList = JSON.parse(localStorage.getItem('todoListString')) || [];
const addBtn = document.querySelector('.add-btn');
const todoDisplay = document.querySelector('.todo-display');

function renderTodoList() {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const todo = todoList[i];
        const HTML = `<p>${todo.name}</p> <p>${todo.dueDate || 'No due date'}</p> <button class="delete-btn">Delete</button>`;
        todoListHTML += HTML;
    }
    
    todoDisplay.innerHTML = todoListHTML;

    const deleteBtns = document.querySelectorAll('.delete-btn');

    for (let i = 0; i < deleteBtns.length; i++) {
        const btn = deleteBtns[i];
        btn.addEventListener('click', () => {
            
            const check = confirm("Are you sure you want to delete this task?");
            if (!check) {
                return;
            }

            todoList.splice(i, 1);
            localStorage.setItem('todoListString', JSON.stringify(todoList));
            renderTodoList();
            
        })
    }
}

addBtn.addEventListener('click', () => {
    const todoInput = document.querySelector('.todo-input');
    const dateInput = document.querySelector('.date-input');

    const todoObj = {
        name: todoInput.value,
        dueDate: dateInput.value
    }

    if (!todoInput.value) {
        alert('Please add a task first!');
        return;
    } 

    if (!dateInput.value) {
        const check = confirm('Do you want to proceed without a due date?');
        if (!check) {
            return;
        }
    }
  
    todoList.push(todoObj);
    localStorage.setItem('todoListString', JSON.stringify(todoList));
    todoInput.value = '';
    dateInput.value = '';
    renderTodoList();
})

renderTodoList();
