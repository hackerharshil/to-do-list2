function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to retrieve tasks from local storage
// Function to retrieve tasks from local storage
function retrieveTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        Object.assign(tasks, JSON.parse(savedTasks));
    } else {
        // Create empty task objects for each month
        months.forEach(month => {
            tasks[month] = {
                dayTasks: [],
                weekTasks1: [],
                weekTasks2: [],
                weekTasks3: [],
                weekTasks4: [],
                monthTasks: []
            };
        });
    }
}


// Add an event listener to save tasks before the page is unloaded


// Call the retrieveTasks function when the page loads


const taskInput = document.getElementById('task-input');
const dayTaskInput = document.getElementById('day-task-input');
const weekTaskInput1 = document.getElementById('week-task-1-input');
const weekTaskInput2 = document.getElementById('week-task-2-input');
const weekTaskInput3 = document.getElementById('week-task-3-input');
const weekTaskInput4 = document.getElementById('week-task-4-input');
const addTaskButton = document.getElementById('add-task');
const addDayTaskButton = document.getElementById('add-day-task');
const addWeekTaskButton = document.getElementById('add-week-task');
const dayTaskList = document.getElementById('day-tasks');
const weekTaskList1 = document.getElementById('week-tasks-1');
const weekTaskList2 = document.getElementById('week-tasks-2');
const weekTaskList3 = document.getElementById('week-tasks-3');
const weekTaskList4 = document.getElementById('week-tasks-4');
const monthTaskList = document.getElementById('month-tasks');
const monthSelect = document.getElementById('month-select');
const currentMonthHeading = document.getElementById('current-month');

// Create separate task arrays for each month
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const tasks = {
    January: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    February: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    March: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    April: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    May: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    June: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    July: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    August: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    September: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    October: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    November: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] },
    December: { dayTasks: [], weekTasks1: [], weekTasks2: [], weekTasks3: [], weekTasks4: [], monthTasks: [] }
};

// Initialize the month select with the current month
const currentMonth = new Date().toLocaleString('default', { month: 'long' });
monthSelect.value = currentMonth;

// Set the current month heading
currentMonthHeading.textContent = currentMonth + ' Tasks:';

// Function to add a task to the month tasks
function addTask() {
    const task = taskInput.value.trim();
    if (task !== '') {
        const month = monthSelect.value;
        tasks[month].monthTasks.push(task); // Add the task to the monthTasks array
        updateMonthTasks(); // Call the updateMonthTasks function
        taskInput.value = '';

    }
}

// Function to add a day task
function addDayTask() {
    const task = dayTaskInput.value.trim();
    if (task !== '') {
        const month = monthSelect.value;
        tasks[month].dayTasks.push(task);
        updateDayTasks();
        dayTaskInput.value = '';


    }
}

// Function to add a week task
function addWeekTask1() {
    const task = weekTaskInput1.value.trim();
    if (task !== '') {
        const month = monthSelect.value;
        tasks[month].weekTasks1.push(task);
        updateWeekTasks1();
        weekTaskInput1.value = '';
    }
}

function addWeekTask2() {
    const task = weekTaskInput2.value.trim();
    if (task !== '') {
        const month = monthSelect.value;
        tasks[month].weekTasks2.push(task);
        updateWeekTasks2();
        weekTaskInput2.value = '';
    }
}

function addWeekTask3() {
    const task = weekTaskInput3.value.trim();
    if (task !== '') {
        const month = monthSelect.value;
        tasks[month].weekTasks3.push(task);
        updateWeekTasks3();
        weekTaskInput3.value = '';
    }
}

function addWeekTask4() {
    const task = weekTaskInput4.value.trim();
    if (task !== '') {
        const month = monthSelect.value;
        tasks[month].weekTasks4.push(task);
        updateWeekTasks4();
        weekTaskInput4.value = '';
    }
}

// Function to update the day tasks list
function updateDayTasks() {
    const month = monthSelect.value;
    const dayTasks = tasks[month].dayTasks;
    const currentDate = new Date().toLocaleDateString('en-GB'); // Get the current date in the format dd/mm/yy
    const dayTasksHeading = document.getElementById('day-tasks-heading');
    dayTasksHeading.textContent = `Day (${currentDate}) Tasks:`; // Update the day tasks heading

    dayTaskList.innerHTML = '';
    dayTasks.forEach((task) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
  <div class="checkbox">
    <input type="checkbox" id="task-${task}" onchange="toggleCompleted('${task}')">
    <label for="task-${task}"></label>
  </div>
  <label for="task-${task}">${task}</label>
  <button class="delete-button" onclick="deleteTask('${task}')">Delete</button>
`;
        dayTaskList.appendChild(listItem);
    });

}


// Function to update the week tasks list
function updateWeekTasks1() {
    const month = monthSelect.value;
    const weekTasks1 = tasks[month].weekTasks1;
    weekTaskList1.innerHTML = '';
    weekTasks1.forEach((task) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
        <div class="checkbox">
          <input type="checkbox" id="task-${task}" onchange="toggleCompleted('${task}')">
          <label for="task-${task}"></label>
        </div>
        <label for="task-${task}">${task}</label>
        <button class="delete-button" onclick="deleteTask('${task}')">Delete</button>
      `;
        weekTaskList1.appendChild(listItem);
    });
}

