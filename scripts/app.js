// Array para almacenar las tareas
let tasks = [];

// Función para agregar una tarea
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task !== '') {
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
}

// Función para eliminar una tarea
function deleteTask(index) {
    if (tasks[index].startsWith('✅ ')) {
        let resultado = window.confirm("¿Deseas eliminar la tarea finalizada?");
        if (resultado) {
            tasks.splice(index, 1);
            renderTasks();
        } 
    } else {
        let resultado = window.confirm("¿Deseas eliminar la tarea sin finalizar?");
        if (resultado) {
            tasks.splice(index, 1);
            renderTasks();
        } 
    }
}

// Función para marcar una tarea como completada
function toggleComplete(index) {
    if (!tasks[index].startsWith('✅ ')) {
        let resultado = window.confirm("¿Deseas marcar la tarea como finalizada?");
        if (resultado) {
            tasks[index] = tasks[index].startsWith('✅ ') ? tasks[index].substring(2) : '✅ ' + tasks[index];
            renderTasks();
        }
    } else {
        alert("La tarea ya ha sido finalizada");
    }
}

// Función para renderizar las tareas en la tabla
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = `
        <tr>
            <th>Tarea</th>
            <th>Acciones</th>
        </tr>
    `;

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        const taskCell = document.createElement('td');
        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');

        deleteButton.innerText = 'Eliminar';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => deleteTask(index));

        taskCell.innerText = task;
        taskCell.addEventListener('click', () => toggleComplete(index));
        if (task.startsWith('✅ ')) {
            taskCell.classList.add('completed');
        }

        actionsCell.appendChild(deleteButton);

        row.appendChild(taskCell);
        row.appendChild(actionsCell);

        taskList.appendChild(row);
    });
}
