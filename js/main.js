//Находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// if (localStorage.getItem('tasksHTML')) {
//    tasksList.innerHTML = localStorage.getItem('tasksHTML');
// }

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

// Добавление задачи
form.addEventListener('submit', addTask);

function addTask(event) {
    // Отменяем отправку формы
    event.preventDefault();

    // Достаем текст задачи из поля вода
    let taskText = taskInput.value

    let newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    tasks.push(newTask);

    renderTask(newTask);

    // Очищаем поле ввода и возвращаем фокус на него 
    taskInput.value = '';
    taskInput.focus();

    // Проверка на пустой лист задач
    // if (tasksList.children.length > 1) {
    //     emptyList.classList.add('none');
    // }

    // saveHTMLtoLS();
    checkEmptyList();
    saveToLocalStorage();
}

// Удаление задачи
tasksList.addEventListener('click', deleteTask);

function deleteTask(event) {
    // event.target.getAttribute('data-action')
    /*if ( event.target.dataset.action === 'delete') {
        let parentNode = event.target.closest('.list-group-item');
        parentNode.remove();
    }

    // Проверка на пустой лист задач
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }*/

    if ( event.target.dataset.action !== 'delete') return;

    let parentNode = event.target.closest('.list-group-item');
    let id = Number(parentNode.id);

    // Удаление через индекс
    // const index = tasks.findIndex((task) => {
    //     return task.id === id;
    // });

    // tasks.splice(index, 1);

    // Удаление через фильтр
    tasks = tasks.filter(function (task) {
        if (task.id === id) return false;
        else return true;
        // return task.id !== id;
    })

    parentNode.remove();

    // Проверка на пустой лист задач
    // if (tasksList.children.length === 1) {
    //     emptyList.classList.remove('none');
    // }

    // saveHTMLtoLS();
    checkEmptyList();
    saveToLocalStorage();
}

// Отмечаем выполненные задачи
tasksList.addEventListener('click', doneTask);

function doneTask(event) {
    /*if (event.target.dataset.action === 'done') {
        let parentNode = event.target.closest('.list-group-item');
        let taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
    }*/
    
    if (event.target.dataset.action !== 'done') return;
    
    let parentNode = event.target.closest('.list-group-item');
    let taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

    let id = Number(parentNode.id);
    let task = tasks.find(function (task) {
        if (task.id === id) return true;
    });

    task.done = !task.done;

    // saveHTMLtoLS();
    saveToLocalStorage();
}

// Сохранение разметки в LocalStorage
// function saveHTMLtoLS() {
//     localStorage.setItem('tasksHTML', tasksList.innerHTML);
// }

// Проверка на отсутствие или присутствие задач
function checkEmptyList() {
    if (tasks.length === 0) {
        let emptyListElement = `<li id="emptyList" class="list-group-item empty-list">
					                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					                <div class="empty-list__title">Список дел пуст</div>
				                </li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListElement);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    let cssClass = task.done ? "task-title task-title--done" : "task-title";

    // Формируем разметку для новой задачи
    let taskHTML = `
                <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;
    
    // Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}