function updateWeekTasks2() {
    const month = monthSelect.value;
    const weekTasks2 = tasks[month].weekTasks2;
    weekTaskList2.innerHTML = '';
    weekTasks2.forEach((task) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
        <div class="checkbox">
          <input type="checkbox" id="task-${task}" onchange="toggleCompleted('${task}')">
          <label for="task-${task}"></label>
        </div>
        <label for="task-${task}">${task}</label>
        <button class="delete-button" onclick="deleteTask('${task}')">Delete</button>
      `;
        weekTaskList2.appendChild(listItem);
    });
}

function updateWeekTasks3() {
    const month = monthSelect.value;
    const weekTasks3 = tasks[month].weekTasks3;
    weekTaskList3.innerHTML = '';
    weekTasks3.forEach((task) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
        <div class="checkbox">
          <input type="checkbox" id="task-${task}" onchange="toggleCompleted('${task}')">
          <label for="task-${task}"></label>
        </div>
        <label for="task-${task}">${task}</label>
        <button class="delete-button" onclick="deleteTask('${task}')">Delete</button>
      `;
        weekTaskList3.appendChild(listItem);
    });
}

function updateWeekTasks4() {
    const month = monthSelect.value;
    const weekTasks4 = tasks[month].weekTasks4;
    weekTaskList4.innerHTML = '';
    weekTasks4.forEach((task) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
        <div class="checkbox">
          <input type="checkbox" id="task-${task}" onchange="toggleCompleted('${task}')">
          <label for="task-${task}"></label>
        </div>
        <label for="task-${task}">${task}</label>
        <button class="delete-button" onclick="deleteTask('${task}')">Delete</button>
      `;
        weekTaskList4.appendChild(listItem);
    });
}
// Function to update the month tasks list
function updateMonthTasks() {
    const month = monthSelect.value;
    const monthTasks = tasks[month].monthTasks;
    monthTaskList.innerHTML = '';
    monthTasks.forEach((task) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
  <div class="checkbox">
    <input type="checkbox" id="task-${task}" onchange="toggleCompleted('${task}')">
    <label for="task-${task}"></label>
  </div>
  <label for="task-${task}">${task}</label>
  <button class="delete-button" onclick="deleteTask('${task}')">Delete</button>
`;
        monthTaskList.appendChild(listItem);
    });

}


// Function to toggle the completed status of a task
function toggleCompleted(task) {
    const month = monthSelect.value;
    const dayTasks = tasks[month].dayTasks;
    const weekTasks1 = tasks[month].weekTasks1;
    const weekTasks2 = tasks[month].weekTasks2;
    const weekTasks3 = tasks[month].weekTasks3;
    const weekTasks4 = tasks[month].weekTasks4;

    if (dayTasks.includes(task)) {
        const index = dayTasks.indexOf(task);
        const listItem = dayTaskList.children[index];
        listItem.classList.toggle('completed');

    } else if (month.includes(task)) {
        const index = month.indexOf(task)
        const listItem = month.children[index]
        listItem.classList.toggle('completed')
    }
    else if (weekTasks1.includes(task)) {
        const index = weekTasks1.indexOf(task);
        const listItem = weekTaskList1.children[index];
        listItem.classList.toggle('completed');
    } else if (weekTasks2.includes(task)) {
        const index = weekTasks2.indexOf(task);
        const listItem = weekTaskList2.children[index];
        listItem.classList.toggle('completed');
    } else if (weekTasks3.includes(task)) {
        const index = weekTasks3.indexOf(task);
        const listItem = weekTaskList3.children[index];
        listItem.classList.toggle('completed');
    } else if (weekTasks4.includes(task)) {
        const index = weekTasks4.indexOf(task);
        const listItem = weekTaskList4.children[index];
        listItem.classList.toggle('completed');
    }
}


// Function to delete a task
function deleteTask(task) {
    const month = monthSelect.value;
    const dayTasks = tasks[month].dayTasks;
    const weekTasks1 = tasks[month].weekTasks1;
    const weekTasks2 = tasks[month].weekTasks2;
    const weekTasks3 = tasks[month].weekTasks3;
    const weekTasks4 = tasks[month].weekTasks4;
    const monthTasks = tasks[month].monthTasks;

    if (dayTasks.includes(task)) {
        const index = dayTasks.indexOf(task);
        dayTasks.splice(index, 1);
        updateDayTasks();
    } else if (weekTasks1.includes(task)) {
        const index = weekTasks1.indexOf(task);
        weekTasks1.splice(index, 1);
        updateWeekTasks1();
    } else if (weekTasks2.includes(task)) {
        const index = weekTasks2.indexOf(task);
        weekTasks2.splice(index, 1);
        updateWeekTasks2();
    } else if (weekTasks3.includes(task)) {
        const index = weekTasks3.indexOf(task);
        weekTasks3.splice(index, 1);
        updateWeekTasks3();
    } else if (weekTasks4.includes(task)) {
        const index = weekTasks4.indexOf(task);
        weekTasks4.splice(index, 1);
        updateWeekTasks4();
    } else if (monthTasks.includes(task)) {
        const index = monthTasks.indexOf(task);
        monthTasks.splice(index, 1);
        updateMonthTasks();
    }
}

window.addEventListener('beforeunload', saveTasks);
window.addEventListener('load', retrieveTasks);

// Function to handle month change
function handleMonthChange() {
    const month = monthSelect.value;
    currentMonthHeading.textContent = month + ' Tasks:';
    updateDayTasks();
    updateWeekTasks1();
    updateWeekTasks2();
    updateWeekTasks3();
    updateWeekTasks4();
    updateMonthTasks();
}

// Initialize the day tasks and week tasks for the current month
updateDayTasks();
updateWeekTasks1();
updateWeekTasks2();
updateWeekTasks3();
updateWeekTasks4();
updateMonthTasks();


  