document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : 'uncompleted';
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="complete">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;
            taskList.appendChild(li);

            li.querySelector('.complete').addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                updateTasks();
            });

            li.querySelector('.edit').addEventListener('click', () => {
                const newText = prompt('Edit task:', task.text);
                if (newText) {
                    tasks[index].text = newText;
                    updateTasks();
                }
            });

            li.querySelector('.delete').addEventListener('click', () => {
                tasks.splice(index, 1);
                updateTasks();
            });
        });
    };

    const updateTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    const playSound = () => {
        const audio = new Audio('https://www.soundjay.com/button/sounds/button-09.mp3');
        audio.play();
    };

    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            updateTasks();
            playSound();
        }
    });

    renderTasks();
});
