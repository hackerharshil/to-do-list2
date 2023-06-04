const monthSelect = document.getElementById('month-select');
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const todoList = document.querySelector('.todo-list');
    let currentMonth = '';

    monthSelect.addEventListener('change', function () {
      currentMonth = monthSelect.value;
      clearTaskList();
      loadTasks(currentMonth);
    });

    taskForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const task = taskInput.value;
      if (task.trim() !== '') {
        addTask(currentMonth, task);
        taskInput.value = '';
        taskInput.focus();
        saveTasks(currentMonth);
      }
    });

    function addTask(month, task) {
      const taskId = Date.now();
      const listItem = document.createElement('div');
      listItem.innerHTML = `
        <div class="checkbox">
          <input type="checkbox" id="checkbox-${taskId}" />
          <label for="checkbox-${taskId}"></label>
        </div>
        <label>${task}</label>
        <button class="delete-button" data-id="${taskId}">Delete</button>
      `;
      listItem.className = 'flex items-center mb-2';

      todoList.appendChild(listItem);

      const checkbox = listItem.querySelector('input[type="checkbox"]');
      const label = listItem.querySelector('label');
      const deleteButton = listItem.querySelector('.delete-button');

      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          label.classList.add('completed');
        } else {
          label.classList.remove('completed');
        }
        saveTasks(month);
      });

      deleteButton.addEventListener('click', function () {
        todoList.removeChild(listItem);
        saveTasks(month);
      });
    }

    function clearTaskList() {
      todoList.innerHTML = '';
    }

    function saveTasks(month) {
      const tasks = Array.from(todoList.children).map((item) => {
        const taskId = item.querySelector('.delete-button').dataset.id;
        const task = item.querySelector('label').textContent;
        const completed = item.querySelector('input[type="checkbox"]').checked;
        return { id: taskId, task, completed };
      });
      localStorage.setItem(`tasks-${month}`, JSON.stringify(tasks));
    }

    function loadTasks(month) {
      const storedTasks = localStorage.getItem(`tasks-${month}`);
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach((task) => {
          addTask(month, task.task);
          const listItem = todoList.lastElementChild;
          const checkbox = listItem.querySelector('input[type="checkbox"]');
          const label = listItem.querySelector('label');
          checkbox.checked = task.completed;
          if (task.completed) {
            label.classList.add('completed');
          }
        });
      }
    }

    // Load tasks for the initially selected month
    currentMonth = monthSelect.value;
    loadTasks(currentMonth);